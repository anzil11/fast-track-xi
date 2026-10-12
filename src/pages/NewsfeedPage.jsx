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
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-mono">
            <Newspaper className="w-3.5 h-3.5" />
            <span>UK TRANSPORT & MOBILITY INTELLIGENCE</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-display text-white tracking-tight">
            Newsfeeds & Insights
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
            Stay updated on national transport policy, active travel records, rail fare dynamics, and urban surveying benchmarks.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-500 text-white shadow-[0_0_15px_rgba(12,143,233,0.5)]'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
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
              className="rounded-3xl glass-panel border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-brand-500/50 transition-all duration-300 group shadow-xl"
            >
              <div>
                {/* Image header */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/40 font-semibold">
                    {article.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-brand-400" />
                      <span>{article.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-brand-400" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-display text-white group-hover:text-brand-300 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setActiveModalArticle(article)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 group-hover:bg-brand-500 text-white font-mono font-bold text-xs transition-all flex items-center justify-center gap-2 border border-slate-800 group-hover:border-transparent"
                >
                  <span>Read Full Article</span>
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
              className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden my-8"
            >
              <button
                onClick={() => setActiveModalArticle(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3">
                <Tag className="w-3.5 h-3.5" />
                <span>{activeModalArticle.category}</span>
                <span className="text-slate-600">|</span>
                <span>{activeModalArticle.date}</span>
                <span className="text-slate-600">|</span>
                <span>{activeModalArticle.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold font-display text-white mb-6 leading-tight">
                {activeModalArticle.title}
              </h2>

              <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                <img
                  src={activeModalArticle.image}
                  alt={activeModalArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div
                className="prose prose-invert prose-slate max-w-none text-sm sm:text-base leading-relaxed space-y-4 text-slate-300"
                dangerouslySetInnerHTML={{ __html: activeModalArticle.content }}
              />

              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  Published by {activeModalArticle.author}
                </span>

                <button
                  onClick={() => setActiveModalArticle(null)}
                  className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs"
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
