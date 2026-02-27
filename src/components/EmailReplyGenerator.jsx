
"use client";

import React, { useState } from "react";
import { Mail, Copy, Check, Loader2, RefreshCw } from "lucide-react";
// Removed custom Button and Textarea imports
import { motion, AnimatePresence } from "framer-motion";


const REPLY_STYLES = [
  { id: "professional", label: "Professional", emoji: "💼" },
  { id: "friendly", label: "Friendly", emoji: "😊" },
  { id: "concise", label: "Concise", emoji: "⚡" },
  { id: "detailed", label: "Detailed", emoji: "📝" },
];

export default function EmailReplyGenerator() {
  const [email, setEmail] = useState("");
  const [style, setStyle] = useState("professional");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!email.trim()) return;
    setLoading(true);
    setReply("");
    try {
      // Demo: Provide a mock AI reply since backend is removed
      setTimeout(() => {
        setReply(`Mock reply for: "${email}"\nStyle: ${style}`);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setReply("Error: " + (err.message || err));
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(reply);
    setCopied(true);
    toast.success("Reply copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">
          Paste the email you received
        </label>
        <textarea
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Hi, I wanted to follow up on our meeting yesterday regarding the Q3 budget proposal..."
          rows={10}
          className="w-full min-h-55 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200 dark:border-slate-700 rounded-xl resize-y text-[16px] leading-relaxed focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all placeholder:text-slate-400 px-4 py-3"
        />
      </div>

      {/* Style selector */}
      <div>
        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5 block">
          Reply Style
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {REPLY_STYLES.map((s) => (
            <button
              key={s.id}
              onClick={() => setStyle(s.id)}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                style === s.id
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <span>{s.emoji}</span>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={generate}
        disabled={loading || !email.trim()}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-11 font-medium shadow-lg shadow-indigo-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
        <span>{loading ? "Composing Reply..." : "Generate Reply"}</span>
      </button>

      <AnimatePresence>
        {reply && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-full bg-linear-to-br from-slate-50 to-white dark:from-slate-800/80 dark:to-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-700 p-5 mt-2">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  Generated Reply
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={generate}
                    disabled={loading}
                    className="flex items-center gap-2 text-xs text-slate-500 hover:text-indigo-600 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-500/10"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                    <span>Regenerate</span>
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 text-xs text-slate-500 hover:text-indigo-600 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-500/10"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-[16px] leading-relaxed whitespace-pre-wrap w-full">{reply}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
