const fs = require('fs');
const path = require('path');
const jpeg = require('jpeg-js');
const { PNG } = require('pngjs');

console.log('Loading FAST-TRACK-1.png...');
const inputPath = path.join(__dirname, '../src/img/FAST-TRACK-1.png');
const raw = fs.readFileSync(inputPath);
const img = jpeg.decode(raw, { useTArray: true });
const { width, height, data } = img;

console.log(`Source image decoded: ${width}x${height}`);

// Helper: sample pixel with background removal
function getCleanPixel(x, y, invertDarkText = false) {
  if (x < 0 || x >= width || y < 0 || y >= height) {
    return [0, 0, 0, 0];
  }
  const idx = (y * width + x) * 4;
  let r = data[idx];
  let g = data[idx+1];
  let b = data[idx+2];

  const dist = Math.max(255 - r, 255 - g, 255 - b);

  if (dist <= 4) {
    return [0, 0, 0, 0];
  }

  let a = 255;
  if (dist < 36) {
    const t = (dist - 4) / 32;
    a = Math.round(255 * (0.5 - 0.5 * Math.cos(t * Math.PI)));
  }

  let pr = r, pg = g, pb = b;
  if (a < 255 && a > 0) {
    const aNorm = a / 255;
    pr = Math.max(0, Math.min(255, Math.round((r - 255 * (1 - aNorm)) / aNorm)));
    pg = Math.max(0, Math.min(255, Math.round((g - 255 * (1 - aNorm)) / aNorm)));
    pb = Math.max(0, Math.min(255, Math.round((b - 255 * (1 - aNorm)) / aNorm)));
  }

  // If invertDarkText is enabled (for text on dark background):
  if (invertDarkText && y >= 2700) {
    const brightness = 0.299 * pr + 0.587 * pg + 0.114 * pb;
    // Dark navy (#26335d) or black text gets turned to crisp white (#ffffff)
    // Cyan text stays vivid cyan (#2ea3d9)
    if (brightness < 110) {
      pr = 255;
      pg = 255;
      pb = 255;
    }
  }

  return [pr, pg, pb, a];
}

// Render cropped and resized PNG with 2x2 supersampling for anti-aliased sharpness
function createCroppedPNG(cropX, cropY, cropW, cropH, outW, outH, invertDarkText = false) {
  const outPng = new PNG({ width: outW, height: outH });
  const scaleX = cropW / outW;
  const scaleY = cropH / outH;

  for (let oy = 0; oy < outH; oy++) {
    for (let ox = 0; ox < outW; ox++) {
      // 2x2 subpixel sampling
      const sx0 = Math.floor(cropX + (ox + 0.25) * scaleX);
      const sy0 = Math.floor(cropY + (oy + 0.25) * scaleY);
      const sx1 = Math.floor(cropX + (ox + 0.75) * scaleX);
      const sy1 = Math.floor(cropY + (oy + 0.75) * scaleY);

      const p00 = getCleanPixel(sx0, sy0, invertDarkText);
      const p10 = getCleanPixel(sx1, sy0, invertDarkText);
      const p01 = getCleanPixel(sx0, sy1, invertDarkText);
      const p11 = getCleanPixel(sx1, sy1, invertDarkText);

      const totalA = (p00[3] + p10[3] + p01[3] + p11[3]) / 4;
      const oIdx = (oy * outW + ox) * 4;

      if (totalA > 1) {
        const sumWeights = (p00[3] + p10[3] + p01[3] + p11[3]) || 1;
        const avgR = Math.round((p00[0]*p00[3] + p10[0]*p10[3] + p01[0]*p01[3] + p11[0]*p11[3]) / sumWeights);
        const avgG = Math.round((p00[1]*p00[3] + p10[1]*p10[3] + p01[1]*p01[3] + p11[1]*p11[3]) / sumWeights);
        const avgB = Math.round((p00[2]*p00[3] + p10[2]*p10[3] + p01[2]*p01[3] + p11[2]*p11[3]) / sumWeights);

        outPng.data[oIdx] = avgR;
        outPng.data[oIdx+1] = avgG;
        outPng.data[oIdx+2] = avgB;
        outPng.data[oIdx+3] = Math.round(totalA);
      } else {
        outPng.data[oIdx] = 0;
        outPng.data[oIdx+1] = 0;
        outPng.data[oIdx+2] = 0;
        outPng.data[oIdx+3] = 0;
      }
    }
  }

  return outPng;
}

fs.mkdirSync(path.join(__dirname, '../public'), { recursive: true });
fs.mkdirSync(path.join(__dirname, '../src/img'), { recursive: true });

// 1. EMBLEM MARK (Square, tightly centered)
// Emblem bounds: { eMinX: 1050, eMaxX: 3137, eMinY: 555, eMaxY: 2647 }
console.log('Rendering clean Emblem Mark (512x512)...');
const embCenterX = 2094;
const embCenterY = 1601;
const embBoxSize = 2140; // clean padding around 2092px emblem, completely above 2738 text
const embCropX = Math.round(embCenterX - embBoxSize / 2);
const embCropY = Math.round(embCenterY - embBoxSize / 2);

const emblemPng = createCroppedPNG(embCropX, embCropY, embBoxSize, embBoxSize, 512, 512);
fs.writeFileSync(path.join(__dirname, '../src/img/logo-mark.png'), PNG.sync.write(emblemPng));
fs.writeFileSync(path.join(__dirname, '../public/logo-mark.png'), PNG.sync.write(emblemPng));
console.log('Saved src/img/logo-mark.png and public/logo-mark.png');

// 2. FULL LOGO (Vertical / Stacked)
console.log('Rendering Full Stacked Logo (1024 width)...');
const fullCropX = 350;
const fullCropY = 530;
const fullCropW = 3500;
const fullCropH = 2920;
const fullOutW = 1024;
const fullOutH = Math.round((fullCropH / fullCropW) * fullOutW);

const fullLogoPng = createCroppedPNG(fullCropX, fullCropY, fullCropW, fullCropH, fullOutW, fullOutH);
fs.writeFileSync(path.join(__dirname, '../src/img/logo.png'), PNG.sync.write(fullLogoPng));
fs.writeFileSync(path.join(__dirname, '../src/img/FAST-TRACK-transparent.png'), PNG.sync.write(fullLogoPng));
console.log('Saved src/img/logo.png');

// 3. FULL LOGO DARK MODE (with white text for "Fast" and "SURVEYS")
console.log('Rendering Full Stacked Dark Mode Logo...');
const fullDarkLogoPng = createCroppedPNG(fullCropX, fullCropY, fullCropW, fullCropH, fullOutW, fullOutH, true);
fs.writeFileSync(path.join(__dirname, '../src/img/logo-dark-mode.png'), PNG.sync.write(fullDarkLogoPng));
console.log('Saved src/img/logo-dark-mode.png');

// 4. HORIZONTAL BANNER LOGO (Emblem on left, Text on right - matching brand guide layout)
console.log('Rendering Horizontal Logo (1200x380)...');
// Text bounds: minX ~ 378, maxX ~ 3822, minY ~ 2738, maxY ~ 3405 (w=3444, h=667)
const textCropX = 370;
const textCropY = 2720;
const textCropW = 3460;
const textCropH = 700;

// Target canvas: 1200 x 360
const horizW = 1200;
const horizH = 360;

function createHorizontalLogo(invertText = false) {
  const horizPng = new PNG({ width: horizW, height: horizH });
  
  // Render emblem on left (size 320x320 centered in 360x360 box, padding 20)
  const embLeftPng = createCroppedPNG(embCropX, embCropY, embBoxSize, embBoxSize, 320, 320);
  for (let y = 0; y < 320; y++) {
    for (let x = 0; x < 320; x++) {
      const srcIdx = (y * 320 + x) * 4;
      const destIdx = ((y + 20) * horizW + (x + 20)) * 4;
      for (let c = 0; c < 4; c++) horizPng.data[destIdx + c] = embLeftPng.data[srcIdx + c];
    }
  }

  // Render text on right (width 800, height proportional)
  const textOutW = 810;
  const textOutH = Math.round((textCropH / textCropW) * textOutW);
  const textDestY = Math.round((horizH - textOutH) / 2);
  const textDestX = 370;

  const textPng = createCroppedPNG(textCropX, textCropY, textCropW, textCropH, textOutW, textOutH, invertText);
  for (let y = 0; y < textOutH; y++) {
    for (let x = 0; x < textOutW; x++) {
      const srcIdx = (y * textOutW + x) * 4;
      const destIdx = ((y + textDestY) * horizW + (x + textDestX)) * 4;
      for (let c = 0; c < 4; c++) horizPng.data[destIdx + c] = textPng.data[srcIdx + c];
    }
  }

  return horizPng;
}

const horizLogo = createHorizontalLogo(false);
fs.writeFileSync(path.join(__dirname, '../src/img/logo-horizontal.png'), PNG.sync.write(horizLogo));
console.log('Saved src/img/logo-horizontal.png');

const horizDarkLogo = createHorizontalLogo(true);
fs.writeFileSync(path.join(__dirname, '../src/img/logo-horizontal-dark.png'), PNG.sync.write(horizDarkLogo));
console.log('Saved src/img/logo-horizontal-dark.png');

// 5. Crisp Favicon (64x64 & 32x32)
console.log('Rendering Favicon (64x64)...');
const favPng = createCroppedPNG(embCropX, embCropY, embBoxSize, embBoxSize, 64, 64);
fs.writeFileSync(path.join(__dirname, '../public/favicon.png'), PNG.sync.write(favPng));
console.log('Saved public/favicon.png');

console.log('ALL BRAND ASSETS GENERATED PERFECTLY!');
