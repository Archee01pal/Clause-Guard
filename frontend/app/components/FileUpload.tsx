"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { Sparkles, FileUp, Cpu } from "lucide-react";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
}

export default function FileUpload({ onFileUpload, isLoading }: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0]);
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
    disabled: isLoading,
  });

  return (
    <div className="relative group max-w-2xl mx-auto my-8">
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-70 transition duration-500 group-hover:duration-200"></div>

      <div
        {...getRootProps()}
        className={`relative glass-card rounded-2xl p-8 sm:p-12 text-center cursor-pointer border transition-all duration-300 ${
          isDragActive
            ? "border-pink-500 bg-pink-500/10 scale-[1.01]"
            : "border-white/10 hover:border-purple-500/50"
        } ${isLoading ? "pointer-events-none opacity-80" : ""}`}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center justify-center space-y-4">
          {isLoading ? (
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-pink-500/20 border-t-pink-500 animate-spin" />
              <Cpu className="w-6 h-6 text-pink-400 absolute animate-pulse" />
            </div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500/20 to-purple-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400"
            >
              <FileUp className="w-8 h-8" />
            </motion.div>
          )}

          <div>
            <h3 className="font-syne text-xl sm:text-2xl font-bold tracking-tight text-white">
              {isLoading ? (
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                  Deconstructing Fine Print...
                </span>
              ) : isDragActive ? (
                "Drop the Contract Here! 🔥"
              ) : (
                "Drop your agreement PDF here"
              )}
            </h3>
            <p className="text-slate-400 text-sm mt-2 font-mono">
              {isLoading
                ? "Checking for sneaky traps & hidden red flags"
                : "Or click to browse from device (PDF max 10MB)"}
            </p>
          </div>

          {!isLoading && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" /> Powered by Groq AI
            </div>
          )}
        </div>
      </div>
    </div>
  );
}