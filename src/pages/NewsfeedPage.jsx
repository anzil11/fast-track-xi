import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Newspaper,
  Calendar,
  Clock,
  ArrowRight,
  X,
  Share2,
  Tag,
  Sparkles,
  Zap
} from 'lucide-react';
import { newsArticles } from '../data/newsData';
import { useNavigation } from '../context/NavigationContext';

export default function NewsfeedPage() {
  const { triggerServiceTransition } = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeModalArticle, setActiveModalArticle] = useState(null);

  const categories = ['ALL', 'Transport Policy', 'Active Travel', 'Parking & Kerbside'];

  const filteredArticles = newsArticles.filter((art) => {
    if (selectedCategory === 'ALL') return true;
    return art.category === selectedCategory;
  });

  return (
    <div className="relative min-h-screen text-slate-100 pt-8 pb-24 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-5">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-mono shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <Newspaper className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold tracking-wider">UK TRANSPORT & MOBILITY INTELLIGENCE</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight leading-[1.1]">
            <span className="text-gradient-silver">Newsfeeds &</span>{' '}
            <span className="text-gradient-cyan">Insights</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
            Stay updated on national transport policy, active travel records, rail fare dynamics, and urban surveying benchmarks.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2.5 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              data-cursor="SELECT"
              className={`px-5 py-2.5 rounded-2xl text-xs font-mono font-bold tracking-wide transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-brand-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(12,143,233,0.4)] scale-105'
                  : 'luxury-glass text-slate-400 hover:text-white border border-slate-700/60 hover:border-cyan-500/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredArticles.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              data-cursor="READ"
              className="luxury-glass luxury-card-hover group border border-slate-700/60 hover:border-cyan-500/50 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-500 relative"
            >
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none" />
              <div>
                {/* Image header */}
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-mono bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/40 font-bold uppercase tracking-wider shadow-sm">
                    {article.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{article.date}</span>
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed line-clamp-3 font-light">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setActiveModalArticle(article)}
                  data-cursor="READ"
                  className="w-full shimmer-btn py-3 rounded-2xl bg-gradient-to-r from-brand-500 to-cyan-500 text-white font-mono font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(12,143,233,0.3)] hover:shadow-[0_8px_24px_rgba(12,143,233,0.45)] hover:-translate-y-0.5"
                >
                  <span>READ FULL ARTICLE</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Full Article Reading Modal */}
      <AnimatePresence>
        {activeModalArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-xl overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl luxury-glass border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden my-8"
            >
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none" />
              <button
                onClick={() => setActiveModalArticle(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-2.5 rounded-2xl luxury-glass hover:bg-slate-800/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3">
                <Tag className="w-3.5 h-3.5" />
                <span className="font-semibold">{activeModalArticle.category}</span>
                <span className="text-slate-600">|</span>
                <span>{activeModalArticle.date}</span>
                <span className="text-slate-600">|</span>
                <span>{activeModalArticle.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white mb-6 leading-tight">
                {activeModalArticle.title}
              </h2>

              <div className="relative h-64 rounded-2xl overflow-hidden mb-6 border border-slate-700/60 shadow-lg">
                <img
                  src={activeModalArticle.image}
                  alt={activeModalArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div
                className="prose prose-invert prose-slate max-w-none text-sm sm:text-base leading-relaxed space-y-4 text-slate-300 font-light"
                dangerouslySetInnerHTML={{ __html: activeModalArticle.content }}
              />

              <div className="mt-8 pt-6 border-t border-slate-700/60 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  Published by <strong className="text-slate-200">{activeModalArticle.author}</strong>
                </span>

                <button
                  onClick={() => setActiveModalArticle(null)}
                  className="px-6 py-2.5 rounded-2xl luxury-glass hover:bg-slate-800 text-white font-mono text-xs font-bold transition-all border border-slate-700/80 hover:border-cyan-500/50"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
