"use client";
import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, Link as LinkIcon, X, Sliders } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  aspectRatio?: string;
  isCover?: boolean;
  coverPosition?: string;
  onCoverPositionChange?: (position: string) => void;
  folder?: string;
}

export default function ImageUploader({
  value,
  onChange,
  label,
  aspectRatio = "1/1",
  isCover = false,
  coverPosition = "50% 50%",
  onCoverPositionChange,
}: ImageUploaderProps) {
  const [uploadMode, setUploadMode] = useState<"file" | "link">("file");
  const [linkInput, setLinkInput] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);

  // Sync internal state with external value if it's a URL
  useEffect(() => {
    if (value && !value.startsWith("data:image/")) {
      setLinkInput(value);
    }
  }, [value]);

  const convertGoogleDriveUrl = (url: string): string => {
    if (!url) return "";
    const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]{25,50})/);
    const openIdMatch = url.match(/[?&]id=([a-zA-Z0-9_-]{25,50})/);
    const fileId = (fileIdMatch && fileIdMatch[1]) || (openIdMatch && openIdMatch[1]);
    if (fileId) {
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
    return url;
  };

  const handleLinkSubmit = () => {
    const converted = convertGoogleDriveUrl(linkInput.trim());
    if (converted) {
      onChange(converted);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }
    // Limit to 4MB for Base64 representation to avoid lag
    if (file.size > 4 * 1024 * 1024) {
      alert("Image is too large. Please upload an image smaller than 4MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = () => {
    onChange("");
    setLinkInput("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Parse vertical position from position string (e.g. "50% 30%" -> 30)
  const getVerticalPercent = () => {
    if (!coverPosition) return 50;
    const parts = coverPosition.split(" ");
    if (parts.length < 2) return 50;
    const vertical = parts[1].replace("%", "");
    return parseInt(vertical, 10) || 50;
  };

  const handleVerticalPercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pct = e.target.value;
    if (onCoverPositionChange) {
      onCoverPositionChange(`50% ${pct}%`);
    }
  };

  return (
    <div className="bg-white p-6 border border-gold/20 rounded-sm space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-xs uppercase tracking-wider text-ink/75 font-semibold">
          {label}
        </label>
        {!value && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setUploadMode("file")}
              className={`text-xs uppercase tracking-wider px-3 py-1 rounded-sm border transition-colors ${
                uploadMode === "file"
                  ? "bg-curtain text-canvas border-curtain"
                  : "border-gold/30 text-ink/60 hover:border-gold"
              }`}
            >
              Upload File
            </button>
            <button
              type="button"
              onClick={() => setUploadMode("link")}
              className={`text-xs uppercase tracking-wider px-3 py-1 rounded-sm border transition-colors ${
                uploadMode === "link"
                  ? "bg-curtain text-canvas border-curtain"
                  : "border-gold/30 text-ink/60 hover:border-gold"
              }`}
            >
              Paste Link
            </button>
          </div>
        )}
      </div>

      {value ? (
        <div className="relative group rounded-sm overflow-hidden border border-gold/15 bg-canvas flex flex-col items-center justify-center">
          {/* Image Container */}
          <div
            className="w-full relative overflow-hidden"
            style={{
              aspectRatio: isCover ? "21/9" : aspectRatio,
            }}
          >
            <img
              src={value}
              alt="Uploaded Asset"
              className="w-full h-full object-cover"
              style={{
                objectPosition: isCover ? coverPosition : "center center",
              }}
            />
            {/* Remove Button Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                onClick={handleRemove}
                className="bg-curtain hover:bg-gold text-canvas hover:text-ink p-3 rounded-full transition-colors shadow-lg"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Focal Position Slider for Covers */}
          {isCover && onCoverPositionChange && (
            <div className="w-full p-4 border-t border-gold/10 bg-canvas text-ink flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink/70">
                <Sliders size={14} className="text-gold" />
                <span>Adjust Vertical Alignment (Focal Point)</span>
              </div>
              <div className="flex items-center gap-3 flex-grow max-w-xs">
                <span className="text-[10px] text-ink/40 uppercase">Top</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={getVerticalPercent()}
                  onChange={handleVerticalPercentChange}
                  className="w-full accent-curtain h-1 bg-gold/20 rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-ink/40 uppercase">Bottom</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full">
          {uploadMode === "file" ? (
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`w-full border-2 border-dashed rounded-sm p-8 text-center cursor-pointer transition-all ${
                isDragActive
                  ? "border-gold bg-gold/5"
                  : "border-gold/20 hover:border-gold bg-canvas/40 hover:bg-gold/5"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <UploadCloud size={40} className="mx-auto text-gold mb-3 animate-pulse" />
              <p className="text-sm font-semibold text-ink/80 mb-1">
                Drag & Drop or Click to Upload Image
              </p>
              <p className="text-xs text-ink/40">
                Supports JPG, PNG, WEBP (Max 4MB)
              </p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-grow">
                <LinkIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/60" />
                <input
                  type="url"
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                  placeholder="Paste direct link or Google Drive share link..."
                  className="w-full bg-canvas border border-gold/20 focus:border-gold outline-none pl-9 pr-3 py-3 rounded-sm transition-colors text-ink text-sm"
                />
              </div>
              <button
                type="button"
                onClick={handleLinkSubmit}
                className="bg-curtain hover:bg-gold text-canvas hover:text-ink font-semibold tracking-wider uppercase text-xs px-6 py-3 rounded-sm transition-colors"
              >
                Apply
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
