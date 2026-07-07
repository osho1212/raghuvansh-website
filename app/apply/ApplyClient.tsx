"use client";
import React, { useState, useEffect } from "react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/Buttons";
import ImageUploader from "@/components/ImageUploader";
import LocationSelector from "@/components/LocationSelector";
import ProfilePreviewModal from "@/components/ProfilePreviewModal";
import {
  X,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Eye,
  Plus,
  ArrowRight,
  ArrowLeft,
  Info
} from "lucide-react";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";

interface SocialLinks {
  instagram: string;
  instagramFollowers: string;
  facebook: string;
  facebookFollowers: string;
  youtube: string;
  youtubeSubscribers: string;
  custom: Array<{ platform: string; url: string }>;
}

interface ExperienceItem {
  id: string;
  title: string;
  role: string;
  year: string;
}

// Compress base64 image using canvas to prevent exceeding Firestore limits
const compressBase64Image = (base64Str: string, maxWidth = 300, quality = 0.5): Promise<string> => {
  return new Promise((resolve) => {
    if (!base64Str || !base64Str.startsWith("data:image/")) {
      resolve(base64Str);
      return;
    }
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      } else {
        resolve(base64Str);
      }
    };
    img.onerror = () => {
      resolve(base64Str);
    };
  });
};

export default function ApplyClient() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"identity" | "stats" | "media" | "experience">("identity");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Form State: Identity
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("Actor");
  const [formLocation, setFormLocation] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formBio, setFormBio] = useState("");
  const [formSkills, setFormSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const [formSocialLinks, setFormSocialLinks] = useState<SocialLinks>({
    instagram: "",
    instagramFollowers: "",
    facebook: "",
    facebookFollowers: "",
    youtube: "",
    youtubeSubscribers: "",
    custom: []
  });

  // Form State: Measurements
  const [formAge, setFormAge] = useState<number>(25);
  const [formHeight, setFormHeight] = useState("5'8\"");
  const [formWeight, setFormWeight] = useState("65 kg");
  const [formHairColor, setFormHairColor] = useState("Black");
  const [formEyeColor, setFormEyeColor] = useState("Brown");

  // Form State: Media
  const [formProfileImage, setFormProfileImage] = useState("");
  const [formCoverImage, setFormCoverImage] = useState("");
  const [formCoverPosition, setFormCoverPosition] = useState("50% 50%");
  const [formIntroVideo, setFormIntroVideo] = useState("");
  const [formIntroVideoRatio, setFormIntroVideoRatio] = useState("16:9");
  const [formGallery, setFormGallery] = useState<string[]>([]);
  const [formVideos, setFormVideos] = useState<string[]>([]);
  const [videoInput, setVideoInput] = useState("");

  // Form State: Experience
  const [formExperience, setFormExperience] = useState<ExperienceItem[]>([]);
  const [expTitle, setExpTitle] = useState("");
  const [expRole, setExpRole] = useState("");
  const [expYear, setExpYear] = useState("");

  // Load draft from localStorage on mount
  useEffect(() => {
    try {
      const draftStr = localStorage.getItem("raghuvansh_apply_draft");
      if (draftStr) {
        const draft = JSON.parse(draftStr);
        if (draft.name) setFormName(draft.name);
        if (draft.category) setFormCategory(draft.category);
        if (draft.location) setFormLocation(draft.location);
        if (draft.email) setFormEmail(draft.email);
        if (draft.phone) setFormPhone(draft.phone);
        if (draft.bio) setFormBio(draft.bio);
        if (draft.skills) setFormSkills(draft.skills);
        if (draft.socialLinks) setFormSocialLinks(draft.socialLinks);
        
        if (draft.age) setFormAge(draft.age);
        if (draft.height) setFormHeight(draft.height);
        if (draft.weight) setFormWeight(draft.weight);
        if (draft.hairColor) setFormHairColor(draft.hairColor);
        if (draft.eyeColor) setFormEyeColor(draft.eyeColor);
        
        // Exclude Base64 strings from restoring to avoid loading lag, but load links
        if (draft.profileImage && !draft.profileImage.startsWith("data:image/")) {
          setFormProfileImage(draft.profileImage);
        }
        if (draft.coverImage && !draft.coverImage.startsWith("data:image/")) {
          setFormCoverImage(draft.coverImage);
        }
        if (draft.coverPosition) setFormCoverPosition(draft.coverPosition);
        if (draft.introVideo) setFormIntroVideo(draft.introVideo);
        if (draft.introVideoRatio) setFormIntroVideoRatio(draft.introVideoRatio);
        
        if (draft.gallery) {
          const linksOnly = draft.gallery.filter((url: string) => !url.startsWith("data:image/"));
          setFormGallery(linksOnly);
        }
        if (draft.videos) setFormVideos(draft.videos);
        if (draft.experience) setFormExperience(draft.experience);
      }
    } catch (e) {
      console.error("Failed to load casting form draft:", e);
    }
  }, []);

  // Save draft to localStorage on any state changes
  useEffect(() => {
    // Save only text and URL links to prevent QuotaExceededError from large Base64 content
    const cleanProfileImage = formProfileImage.startsWith("data:image/") ? "" : formProfileImage;
    const cleanCoverImage = formCoverImage.startsWith("data:image/") ? "" : formCoverImage;
    const cleanGallery = formGallery.filter(url => !url.startsWith("data:image/"));

    const draft = {
      name: formName,
      category: formCategory,
      location: formLocation,
      email: formEmail,
      phone: formPhone,
      bio: formBio,
      skills: formSkills,
      socialLinks: formSocialLinks,
      age: formAge,
      height: formHeight,
      weight: formWeight,
      hairColor: formHairColor,
      eyeColor: formEyeColor,
      profileImage: cleanProfileImage,
      coverImage: cleanCoverImage,
      coverPosition: formCoverPosition,
      introVideo: formIntroVideo,
      introVideoRatio: formIntroVideoRatio,
      gallery: cleanGallery,
      videos: formVideos,
      experience: formExperience
    };
    try {
      localStorage.setItem("raghuvansh_apply_draft", JSON.stringify(draft));
    } catch (e) {
      console.warn("Storage warning: Could not save draft to localStorage.", e);
    }
  }, [
    formName,
    formCategory,
    formLocation,
    formEmail,
    formPhone,
    formBio,
    formSkills,
    formSocialLinks,
    formAge,
    formHeight,
    formWeight,
    formHairColor,
    formEyeColor,
    formProfileImage,
    formCoverImage,
    formCoverPosition,
    formIntroVideo,
    formIntroVideoRatio,
    formGallery,
    formVideos,
    formExperience
  ]);

  const handleDiscardDraft = () => {
    if (window.confirm("Are you sure you want to discard your application draft? All entries will be reset.")) {
      localStorage.removeItem("raghuvansh_apply_draft");
      setFormName("");
      setFormCategory("Actor");
      setFormLocation("");
      setFormEmail("");
      setFormPhone("");
      setFormBio("");
      setFormSkills([]);
      setFormSocialLinks({
        instagram: "",
        instagramFollowers: "",
        facebook: "",
        facebookFollowers: "",
        youtube: "",
        youtubeSubscribers: "",
        custom: []
      });
      setFormAge(25);
      setFormHeight("5'8\"");
      setFormWeight("65 kg");
      setFormHairColor("Black");
      setFormEyeColor("Brown");
      setFormProfileImage("");
      setFormCoverImage("");
      setFormCoverPosition("50% 50%");
      setFormIntroVideo("");
      setFormIntroVideoRatio("16:9");
      setFormGallery([]);
      setFormVideos([]);
      setFormExperience([]);
      setValidationError(null);
      setActiveTab("identity");
    }
  };

  // Add Skill Tag
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const tag = skillInput.trim();
    if (!tag) return;
    if (formSkills.length >= 12) {
      alert("Maximum of 12 skills allowed.");
      return;
    }
    if (!formSkills.includes(tag)) {
      setFormSkills([...formSkills, tag]);
    }
    setSkillInput("");
  };

  const handleRemoveSkill = (tag: string) => {
    setFormSkills(formSkills.filter((s) => s !== tag));
  };

  // Add Portfolio Video URL
  const handleAddVideoLink = (e: React.FormEvent) => {
    e.preventDefault();
    const url = videoInput.trim();
    if (!url) return;
    try {
      new URL(url);
    } catch {
      alert("Please enter a valid video link.");
      return;
    }
    if (formVideos.length >= 5) {
      alert("Maximum of 5 video portfolio links allowed.");
      return;
    }
    if (!formVideos.includes(url)) {
      setFormVideos([...formVideos, url]);
    }
    setVideoInput("");
  };

  const handleRemoveVideoLink = (url: string) => {
    setFormVideos(formVideos.filter((v) => v !== url));
  };

  // Add Timeline Experience
  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    const title = expTitle.trim();
    const role = expRole.trim();
    const year = expYear.trim();

    if (!title || !role || !year) {
      alert("Please fill in all credit fields (Title, Character/Role, and Year).");
      return;
    }
    if (formExperience.length >= 10) {
      alert("Maximum of 10 theatrical credits allowed.");
      return;
    }

    setFormExperience([
      ...formExperience,
      {
        id: `exp_${Date.now()}`,
        title,
        role,
        year
      }
    ]);
    setExpTitle("");
    setExpRole("");
    setExpYear("");
  };

  const handleRemoveExperience = (id: string) => {
    setFormExperience(formExperience.filter((item) => item.id !== id));
  };

  // Tab Navigation Validation checks
  const validateAndNext = (nextTab: "stats" | "media" | "experience") => {
    setValidationError(null);

    if (activeTab === "identity") {
      if (!formName.trim() || formName.trim().length < 2) {
        setValidationError("Full Name is required (minimum 2 characters).");
        return;
      }
      if (!formLocation) {
        setValidationError("Please select your Location Hub.");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formEmail)) {
        setValidationError("Please enter a valid Email Address.");
        return;
      }
      if (!formPhone.trim() || formPhone.trim().length < 8) {
        setValidationError("Please enter a valid Phone/WhatsApp Number.");
        return;
      }
    }

    if (activeTab === "stats" && nextTab === "media") {
      if (!formAge || formAge < 5 || formAge > 90) {
        setValidationError("Please enter a valid Age (between 5 and 90).");
        return;
      }
    }

    if (activeTab === "media" && nextTab === "experience") {
      if (!formProfileImage) {
        setValidationError("Profile Picture is required.");
        return;
      }
      if (formGallery.length < 2) {
        setValidationError("Please upload or link at least 2 Photos in the Gallery.");
        return;
      }
    }

    setActiveTab(nextTab);
  };

  // Submission handler via Firebase and WhatsApp
  const handleCastingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Final Validation check
    if (!formName.trim() || !formLocation || !formEmail || !formPhone) {
      setValidationError("Please complete required Identity fields.");
      setActiveTab("identity");
      return;
    }
    if (!formProfileImage) {
      setValidationError("Profile Picture is required.");
      setActiveTab("media");
      return;
    }
    if (formGallery.length < 2) {
      setValidationError("At least 2 Gallery photos are required.");
      setActiveTab("media");
      return;
    }

    setIsSubmitting(true);
    setValidationError(null);

    try {
      let storageFailed = false;
      // Helper function to upload base64 image to Storage
      const uploadFile = async (base64Str: string, folder: string) => {
        if (!base64Str || !base64Str.startsWith("data:image/")) {
          return base64Str; // Already a URL or empty
        }
        if (storageFailed) {
          console.warn(`Firebase Storage previously failed, compressing base64 for ${folder}...`);
          try {
            return await compressBase64Image(base64Str, 300, 0.5);
          } catch (compressErr) {
            console.error("Compression failed:", compressErr);
            return base64Str;
          }
        }
        try {
          const fileExt = base64Str.split(";")[0].split("/")[1] || "jpeg";
          const filename = `${Math.random().toString(36).substring(2, 9)}_${Date.now()}.${fileExt}`;
          const storageRef = ref(storage, `auditions/${folder}/${filename}`);
          await uploadString(storageRef, base64Str, "data_url");
          return await getDownloadURL(storageRef);
        } catch (storageErr) {
          console.error(`Firebase Storage upload failed for ${folder}:`, storageErr);
          storageFailed = true; // Skip future storage attempts to avoid wasting time
          
          try {
            console.log(`Compressing fallback base64 image for ${folder}...`);
            return await compressBase64Image(base64Str, 300, 0.5);
          } catch (compressErr) {
            console.error("Compression failed:", compressErr);
            return base64Str;
          }
        }
      };

      // Upload Profile Image
      const finalProfileUrl = await uploadFile(formProfileImage, "profiles");

      // Upload Cover Image if any
      let finalCoverUrl = "";
      if (formCoverImage) {
        finalCoverUrl = await uploadFile(formCoverImage, "covers");
      }

      // Upload Gallery Images
      const finalGalleryUrls: string[] = [];
      for (const item of formGallery) {
        const url = await uploadFile(item, "gallery");
        finalGalleryUrls.push(url);
      }

      // Prepare application details
      const applicationData = {
        name: formName.trim(),
        category: formCategory,
        location: formLocation,
        email: formEmail.trim(),
        phone: formPhone.trim(),
        bio: formBio.trim(),
        skills: formSkills,
        socialLinks: formSocialLinks,
        age: formAge,
        height: formHeight,
        weight: formWeight,
        hairColor: formHairColor,
        eyeColor: formEyeColor,
        profileImage: finalProfileUrl,
        coverImage: finalCoverUrl,
        coverPosition: formCoverPosition,
        introVideo: formIntroVideo,
        introVideoRatio: formIntroVideoRatio,
        gallery: finalGalleryUrls,
        videos: formVideos,
        experience: formExperience,
        createdAt: serverTimestamp(),
      };

      // Save to firestore
      await addDoc(collection(db, "auditions"), applicationData);

      setSubmitted(true);
      localStorage.removeItem("raghuvansh_apply_draft");
    } catch (e: any) {
      console.error("Firebase save failed: ", e);
      setValidationError("Failed to save application. Please check your Firebase Firestore rules or connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock object for live preview modal mapping
  const previewData = {
    name: formName || "Artist Name",
    category: formCategory,
    location: formLocation || "Hub Center",
    email: formEmail || "contact@domain.com",
    phone: formPhone || "+91 99999 99999",
    bio: formBio,
    profileImage: formProfileImage,
    coverImage: formCoverImage,
    coverPosition: formCoverPosition,
    introVideo: formIntroVideo,
    introVideoRatio: formIntroVideoRatio,
    socialLinks: formSocialLinks,
    stats: {
      age: formAge,
      height: formHeight,
      weight: formWeight,
      hairColor: formHairColor,
      eyeColor: formEyeColor
    },
    skills: formSkills,
    experience: formExperience,
    gallery: formGallery,
    videos: formVideos
  };

  return (
    <>
      <Navigation />
      <main className="flex-grow bg-canvas text-ink pt-28 pb-20 film-grain min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="font-body text-xs text-gold uppercase tracking-[0.2em] font-bold block mb-2">
              Auditions & Representation
            </span>
            <h1 className="font-heading text-4xl md:text-5xl text-curtain font-bold mb-4">
              Join Our Roster
            </h1>
            <p className="font-body text-sm md:text-md text-ink/75 max-w-xl mx-auto leading-relaxed">
              Submit your portfolio, measurements, theatrical history, and photos to apply for castings, acting roles, and workshops at Raghuvansh.
            </p>
          </div>

          {/* Validation Notice Banner */}
          {validationError && (
            <div className="mb-6 bg-curtain/10 border border-curtain/30 rounded-sm p-4 flex items-start gap-3 text-curtain text-sm animate-fadeIn">
              <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold uppercase tracking-wider text-xs block mb-1">Validation Error</span>
                <p>{validationError}</p>
              </div>
            </div>
          )}

          {submitted ? (
            <div className="bg-white border border-gold/25 p-12 text-center rounded-sm shadow-xl max-w-xl mx-auto animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center mx-auto text-gold mb-6">
                <CheckCircle2 size={36} />
              </div>
              <h2 className="font-heading text-2xl text-curtain font-bold mb-4">
                Application Submitted!
              </h2>
              <p className="font-body text-sm text-ink/80 leading-relaxed mb-6">
                Thank you, <strong className="text-curtain">{formName}</strong>. Your casting application has been successfully saved and is now visible in the admin panel.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Button variant="primary" onClick={() => setSubmitted(false)}>
                  Apply Again
                </Button>
                <Button variant="outline" href="/">
                  Go Home
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gold/20 shadow-xl rounded-sm overflow-hidden flex flex-col">
              {/* Wizard Nav Tabs */}
              <div className="flex border-b border-gold/15 bg-canvas/30 overflow-x-auto select-none scrollbar-none">
                {[
                  { key: "identity", label: "1. Profile Info" },
                  { key: "stats", label: "2. Measurements" },
                  { key: "media", label: "3. Media Gallery" },
                  { key: "experience", label: "4. Credits" }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => {
                      if (tab.key === "identity") setActiveTab("identity");
                      else if (tab.key === "stats") validateAndNext("stats");
                      else if (tab.key === "media") validateAndNext("media");
                      else if (tab.key === "experience") validateAndNext("experience");
                    }}
                    className={`font-heading text-[10px] sm:text-xs uppercase tracking-widest py-4 px-4 sm:px-6 border-b-2 transition-all flex-shrink-0 ${
                      activeTab === tab.key
                        ? "border-curtain text-curtain font-bold bg-white"
                        : "border-transparent text-ink/50 hover:text-ink hover:bg-canvas/10"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Form Content body */}
              <div className="p-6 md:p-8 space-y-6">
                {/* ── STEP 1: IDENTITY & CONTACT ── */}
                {activeTab === "identity" && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-xs uppercase tracking-wider text-ink/60 mb-2 font-semibold">
                          Full Name *
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={formName}
                          onChange={(e) => setFormName(e.target.value.replace(/[^a-zA-Z\s\-'.]/g, ""))}
                          placeholder="e.g. Amitosh Sharma"
                          required
                          className="w-full bg-canvas border border-gold/20 focus:border-gold outline-none p-3 rounded-sm transition-colors text-ink text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="category" className="block text-xs uppercase tracking-wider text-ink/60 mb-2 font-semibold">
                          Primary Art Category *
                        </label>
                        <select
                          id="category"
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value)}
                          className="w-full bg-canvas border border-gold/20 focus:border-gold outline-none p-3 rounded-sm transition-colors text-ink text-sm"
                        >
                          <option value="Actor">Actor / Performer</option>
                          <option value="Dancer">Dancer</option>
                          <option value="Voice Artist">Voice Artist</option>
                          <option value="Director">Director / Writer</option>
                          <option value="Production Crew">Production Crew / Tech</option>
                        </select>
                      </div>
                    </div>

                    <LocationSelector onChange={(loc) => setFormLocation(loc)} required />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-xs uppercase tracking-wider text-ink/60 mb-2 font-semibold">
                          Contact Email *
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value.trim())}
                          placeholder="e.g. contact@raghuvansh.co"
                          required
                          className="w-full bg-canvas border border-gold/20 focus:border-gold outline-none p-3 rounded-sm transition-colors text-ink text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-ink/60 mb-2 font-semibold">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={formPhone}
                          onChange={(e) => setFormPhone(e.target.value.replace(/[^0-9+\-\s().]/g, ""))}
                          placeholder="e.g. +91 85859 09213"
                          required
                          className="w-full bg-canvas border border-gold/20 focus:border-gold outline-none p-3 rounded-sm transition-colors text-ink text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="bio" className="block text-xs uppercase tracking-wider text-ink/60 mb-2 font-semibold flex justify-between">
                        <span>Artist Biography</span>
                        <span className="text-[10px] text-ink/40 font-normal">({formBio.length}/500 chars)</span>
                      </label>
                      <textarea
                        id="bio"
                        rows={4}
                        value={formBio}
                        onChange={(e) => setFormBio(e.target.value.slice(0, 500))}
                        placeholder="Tell us about your background, training, dramatic specialization, or artistic aspirations..."
                        className="w-full bg-canvas border border-gold/20 focus:border-gold outline-none p-3 rounded-sm transition-colors text-ink text-sm resize-none"
                      />
                    </div>

                    {/* Skill tags */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-ink/60 mb-2 font-semibold">
                        Skills & Specializations
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value.slice(0, 30))}
                          placeholder="e.g. Classical Singing, Mimicry, Sword Fighting..."
                          className="flex-grow bg-canvas border border-gold/20 focus:border-gold outline-none p-3 rounded-sm transition-colors text-ink text-sm"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddSkill(e);
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={handleAddSkill}
                          className="bg-canvas border border-gold/30 hover:border-gold text-ink text-xs uppercase tracking-wider px-5 py-3 rounded-sm transition-colors"
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {formSkills.length > 0 ? (
                          formSkills.map((skill) => (
                            <span
                              key={skill}
                              className="bg-curtain/5 border border-gold/25 text-curtain font-semibold text-xs px-2.5 py-1 rounded-sm flex items-center gap-1.5"
                            >
                              {skill}
                              <button
                                type="button"
                                onClick={() => handleRemoveSkill(skill)}
                                className="text-curtain hover:text-gold transition-colors"
                              >
                                <X size={12} />
                              </button>
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-ink/40 italic">
                            No special skills added yet.
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Social links */}
                    <div className="border-t border-gold/15 pt-6 space-y-4">
                      <h3 className="font-heading text-xs uppercase tracking-wider text-curtain font-bold">
                        Social Handles / Portfolio Links
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="instagram" className="block text-xs uppercase tracking-wider text-ink/50 mb-1 font-semibold">
                            Instagram Profile URL
                          </label>
                          <div className="flex gap-2">
                            <input
                              id="instagram"
                              type="url"
                              value={formSocialLinks.instagram}
                              onChange={(e) =>
                                setFormSocialLinks({ ...formSocialLinks, instagram: e.target.value })
                              }
                              placeholder="https://instagram.com/handle"
                              className="flex-grow bg-canvas border border-gold/20 focus:border-gold outline-none p-2.5 rounded-sm transition-colors text-ink text-xs"
                            />
                            <input
                              type="text"
                              value={formSocialLinks.instagramFollowers}
                              onChange={(e) =>
                                setFormSocialLinks({
                                  ...formSocialLinks,
                                  instagramFollowers: e.target.value
                                })
                              }
                              placeholder="Followers (e.g. 5K)"
                              className="w-28 bg-canvas border border-gold/20 focus:border-gold outline-none p-2.5 rounded-sm transition-colors text-ink text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="youtube" className="block text-xs uppercase tracking-wider text-ink/50 mb-1 font-semibold">
                            YouTube Channel URL
                          </label>
                          <div className="flex gap-2">
                            <input
                              id="youtube"
                              type="url"
                              value={formSocialLinks.youtube}
                              onChange={(e) =>
                                setFormSocialLinks({ ...formSocialLinks, youtube: e.target.value })
                              }
                              placeholder="https://youtube.com/@handle"
                              className="flex-grow bg-canvas border border-gold/20 focus:border-gold outline-none p-2.5 rounded-sm transition-colors text-ink text-xs"
                            />
                            <input
                              type="text"
                              value={formSocialLinks.youtubeSubscribers}
                              onChange={(e) =>
                                setFormSocialLinks({
                                  ...formSocialLinks,
                                  youtubeSubscribers: e.target.value
                                })
                              }
                              placeholder="Subs (e.g. 10K)"
                              className="w-28 bg-canvas border border-gold/20 focus:border-gold outline-none p-2.5 rounded-sm transition-colors text-ink text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step buttons */}
                    <div className="flex justify-end pt-4 border-t border-gold/15">
                      <button
                        type="button"
                        onClick={() => validateAndNext("stats")}
                        className="bg-curtain hover:bg-gold text-canvas hover:text-ink px-8 py-3 rounded-sm font-body uppercase tracking-widest text-xs transition-all duration-300 flex items-center gap-2 font-bold"
                      >
                        Next Step <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {/* ── STEP 2: MEASUREMENTS ── */}
                {activeTab === "stats" && (
                  <div className="space-y-6 animate-fadeIn">
                    <h3 className="font-heading text-xs uppercase tracking-widest text-curtain font-bold border-b border-gold/15 pb-2 mb-4">
                      Physical Measurements / Casting Profile
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div>
                        <label htmlFor="age" className="block text-xs uppercase tracking-wider text-ink/60 mb-2 font-semibold">
                          Age (Years) *
                        </label>
                        <input
                          id="age"
                          type="number"
                          value={formAge}
                          onChange={(e) => setFormAge(parseInt(e.target.value, 10) || 0)}
                          min={5}
                          max={90}
                          required
                          className="w-full bg-canvas border border-gold/20 focus:border-gold outline-none p-3 rounded-sm transition-colors text-ink text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="height" className="block text-xs uppercase tracking-wider text-ink/60 mb-2 font-semibold">
                          Height (e.g. 5'8" or 173cm) *
                        </label>
                        <input
                          id="height"
                          type="text"
                          value={formHeight}
                          onChange={(e) => setFormHeight(e.target.value)}
                          placeholder="e.g. 5'9 or 175cm"
                          required
                          className="w-full bg-canvas border border-gold/20 focus:border-gold outline-none p-3 rounded-sm transition-colors text-ink text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="weight" className="block text-xs uppercase tracking-wider text-ink/60 mb-2 font-semibold">
                          Weight (e.g. 68 kg)
                        </label>
                        <input
                          id="weight"
                          type="text"
                          value={formWeight}
                          onChange={(e) => setFormWeight(e.target.value)}
                          placeholder="e.g. 65 kg"
                          className="w-full bg-canvas border border-gold/20 focus:border-gold outline-none p-3 rounded-sm transition-colors text-ink text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="hair" className="block text-xs uppercase tracking-wider text-ink/60 mb-2 font-semibold">
                          Hair Color
                        </label>
                        <input
                          id="hair"
                          type="text"
                          value={formHairColor}
                          onChange={(e) => setFormHairColor(e.target.value)}
                          placeholder="e.g. Dark Brown"
                          className="w-full bg-canvas border border-gold/20 focus:border-gold outline-none p-3 rounded-sm transition-colors text-ink text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="eyes" className="block text-xs uppercase tracking-wider text-ink/60 mb-2 font-semibold">
                          Eye Color
                        </label>
                        <input
                          id="eyes"
                          type="text"
                          value={formEyeColor}
                          onChange={(e) => setFormEyeColor(e.target.value)}
                          placeholder="e.g. Brown"
                          className="w-full bg-canvas border border-gold/20 focus:border-gold outline-none p-3 rounded-sm transition-colors text-ink text-sm"
                        />
                      </div>
                    </div>

                    {/* Step buttons */}
                    <div className="flex justify-between pt-6 border-t border-gold/15">
                      <button
                        type="button"
                        onClick={() => setActiveTab("identity")}
                        className="bg-canvas border border-gold/30 hover:border-gold text-ink px-6 py-3 rounded-sm font-body uppercase tracking-widest text-xs transition-all flex items-center gap-2"
                      >
                        <ArrowLeft size={14} /> Back
                      </button>
                      <button
                        type="button"
                        onClick={() => validateAndNext("media")}
                        className="bg-curtain hover:bg-gold text-canvas hover:text-ink px-8 py-3 rounded-sm font-body uppercase tracking-widest text-xs transition-all flex items-center gap-2 font-bold"
                      >
                        Next Step <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {/* ── STEP 3: MEDIA & GALLERY ── */}
                {activeTab === "media" && (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Info notice about Base64 upload submissions */}
                    <div className="bg-gold/5 border border-gold/25 rounded-sm p-4 text-ink/80 text-xs flex gap-3 leading-relaxed items-start">
                      <Info size={16} className="text-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold uppercase tracking-wider block mb-1">Local Image Upload Guide</span>
                        Uploading an image file directly from your device registers as a local draft. Since this portal operates without a centralized database, device uploads will be noted as "Device Uploads" in the WhatsApp draft, and you can simply attach the files directly in the WhatsApp chat when submitting! Or, paste Google Drive share links for fully automatic inclusion.
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ImageUploader
                        value={formProfileImage}
                        onChange={setFormProfileImage}
                        label="Profile Picture * (Headshot)"
                        aspectRatio="1/1"
                      />
                      <ImageUploader
                        value={formCoverImage}
                        onChange={setFormCoverImage}
                        label="Cover Banner (Landscape Backdrop)"
                        isCover={true}
                        coverPosition={formCoverPosition}
                        onCoverPositionChange={setFormCoverPosition}
                      />
                    </div>

                    {/* Gallery Photos */}
                    <div className="border-t border-gold/15 pt-6 space-y-4">
                      <label className="block text-xs uppercase tracking-wider text-ink/70 font-semibold">
                        Photo Portfolio Gallery * (At least 2 photos, Max 6)
                      </label>
                      {formGallery.length < 6 && (
                        <ImageUploader
                          value=""
                          onChange={(url) => {
                            if (url && !formGallery.includes(url)) {
                              setFormGallery([...formGallery, url]);
                            }
                          }}
                          label="Add Portfolio Photo"
                        />
                      )}
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                        {formGallery.map((url, idx) => (
                          <div
                            key={url}
                            className="aspect-square border border-gold/15 rounded-sm overflow-hidden bg-canvas relative group"
                          >
                            <img src={url} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setFormGallery(formGallery.filter((item) => item !== url))}
                              className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-canvas hover:text-gold"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                      {formGallery.length === 0 && (
                        <span className="text-xs text-ink/40 italic block">No gallery photos added yet.</span>
                      )}
                    </div>

                    {/* Video Embeds */}
                    <div className="border-t border-gold/15 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="intro-video" className="block text-xs uppercase tracking-wider text-ink/60 mb-2 font-semibold">
                          Introduction Video Link
                        </label>
                        <input
                          id="intro-video"
                          type="url"
                          value={formIntroVideo}
                          onChange={(e) => setFormIntroVideo(e.target.value)}
                          placeholder="YouTube, Vimeo or Google Drive video share link..."
                          className="w-full bg-canvas border border-gold/20 focus:border-gold outline-none p-3 rounded-sm transition-colors text-ink text-sm mb-3"
                        />
                        {formIntroVideo && (
                          <div className="flex gap-2 items-center">
                            <span className="text-[10px] text-ink/60 uppercase font-semibold">Video Aspect Ratio:</span>
                            {["16:9", "9:16", "4:5"].map((ratio) => (
                              <button
                                key={ratio}
                                type="button"
                                onClick={() => setFormIntroVideoRatio(ratio)}
                                className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1.5 rounded-sm transition-colors border ${
                                  formIntroVideoRatio === ratio
                                    ? "bg-curtain text-canvas border-curtain"
                                    : "border-gold/30 text-ink/60"
                                }`}
                              >
                                {ratio}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-ink/60 mb-2 font-semibold">
                          Showreel & Performance Clip Links (Max 5)
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="url"
                            value={videoInput}
                            onChange={(e) => setVideoInput(e.target.value)}
                            placeholder="Paste performance / showreel URL..."
                            className="flex-grow bg-canvas border border-gold/20 focus:border-gold outline-none p-3 rounded-sm transition-colors text-ink text-sm"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddVideoLink(e);
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={handleAddVideoLink}
                            className="bg-canvas border border-gold/30 hover:border-gold text-ink text-xs uppercase tracking-wider px-5 py-3 rounded-sm transition-colors"
                          >
                            Add
                          </button>
                        </div>
                        <div className="space-y-2 mt-3 max-h-36 overflow-y-auto pr-1">
                          {formVideos.map((url) => (
                            <div
                              key={url}
                              className="bg-canvas/50 border border-gold/15 p-2 rounded-sm text-xs flex justify-between items-center gap-2"
                            >
                              <span className="truncate text-ink/80">{url}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveVideoLink(url)}
                                className="text-curtain hover:text-gold flex-shrink-0 transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                          {formVideos.length === 0 && (
                            <span className="text-xs text-ink/40 italic block">No showreel links added.</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Step buttons */}
                    <div className="flex justify-between pt-6 border-t border-gold/15">
                      <button
                        type="button"
                        onClick={() => setActiveTab("stats")}
                        className="bg-canvas border border-gold/30 hover:border-gold text-ink px-6 py-3 rounded-sm font-body uppercase tracking-widest text-xs transition-all flex items-center gap-2"
                      >
                        <ArrowLeft size={14} /> Back
                      </button>
                      <button
                        type="button"
                        onClick={() => validateAndNext("experience")}
                        className="bg-curtain hover:bg-gold text-canvas hover:text-ink px-8 py-3 rounded-sm font-body uppercase tracking-widest text-xs transition-all flex items-center gap-2 font-bold"
                      >
                        Next Step <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {/* ── STEP 4: EXPERIENCE & CREDITS ── */}
                {activeTab === "experience" && (
                  <div className="space-y-6 animate-fadeIn">
                    <h3 className="font-heading text-xs uppercase tracking-widest text-curtain font-bold border-b border-gold/15 pb-2 mb-4">
                      Theatrical Credits & Project Timeline (Max 10)
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end bg-canvas/30 p-4 border border-gold/10 rounded-sm">
                      <div className="sm:col-span-2">
                        <label htmlFor="exp-title" className="block text-[10px] uppercase tracking-wider text-ink/60 mb-1.5 font-semibold">
                          Project / Play Title
                        </label>
                        <input
                          id="exp-title"
                          type="text"
                          value={expTitle}
                          onChange={(e) => setExpTitle(e.target.value.slice(0, 80))}
                          placeholder="e.g. Shakuntala"
                          className="w-full bg-white border border-gold/25 focus:border-gold outline-none p-2.5 rounded-sm transition-colors text-ink text-xs"
                        />
                      </div>
                      <div>
                        <label htmlFor="exp-role" className="block text-[10px] uppercase tracking-wider text-ink/60 mb-1.5 font-semibold">
                          Character / Role
                        </label>
                        <input
                          id="exp-role"
                          type="text"
                          value={expRole}
                          onChange={(e) => setExpRole(e.target.value.slice(0, 60))}
                          placeholder="e.g. King Dushyanta"
                          className="w-full bg-white border border-gold/25 focus:border-gold outline-none p-2.5 rounded-sm transition-colors text-ink text-xs"
                        />
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-grow">
                          <label htmlFor="exp-year" className="block text-[10px] uppercase tracking-wider text-ink/60 mb-1.5 font-semibold">
                            Year
                          </label>
                          <input
                            id="exp-year"
                            type="text"
                            value={expYear}
                            onChange={(e) => setExpYear(e.target.value.replace(/\D/g, "").slice(0, 4))}
                            placeholder="e.g. 2024"
                            className="w-full bg-white border border-gold/25 focus:border-gold outline-none p-2.5 rounded-sm transition-colors text-ink text-xs"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleAddExperience}
                          className="bg-curtain hover:bg-gold text-canvas hover:text-ink px-4 py-2.5 rounded-sm transition-colors flex items-center justify-center flex-shrink-0"
                          title="Add Credit"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Timeline List */}
                    <div className="space-y-3">
                      {formExperience.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white border border-gold/15 p-4 rounded-sm flex justify-between items-center gap-4 hover:border-gold/40 transition-colors animate-fadeIn"
                        >
                          <div>
                            <span className="bg-gold/10 border border-gold/20 text-curtain text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide">
                              {item.year}
                            </span>
                            <h4 className="font-heading text-sm text-ink font-bold mt-1.5">
                              {item.title}
                            </h4>
                            <p className="font-body text-xs text-ink/60 mt-0.5">
                              Role / Character: <span className="font-semibold text-ink/80">{item.role}</span>
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveExperience(item.id)}
                            className="text-ink/40 hover:text-curtain p-2 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}

                      {formExperience.length === 0 && (
                        <div className="text-center py-10 border border-dashed border-gold/15 rounded-sm text-ink/40 font-body text-xs italic bg-canvas/10">
                          No theatrical credits added yet. Input projects above to build your timeline.
                        </div>
                      )}
                    </div>

                    {/* Step buttons */}
                    <div className="flex justify-between pt-6 border-t border-gold/15">
                      <button
                        type="button"
                        onClick={() => setActiveTab("media")}
                        className="bg-canvas border border-gold/30 hover:border-gold text-ink px-6 py-3 rounded-sm font-body uppercase tracking-widest text-xs transition-all flex items-center gap-2"
                      >
                        <ArrowLeft size={14} /> Back
                      </button>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={handleDiscardDraft}
                          className="border border-curtain/30 hover:border-curtain text-curtain px-5 py-3 rounded-sm font-body uppercase tracking-widest text-xs transition-all flex items-center gap-2"
                        >
                          Discard
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          onClick={handleCastingSubmit}
                          className="bg-curtain hover:bg-gold text-canvas hover:text-ink px-10 py-3 rounded-sm font-body uppercase tracking-widest text-xs transition-all duration-300 font-bold flex items-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? "Uploading Portfolio..." : "Submit & Connect on WhatsApp"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Blueprint Live Preview Sticky Footer */}
              <div className="border-t border-gold/15 bg-canvas/30 py-4 px-6 md:px-8 flex justify-between items-center flex-wrap gap-4 text-xs font-body text-ink/60">
                <span>Auto-saves drafts locally on your browser.</span>
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(true)}
                  className="bg-white hover:bg-canvas border border-gold/25 hover:border-gold px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-ink hover:text-gold transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Eye size={12} className="text-curtain" /> Show Live Preview
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Profile Blueprint Live Preview Modal */}
      <ProfilePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        data={previewData}
      />
      <Footer />
    </>
  );
}
