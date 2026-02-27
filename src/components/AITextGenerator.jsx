"use client";
import React, { useState } from "react";
import { Sparkles, Copy, Check, Loader2, ChevronDown } from "lucide-react";
// Removed custom Button and Textarea imports
import { motion, AnimatePresence } from "framer-motion";


const TONES = ["Professional", "Casual", "Creative", "Academic", "Persuasive"];

export default function AITextGenerator() {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("Professional");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showTones, setShowTones] = useState(false);

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResult("");
    try {
      // Demo: Provide a mock AI result since backend is removed
      setTimeout(() => {
        setResult(`Generated text for: "${prompt}"\nTone: ${tone}`);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setResult("Error: " + (err.message || err));
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5">
      <div className="relative w-full">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you'd like to generate... e.g. 'Write a product description for a smart watch'"
          rows={10}
          className="w-full min-h-55 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200 dark:border-slate-700 rounded-xl resize-y text-[16px] leading-relaxed focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all placeholder:text-slate-400 px-4 py-3"
        />
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="relative">
          <button
            onClick={() => setShowTones(!showTones)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <span className="text-xs text-slate-500 dark:text-slate-400">Tone:</span>
            <span>{tone}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
          <AnimatePresence>
            {showTones && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                className="absolute top-full left-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-20 min-w-40"
              >
                {TONES.map((t) => (
                  <button
                    key={t}
                    onClick={() => { setTone(t); setShowTones(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors items-center gap-2 ${
                      tone === t
                        ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                    <span>{t}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={generate}
          disabled={loading || !prompt.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 h-11 font-medium shadow-lg shadow-indigo-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          <span>{loading ? "Generating..." : "Generate"}</span>
        </button>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="relative"
          >
            <div className="w-full bg-linear-to-br from-slate-50 to-white dark:from-slate-800/80 dark:to-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-700 p-5 mt-2">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Generated Output</span>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 text-xs text-slate-500 hover:text-indigo-600 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-500/10"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-[16px] leading-relaxed whitespace-pre-wrap w-full">{result}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}