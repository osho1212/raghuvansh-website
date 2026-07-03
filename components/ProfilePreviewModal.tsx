"use client";
import React, { useState } from "react";
import { X, Mail, Phone, MapPin, Calendar, Film, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProfilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    name?: string;
    category?: string;
    location?: string;
    email?: string;
    phone?: string;
    bio?: string;
    profileImage?: string;
    coverImage?: string;
    coverPosition?: string;
    introVideo?: string;
    introVideoRatio?: string;
    socialLinks?: {
      instagram?: string;
      instagramFollowers?: string;
      facebook?: string;
      facebookFollowers?: string;
      youtube?: string;
      youtubeSubscribers?: string;
      custom?: Array<{ platform: string; url: string }>;
    };
    stats?: {
      age?: number | string;
      height?: string;
      weight?: string;
      hairColor?: string;
      eyeColor?: string;
    };
    skills?: string[];
    experience?: Array<{ id: string; title: string; role: string; year: string }>;
    gallery?: string[];
    videos?: string[];
  };
}

export default function ProfilePreviewModal({ isOpen, onClose, data }: ProfilePreviewModalProps) {
  const [activeTab, setActiveTab] = useState<"about" | "media" | "credits">("about");
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Extract embed URLs
  const getVideoEmbedUrl = (url: string) => {
    if (!url) return null;
    const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}`;
    }
    const vimeoMatch = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/);
    if (vimeoMatch && vimeoMatch[3]) {
      return `https://player.vimeo.com/video/${vimeoMatch[3]}`;
    }
    const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]{25,50})/);
    if (driveMatch && driveMatch[1]) {
      return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
    }
    return null;
  };

  const getAspectClass = (ratio = "16:9") => {
    if (ratio === "9:16") return "aspect-[9/16] max-w-[280px] mx-auto";
    if (ratio === "4:5") return "aspect-[4/5] max-w-[340px] mx-auto";
    return "aspect-video w-full";
  };

  const introEmbed = data.introVideo ? getVideoEmbedUrl(data.introVideo) : null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
        {/* Main Modal container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-5xl bg-canvas text-ink border border-gold/30 shadow-2xl rounded-sm overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-40 p-2 bg-black/60 border border-gold/30 hover:bg-gold hover:text-ink text-canvas rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          <div className="overflow-y-auto flex-1">
            {/* Header: Cover + Profile Pic */}
            <div className="relative">
              {/* Cover Banner */}
              <div className="h-64 md:h-72 w-full bg-curtain relative overflow-hidden">
                {data.coverImage ? (
                  <img
                    src={data.coverImage}
                    alt="Artist Banner"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: data.coverPosition || "50% 50%" }}
                  />
                ) : (
                  <div className="w-full h-full opacity-20 bg-cover bg-center film-grain" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')" }}></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>

              {/* Profile Badge Overlay */}
              <div className="absolute -bottom-16 left-6 md:left-10 flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6 z-10">
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-gold bg-canvas overflow-hidden shadow-xl flex-shrink-0">
                  {data.profileImage ? (
                    <img src={data.profileImage} alt={data.name || "Artist Name"} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-curtain/10 flex items-center justify-center text-gold/30 font-heading text-4xl">
                      {data.name ? data.name.charAt(0) : "R"}
                    </div>
                  )}
                </div>
                <div className="text-center md:text-left pb-2">
                  <span className="bg-gold text-ink text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-sm inline-block mb-1">
                    {data.category || "Actor"}
                  </span>
                  <h2 className="font-heading text-2xl md:text-4xl text-canvas drop-shadow-md">
                    {data.name || "Full Name"}
                  </h2>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-canvas/80 text-xs md:text-sm font-semibold tracking-wider uppercase mt-1">
                    <MapPin size={14} className="text-gold" />
                    <span>{data.location || "Location Hub"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Spacing for Profile Badge */}
            <div className="h-20 md:h-20"></div>

            {/* Quick Contact & Info Bar */}
            <div className="border-y border-gold/15 bg-white py-3 px-6 md:px-10 flex flex-wrap justify-between items-center gap-4">
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-wider text-ink/70">
                <div className="flex items-center gap-1.5">
                  <Mail size={14} className="text-gold" />
                  <span>{data.email || "email@domain.com"}</span>
                </div>
                <span className="text-gold/30 hidden md:inline">•</span>
                <div className="flex items-center gap-1.5">
                  <Phone size={14} className="text-gold" />
                  <span>{data.phone || "Phone Number"}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {data.socialLinks?.instagram && (
                  <a
                    href={data.socialLinks.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-canvas border border-gold/25 hover:border-gold px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-ink hover:text-gold transition-colors flex items-center gap-1"
                  >
                    Insta {data.socialLinks.instagramFollowers && `(${data.socialLinks.instagramFollowers})`}
                  </a>
                )}
                {data.socialLinks?.youtube && (
                  <a
                    href={data.socialLinks.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-canvas border border-gold/25 hover:border-gold px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-ink hover:text-gold transition-colors flex items-center gap-1"
                  >
                    YouTube {data.socialLinks.youtubeSubscribers && `(${data.socialLinks.youtubeSubscribers})`}
                  </a>
                )}
              </div>
            </div>

            {/* Profile Content tabs */}
            <div className="px-6 md:px-10 py-8">
              {/* Tab selector */}
              <div className="flex border-b border-gold/15 mb-6">
                {(["about", "media", "credits"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`font-heading text-xs uppercase tracking-widest py-3 px-6 -mb-px transition-colors ${
                      activeTab === tab
                        ? "border-b-2 border-curtain text-curtain font-bold"
                        : "text-ink/60 hover:text-ink"
                    }`}
                  >
                    {tab === "about" && "Bio & Stats"}
                    {tab === "media" && "Media Portfolio"}
                    {tab === "credits" && `Credits (${data.experience?.length || 0})`}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <div className="min-h-[250px]">
                {/* 1. BIO & STATS */}
                {activeTab === "about" && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <h3 className="font-heading text-lg text-curtain mb-3 font-semibold">Artist Biography</h3>
                        <p className="font-body text-sm text-ink/80 leading-relaxed whitespace-pre-wrap">
                          {data.bio || "No biography provided. Introduce yourself, your training, and acting journey here."}
                        </p>
                      </div>

                      {data.skills && data.skills.length > 0 && (
                        <div>
                          <h3 className="font-heading text-sm uppercase tracking-widest text-ink/60 mb-3">Skills & Expertise</h3>
                          <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill) => (
                              <span
                                key={skill}
                                className="bg-curtain/5 border border-gold/20 text-curtain text-xs px-3 py-1 rounded-sm uppercase tracking-wider font-semibold"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Stats Sidebar */}
                    <div className="bg-white border border-gold/20 p-6 rounded-sm space-y-4 shadow-sm self-start">
                      <h3 className="font-heading text-md text-curtain font-bold border-b border-gold/15 pb-2 mb-4">
                        Physical Stats
                      </h3>
                      <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm font-body">
                        <div>
                          <span className="text-[10px] text-ink/40 uppercase block">Age</span>
                          <span className="font-bold text-ink">{data.stats?.age || "25"} Years</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-ink/40 uppercase block">Height</span>
                          <span className="font-bold text-ink">{data.stats?.height || "5'8\""}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-ink/40 uppercase block">Weight</span>
                          <span className="font-bold text-ink">{data.stats?.weight || "60 kg"}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-ink/40 uppercase block">Hair Color</span>
                          <span className="font-bold text-ink">{data.stats?.hairColor || "Black"}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-[10px] text-ink/40 uppercase block">Eye Color</span>
                          <span className="font-bold text-ink">{data.stats?.eyeColor || "Brown"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. MEDIA PORTFOLIO */}
                {activeTab === "media" && (
                  <div className="space-y-8">
                    {/* Intro Video */}
                    {data.introVideo && (
                      <div className="max-w-2xl mx-auto text-center">
                        <h3 className="font-heading text-md text-curtain mb-4 font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                          <Film size={16} className="text-gold" />
                          Introduction Video
                        </h3>
                        <div className={`overflow-hidden border border-gold/25 bg-black shadow-lg rounded-sm ${getAspectClass(data.introVideoRatio)}`}>
                          {introEmbed ? (
                            <iframe
                              src={introEmbed}
                              title="Intro Video"
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          ) : (
                            <video src={data.introVideo} controls className="w-full h-full object-contain" />
                          )}
                        </div>
                      </div>
                    )}

                    {/* Gallery Photos */}
                    {data.gallery && data.gallery.length > 0 && (
                      <div>
                        <h3 className="font-heading text-md text-curtain mb-4 font-bold uppercase tracking-wider border-t border-gold/15 pt-6 flex items-center gap-2">
                          <ImageIcon size={16} className="text-gold" />
                          Photo Portfolio
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {data.gallery.map((url, idx) => (
                            <div
                              key={url}
                              onClick={() => setZoomImage(url)}
                              className="aspect-square relative overflow-hidden border border-gold/15 bg-white cursor-pointer group hover:border-gold transition-colors"
                            >
                              <img
                                src={url}
                                alt={`Portfolio Photo ${idx + 1}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-[10px] uppercase font-bold tracking-widest text-canvas bg-curtain/90 px-3 py-1.5 rounded-sm">
                                  Zoom Photo
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Showreel / Portfolio Videos */}
                    {data.videos && data.videos.length > 0 && (
                      <div className="border-t border-gold/15 pt-6">
                        <h3 className="font-heading text-md text-curtain mb-4 font-bold uppercase tracking-wider flex items-center gap-2">
                          <Film size={16} className="text-gold" />
                          Showreel & Performance Clips
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {data.videos.map((url, idx) => {
                            const embed = getVideoEmbedUrl(url);
                            return (
                              <div
                                key={url}
                                className="bg-white border border-gold/15 overflow-hidden rounded-sm shadow-sm p-4 space-y-2"
                              >
                                <span className="text-[10px] text-gold uppercase tracking-wider font-semibold">
                                  Performance Link #{idx + 1}
                                </span>
                                <div className="aspect-video bg-black rounded-sm overflow-hidden relative">
                                  {embed ? (
                                    <iframe
                                      src={embed}
                                      title={`Portfolio Video ${idx + 1}`}
                                      className="w-full h-full"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                    ></iframe>
                                  ) : (
                                    <video src={url} controls className="w-full h-full object-contain" />
                                  )}
                                </div>
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs text-curtain hover:text-gold transition-colors font-semibold block text-center truncate pt-1"
                                >
                                  {url}
                                </a>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. EXPERIENCE CREDITS */}
                {activeTab === "credits" && (
                  <div>
                    <h3 className="font-heading text-lg text-curtain mb-6 font-semibold flex items-center gap-2">
                      <Calendar size={18} className="text-gold" />
                      Theatrical Credits & Projects
                    </h3>

                    {data.experience && data.experience.length > 0 ? (
                      <div className="relative border-l border-gold/30 ml-4 space-y-6 pb-6">
                        {data.experience.map((item) => (
                          <div key={item.id} className="relative pl-8 animate-fadeIn">
                            {/* Timeline bullet */}
                            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border border-gold bg-canvas flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-curtain"></div>
                            </div>
                            <div>
                              <span className="font-heading text-xs text-gold uppercase tracking-wider font-bold">
                                {item.year}
                              </span>
                              <h4 className="font-heading text-md text-ink font-bold mt-0.5">
                                {item.title}
                              </h4>
                              <p className="font-body text-sm text-ink/70">
                                Role / Character: <span className="font-semibold text-curtain">{item.role}</span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-ink/40 font-body text-sm italic">
                        No experience items added. Formulate credentials in the application page.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Photo Zoom Overlay */}
      {zoomImage && (
        <div
          onClick={() => setZoomImage(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
        >
          <img src={zoomImage} alt="Zoomed View" className="max-w-full max-h-full object-contain" />
          <button className="absolute top-6 right-6 text-canvas hover:text-gold p-2">
            <X size={28} />
          </button>
        </div>
      )}
    </AnimatePresence>
  );
}
