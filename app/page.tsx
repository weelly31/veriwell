
"use client";

import React from "react";
import { Sparkles, FileText, Mail, MessageSquare, Zap } from "lucide-react";
import { motion } from "framer-motion";
import FeatureCard from "../src/components/FeatureCard.jsx";
import AITextGenerator from "../src/components/AITextGenerator.jsx";
import ResumeAnalyzer from "../src/components/ResumeAnalyzer.jsx";
import EmailReplyGenerator from "../src/components/EmailReplyGenerator.jsx";
import ChatAssistant from "../src/components/ChatAssistant.jsx";

export default function AIFeatures() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-125 h-125 bg-indigo-200/20 dark:bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-100 h-100 bg-purple-200/20 dark:bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-blue-200/10 dark:bg-blue-500/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold shadow-lg mb-4">
            <span className="text-base tracking-wide">VeriWell</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 mb-6">
            <Zap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">Powered by AI</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
            <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">VeriWell</span>: AI-Powered{" "}
            <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Smart Tools
            </span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 mt-4 max-w-xl mx-auto leading-relaxed">
            Generate content, analyze documents, compose emails, and chat with AI — all in one place.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="space-y-5">
          <FeatureCard
            icon={Sparkles}
            title="AI Text Generator"
            description="Generate high-quality content with customizable tone"
            gradient="from-indigo-500 to-indigo-700"
            defaultOpen={true}
          >
            <AITextGenerator />
          </FeatureCard>

          <FeatureCard
            icon={FileText}
            title="Resume Analyzer"
            description="Get instant AI feedback on your resume"
            gradient="from-emerald-500 to-teal-600"
          >
            <ResumeAnalyzer />
          </FeatureCard>

          <FeatureCard
            icon={Mail}
            title="Auto Email Reply"
            description="Generate professional email replies in seconds"
            gradient="from-amber-500 to-orange-600"
          >
            <EmailReplyGenerator />
          </FeatureCard>

          <FeatureCard
            icon={MessageSquare}
            title="Chat Assistant"
            description="Your intelligent conversational AI companion"
            gradient="from-purple-500 to-pink-600"
          >
            <ChatAssistant />
          </FeatureCard>
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-slate-400 dark:text-slate-500 mt-14"
        >
          Powered by <span className="font-semibold text-indigo-500 dark:text-indigo-400">VeriWell AI</span> • Results may vary • Always review AI-generated content
       </motion.p>
      </div>
    </div>
  );
}