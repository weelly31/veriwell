"use client";
import React, { useState } from "react";
import { Upload, FileText, Loader2, Star, AlertTriangle, TrendingUp, CheckCircle2 } from "lucide-react";
// Removed custom Button import
import { motion, AnimatePresence } from "framer-motion";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (f) => {
    if (f && (f.type === "application/pdf" || f.type.includes("image") || f.name.endsWith(".pdf") || f.name.endsWith(".docx"))) {
      setFile(f);
      setAnalysis(null);
    }
  };

  const analyze = async () => {
    if (!file) return;
    setLoading(true);
    try {
      // For demo: just send the file name and a message. For real use, you'd upload the file and send its content or a link.
      const prompt = `Analyze this resume file: ${file.name}. Give a detailed assessment, strengths, and improvements.`;
      const res = await fetch("/.netlify/functions/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setAnalysis({
        overall_score: 90,
        summary: data.result || "No analysis from AI.",
        strengths: ["Strong experience", "Good skills"],
        improvements: ["Add more details", "Clarify objectives"]
      });
    } catch (err) {
      setAnalysis({
        overall_score: 0,
        summary: "Error: " + (err.message || err),
        strengths: [],
        improvements: []
      });
    }
    setLoading(false);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-500";
  };

  const getScoreRing = (score) => {
    if (score >= 80) return "from-emerald-400 to-emerald-600";
    if (score >= 60) return "from-amber-400 to-amber-600";
    return "from-red-400 to-red-600";
  };

  return (
    <div className="space-y-5">
      {/* Upload area */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
          dragOver
            ? "border-indigo-400 bg-indigo-50/50 dark:bg-indigo-500/5"
            : file
            ? "border-emerald-300 bg-emerald-50/30 dark:bg-emerald-500/5"
            : "border-slate-200 dark:border-slate-700 hover:border-indigo-300 hover:bg-slate-50/50 dark:hover:bg-slate-800/50"
        }`}
        onClick={() => document.getElementById("resume-upload").click()}
      >
        <input
          id="resume-upload"
          type="file"
          accept=".pdf,.doc,.docx,image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files[0])}
        />
        {file ? (
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{file.name}</p>
              <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB • Click to change</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto">
              <Upload className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Drop your resume here or click to upload</p>
              <p className="text-xs text-slate-400 mt-1">Supports PDF, DOC, DOCX, and images</p>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={analyze}
        disabled={loading || !file}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-11 font-medium shadow-lg shadow-indigo-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
        <span>{loading ? "Analyzing Resume..." : "Analyze Resume"}</span>
      </button>

      {/* Results */}
      <AnimatePresence>
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Score + Summary */}
            <div className="flex items-start gap-5 p-5 bg-linear-to-br from-slate-50 to-white dark:from-slate-800/80 dark:to-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="shrink-0 w-20 h-20 rounded-2xl bg-linear-to-br flex items-center justify-center relative">
                <div className={`w-20 h-20 rounded-2xl bg-linear-to-br ${getScoreRing(analysis.overall_score)} flex items-center justify-center`}>
                  <div className="w-16 h-16 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center">
                    <span className={`text-2xl font-bold ${getScoreColor(analysis.overall_score)}`}>{analysis.overall_score}</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">Overall Assessment</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{analysis.summary}</p>
              </div>
            </div>

            {/* Strengths & Improvements side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50/50 dark:bg-emerald-500/5 rounded-xl border border-emerald-200/60 dark:border-emerald-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-sm font-semibold text-emerald-800 dark:text-emerald-400">Strengths</h4>
                </div>
                <ul className="space-y-2">
                  {analysis.strengths?.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-emerald-500 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-amber-50/50 dark:bg-amber-500/5 rounded-xl border border-amber-200/60 dark:border-amber-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-amber-600" />
                  <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-400">Improvements</h4>
                </div>
                <ul className="space-y-2">
                  {analysis.improvements?.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <AlertTriangle className="w-3.5 h-3.5 mt-0.5 text-amber-500 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ATS Tips */}
            {analysis.ats_tips && (
              <div className="p-4 bg-indigo-50/50 dark:bg-indigo-500/5 rounded-xl border border-indigo-200/60 dark:border-indigo-500/20">
                <h4 className="text-sm font-semibold text-indigo-800 dark:text-indigo-400 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> ATS Optimization
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{analysis.ats_tips}</p>
                {analysis.keywords_missing?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {analysis.keywords_missing.map((k, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-xs font-medium text-indigo-700 dark:text-indigo-300">
                        {k}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}