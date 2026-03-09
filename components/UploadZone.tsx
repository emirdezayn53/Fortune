"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

interface UploadZoneProps {
  onUpload: (file: File) => void;
}

export default function UploadZone({ onUpload }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: unknown[]) => {
      if (rejectedFiles && (rejectedFiles as File[]).length > 0) {
        toast.error("Please upload a valid image file (JPEG, PNG, or WebP)");
        return;
      }
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (file.size > 10 * 1024 * 1024) {
          toast.error("Image is too large. Maximum size is 10MB.");
          return;
        }
        onUpload(file);
      }
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxFiles: 1,
    noClick: false,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    onDropAccepted: () => setIsDragging(false),
    onDropRejected: () => setIsDragging(false),
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`
          relative w-full rounded-2xl border-2 border-dashed cursor-pointer
          transition-all duration-300 p-8 sm:p-12 text-center
          ${isDragging
            ? "upload-zone-active border-mystic-gold"
            : "border-purple-700 hover:border-purple-500 glow-border"
          }
          bg-gradient-to-b from-purple-950/30 to-mystic-black/50
        `}
      >
        <input {...getInputProps()} />

        {/* Crystal ball icon */}
        <div className="flex justify-center mb-5">
          <div className={`text-6xl transition-transform duration-300 ${isDragging ? "scale-110" : "animate-float"}`}>
            🔮
          </div>
        </div>

        <p className="font-mystic text-lg text-purple-200 mb-2">
          {isDragging ? "Release to reveal your fortune..." : "Drop your image here"}
        </p>
        <p className="text-purple-400 font-body text-sm mb-6">
          or click to choose a photo
        </p>

        {/* Upload button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            open();
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
            bg-gradient-to-r from-purple-900 to-purple-700
            border border-purple-500 hover:border-mystic-gold
            text-purple-100 hover:text-mystic-gold
            font-body text-base transition-all duration-300
            hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
        >
          <span>📸</span>
          <span>Choose Photo</span>
        </button>

        <p className="text-purple-600 text-xs font-body mt-4">
          Supports JPEG, PNG, WebP · Max 10MB
        </p>

        {/* Mobile camera hint */}
        <p className="text-purple-600 text-xs font-body mt-1">
          📱 On mobile, you can take a photo directly
        </p>
      </div>
    </div>
  );
}
