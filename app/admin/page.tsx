"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import {
  Users,
  Mail,
  Phone,
  MapPin,
  Calendar,
  LogOut,
  Search,
  Trash2,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Eye,
  Globe,
  Film,
  User,
  Info,
  SlidersHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  Plus,
  Save,
  Check,
  Link as LinkIcon,
  Play,
  X
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface SocialLinks {
  instagram?: string;
  instagramFollowers?: string;
  facebook?: string;
  facebookFollowers?: string;
  youtube?: string;
  youtubeSubscribers?: string;
  custom?: Array<{ platform: string; url: string }>;
}

interface ExperienceItem {
  id: string;
  title: string;
  role: string;
  year: string;
}

interface Audition {
  id: string;
  name: string;
  category: string;
  location: string;
  email: string;
  phone: string;
  bio: string;
  skills: string[];
  socialLinks: SocialLinks;
  age: number;
  height: string;
  weight: string;
  hairColor: string;
  eyeColor: string;
  profileImage: string;
  coverImage?: string;
  coverPosition?: string;
  introVideo?: string;
  introVideoRatio?: string;
  gallery: string[];
  videos: string[];
  experience: ExperienceItem[];
  createdAt: string;
}

interface Enquiry {
  id: string;
  name: string;
  email: string;
  subject: string; // mapped from select option: e.g. "General", "Casting", "RamLeela", "Productions", etc.
  message: string;
  createdAt: string;
}

// Subject Map for easier display names
const SUBJECT_LABELS: Record<string, string> = {
  General: "General Enquiry",
  Casting: "Casting Call / Auditions",
  RamLeela: "Ramayan VIP Pass / Booking",
  Productions: "Theatre Productions Booking",
  Ghazal: "Mehfil-e-Ghazal Booking",
  AnnualDay: "Collaborations",
  Workshop: "Workshops & Training",
  Collaboration: "Collaboration Ideas",
  NGO: "NGO & Community Partnerships",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [auditions, setAuditions] = useState<Audition[]>([]);

  // Filtering / Tabs & Pagination
  const [activeTab, setActiveTab] = useState<string>("auditions"); // 'auditions' or specific enquiry subject
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const PAGE_SIZE = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm, sortOrder]);

  // Selected details drawer
  const [selectedAudition, setSelectedAudition] = useState<Audition | null>(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [isDeletingType, setIsDeletingType] = useState<"enquiries" | "auditions" | null>(null);

  // Website Content CRM State
  const [ramayanGlimpses, setRamayanGlimpses] = useState<string[]>([
    "myAHgdaFJbk",
    "Q7sO8kL0S88",
    "xhj7PqgMrDI",
    "I5Rs8_zG-FA",
    "sILv2SqlBsI"
  ]);
  const [newGlimpseInput, setNewGlimpseInput] = useState("");
  const [customProductions, setCustomProductions] = useState<any[]>([]);
  const [isAddProdOpen, setIsAddProdOpen] = useState(false);
  const [savingContent, setSavingContent] = useState(false);
  const [crmToast, setCrmToast] = useState<string | null>(null);

  const [newProdForm, setNewProdForm] = useState({
    title: "",
    year: new Date().getFullYear().toString(),
    director: "Animesh Pandit",
    genre: "Theatre Drama",
    duration: "120 mins",
    poster: "",
    playwright: "Badal Sircar",
    excerpt: "",
    teaser: ""
  });

  useEffect(() => {
    checkAuthAndFetchData();
  }, []);

  const checkAuthAndFetchData = async () => {
    try {
      const authRes = await fetch("/api/admin/verify");
      const authData = await authRes.json();

      if (!authData.authenticated) {
        router.push("/admin/login");
        return;
      }

      setAuthenticated(true);

      let loadedEnquiries: any[] = [];
      let loadedAuditions: any[] = [];

      const dataRes = await fetch("/api/admin/data");
      if (dataRes.ok) {
        const data = await dataRes.json();
        loadedEnquiries = data.enquiries || [];
        loadedAuditions = data.auditions || [];
      }

      // If API return is empty, attempt client SDK fetch with authenticated user context
      if (loadedEnquiries.length === 0 || loadedAuditions.length === 0) {
        try {
          if (loadedEnquiries.length === 0) {
            const enqSnap = await getDocs(collection(db, "enquiries"));
            if (enqSnap.docs.length > 0) {
              loadedEnquiries = enqSnap.docs.map((d) => {
                const data = d.data();
                return {
                  id: d.id,
                  ...data,
                  createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : (data.createdAt || ""),
                };
              }).sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
            }
          }

          if (loadedAuditions.length === 0) {
            const audSnap = await getDocs(collection(db, "auditions"));
            if (audSnap.docs.length > 0) {
              loadedAuditions = audSnap.docs.map((d) => {
                const data = d.data();
                return {
                  id: d.id,
                  ...data,
                  createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : (data.createdAt || ""),
                };
              }).sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
            }
          }
        } catch (clientFsErr) {
          console.warn("Client-side Firestore fallback note:", clientFsErr);
        }
      }

      setEnquiries(loadedEnquiries);
      setAuditions(loadedAuditions);

      // Fetch Website Content CRM
      fetch("/api/admin/content")
        .then((res) => res.json())
        .then((cData) => {
          if (cData.glimpses && cData.glimpses.length > 0) setRamayanGlimpses(cData.glimpses);
          if (cData.productions) setCustomProductions(cData.productions);
        })
        .catch((err) => console.error("Error fetching content CRM data:", err));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const extractYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url.trim();
  };

  const handleAddGlimpse = async () => {
    if (!newGlimpseInput.trim()) return;
    const yId = extractYouTubeId(newGlimpseInput);
    if (!yId) return;
    const updated = [...ramayanGlimpses, yId];
    setRamayanGlimpses(updated);
    setNewGlimpseInput("");
    await saveContentToServer("ramayan", updated);
  };

  const handleDeleteGlimpse = async (id: string) => {
    const updated = ramayanGlimpses.filter((item) => item !== id);
    setRamayanGlimpses(updated);
    await saveContentToServer("ramayan", updated);
  };

  const handleSaveAddProduction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdForm.title.trim()) return;

    const slug = newProdForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    const newProd = {
      slug: slug || `prod-${Date.now()}`,
      title: newProdForm.title,
      year: parseInt(newProdForm.year) || new Date().getFullYear(),
      director: newProdForm.director || "Animesh Pandit",
      genre: newProdForm.genre || "Theatre",
      duration: newProdForm.duration || "120 mins",
      poster: newProdForm.poster || "/production-assets/baaki-itihaas/poster-1.webp",
      playwright: newProdForm.playwright || "Pt. Amitosh Sharma",
      excerpt: newProdForm.excerpt || newProdForm.title,
      teaser: newProdForm.teaser || null,
      cast: [],
      castRoles: [],
      synopsisFull: [newProdForm.excerpt]
    };

    const updated = [newProd, ...customProductions];
    setCustomProductions(updated);
    setIsAddProdOpen(false);
    setNewProdForm({
      title: "",
      year: new Date().getFullYear().toString(),
      director: "Animesh Pandit",
      genre: "Theatre Drama",
      duration: "120 mins",
      poster: "",
      playwright: "Badal Sircar",
      excerpt: "",
      teaser: ""
    });
    await saveContentToServer("productions", updated);
  };

  const handleDeleteProduction = async (slug: string) => {
    const updated = customProductions.filter((p) => p.slug !== slug);
    setCustomProductions(updated);
    await saveContentToServer("productions", updated);
  };

  const saveContentToServer = async (type: "ramayan" | "productions", payload: any) => {
    setSavingContent(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, payload }),
      });
      if (res.ok) {
        setCrmToast("Changes saved & published to website successfully!");
        setTimeout(() => setCrmToast(null), 3500);
      }
    } catch (err) {
      console.error("Content save error:", err);
    } finally {
      setSavingContent(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/verify", { method: "DELETE" });
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleDelete = async (id: string, type: "enquiries" | "auditions") => {
    try {
      const res = await fetch("/api/admin/data", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type }),
      });

      if (res.ok) {
        if (type === "enquiries") {
          setEnquiries(enquiries.filter((e) => e.id !== id));
          if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
        } else {
          setAuditions(auditions.filter((a) => a.id !== id));
          if (selectedAudition?.id === id) setSelectedAudition(null);
        }
        setIsDeletingId(null);
        setIsDeletingType(null);
      } else {
        alert("Failed to delete document.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting document.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center font-body text-curtain/50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold border-t-curtain rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm font-semibold tracking-wider uppercase">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) return null;

  // Filtered List
  const getFilteredData = () => {
    let result: any[] = [];
    if (activeTab === "auditions") {
      result = auditions;
    } else if (activeTab === "all_enquiries") {
      result = enquiries;
    } else {
      result = enquiries.filter(
        (e) =>
          e.subject === activeTab ||
          (!e.subject && activeTab === "General") ||
          (e.subject && e.subject.toLowerCase() === activeTab.toLowerCase())
      );
    }

    // Search term
    if (searchTerm) {
      const query = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.name?.toLowerCase().includes(query) ||
          item.email?.toLowerCase().includes(query) ||
          (activeTab === "auditions" && item.phone?.includes(query))
      );
    }

    // Sort order
    return [...result].sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
    });
  };

  const filteredData = getFilteredData();
  const totalPages = Math.max(1, Math.ceil(filteredData.length / PAGE_SIZE));
  const paginatedData = filteredData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Stats Counters
  const totalAuditions = auditions.length;
  const getEnquiryCount = (subject: string) => enquiries.filter((e) => e.subject === subject).length;

  return (
    <>
      <Navigation />
      <main className="bg-canvas text-ink pt-24 pb-20 min-h-screen font-body relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Sidebar / Tabs */}
            <div className={`${isSidebarCollapsed ? "lg:col-span-1" : "lg:col-span-3"} bg-white border border-gold/20 p-4 rounded-sm shadow-md transition-all duration-300 flex flex-col justify-between min-h-[500px]`}>
              <div>
                {/* Sidebar Header with Collapse Toggle */}
                <div className="flex items-center justify-between border-b border-gold/15 pb-3 mb-4">
                  {!isSidebarCollapsed && (
                    <span className="text-xs font-bold uppercase tracking-wider text-curtain">
                      Admin Panel
                    </span>
                  )}
                  <button
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className="p-1.5 rounded-sm hover:bg-gold/10 text-curtain transition-colors mx-auto lg:mx-0"
                    title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                  >
                    {isSidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
                  </button>
                </div>

                {isSidebarCollapsed ? (
                  /* Collapsed Icon Sidebar */
                  <div className="space-y-3 flex flex-col items-center">
                    {/* Auditions Icon */}
                    <button
                      onClick={() => { setActiveTab("auditions"); setSelectedAudition(null); setSelectedEnquiry(null); }}
                      className={`p-3 rounded-sm relative transition-all ${
                        activeTab === "auditions" ? "bg-curtain text-gold shadow-md" : "hover:bg-gold/10 text-ink/75"
                      }`}
                      title={`Casting / Auditions (${totalAuditions})`}
                    >
                      <Users size={18} />
                      <span className="absolute -top-1 -right-1 bg-gold text-ink text-[9px] font-bold px-1 rounded-full">
                        {totalAuditions}
                      </span>
                    </button>

                    {/* All Enquiries Icon */}
                    <button
                      onClick={() => { setActiveTab("all_enquiries"); setSelectedAudition(null); setSelectedEnquiry(null); }}
                      className={`p-3 rounded-sm relative transition-all ${
                        activeTab === "all_enquiries" ? "bg-curtain text-gold shadow-md" : "hover:bg-gold/10 text-ink/75"
                      }`}
                      title={`All Enquiries (${enquiries.length})`}
                    >
                      <Mail size={18} />
                      <span className="absolute -top-1 -right-1 bg-gold text-ink text-[9px] font-bold px-1 rounded-full">
                        {enquiries.length}
                      </span>
                    </button>

                    {/* Website CRM Icon */}
                    <button
                      onClick={() => { setActiveTab("website_crm"); setSelectedAudition(null); setSelectedEnquiry(null); }}
                      className={`p-3 rounded-sm relative transition-all ${
                        activeTab === "website_crm" ? "bg-curtain text-gold shadow-md" : "hover:bg-gold/10 text-ink/75"
                      }`}
                      title="Website Content CRM"
                    >
                      <Globe size={18} />
                    </button>
                  </div>
                ) : (
                  /* Expanded Sidebar */
                  <div className="space-y-2">
                    <span className="block text-[10px] uppercase tracking-wider text-ink/40 font-bold mb-2">Sections</span>
                    
                    {/* Auditions Tab */}
                    <button
                      onClick={() => { setActiveTab("auditions"); setSelectedAudition(null); setSelectedEnquiry(null); }}
                      className={`w-full text-left p-2.5 rounded-sm flex items-center justify-between transition-all ${
                        activeTab === "auditions"
                          ? "bg-curtain text-canvas shadow-md"
                          : "bg-canvas/50 text-ink/80 border border-gold/15 hover:border-gold/50"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Users size={15} className={activeTab === "auditions" ? "text-gold" : "text-curtain"} />
                        <span className="text-xs font-bold uppercase tracking-wider">Casting / Auditions</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        activeTab === "auditions" ? "bg-gold text-ink" : "bg-canvas text-curtain border border-gold/10"
                      }`}>
                        {totalAuditions}
                      </span>
                    </button>

                    {/* Website CRM Tab */}
                    <button
                      onClick={() => { setActiveTab("website_crm"); setSelectedAudition(null); setSelectedEnquiry(null); }}
                      className={`w-full text-left p-2.5 mb-2 rounded-sm flex items-center justify-between transition-all ${
                        activeTab === "website_crm"
                          ? "bg-curtain text-canvas shadow-md"
                          : "bg-canvas/50 text-ink/80 border border-gold/15 hover:border-gold/50 font-bold"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Globe size={15} className={activeTab === "website_crm" ? "text-gold" : "text-curtain"} />
                        <span className="text-xs font-bold uppercase tracking-wider">Website Content CRM</span>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-gold text-ink">
                        CMS
                      </span>
                    </button>

                    <div className="border-t border-gold/15 my-4 pt-3">
                      <span className="block text-[10px] uppercase tracking-wider text-ink/40 font-bold mb-2">Enquiries</span>
                      
                      {/* All Enquiries Button */}
                      <button
                        onClick={() => { setActiveTab("all_enquiries"); setSelectedAudition(null); setSelectedEnquiry(null); }}
                        className={`w-full text-left p-2.5 mb-2 rounded-sm flex items-center justify-between transition-all ${
                          activeTab === "all_enquiries"
                            ? "bg-curtain text-canvas shadow-md"
                            : "bg-canvas/50 text-ink/80 border border-gold/15 hover:border-gold/50 font-bold"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Mail size={14} className={activeTab === "all_enquiries" ? "text-gold" : "text-curtain"} />
                          <span className="text-xs font-bold uppercase tracking-wider">All Enquiries</span>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          activeTab === "all_enquiries" ? "bg-gold text-ink" : "bg-canvas text-curtain border border-gold/10"
                        }`}>
                          {enquiries.length}
                        </span>
                      </button>

                      {Object.entries(SUBJECT_LABELS).map(([subject, label]) => {
                        const count = getEnquiryCount(subject);
                        return (
                          <button
                            key={subject}
                            onClick={() => { setActiveTab(subject); setSelectedAudition(null); setSelectedEnquiry(null); }}
                            className={`w-full text-left p-2 mb-1 rounded-sm flex items-center justify-between transition-all ${
                              activeTab === subject
                                ? "bg-curtain text-canvas shadow-md"
                                : "bg-canvas/30 text-ink/75 border border-gold/10 hover:border-gold/40 hover:bg-canvas/80"
                            }`}
                          >
                            <span className="text-xs font-semibold truncate pr-2">{label}</span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full shrink-0 ${
                              activeTab === subject ? "bg-gold text-ink" : "bg-canvas text-ink/50 border border-gold/10"
                            }`}>
                              {count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Log Out Button */}
              <div className="border-t border-gold/15 pt-4 mt-6">
                {isSidebarCollapsed ? (
                  <button
                    onClick={handleLogout}
                    className="p-3 w-full rounded-sm bg-curtain hover:bg-gold text-canvas hover:text-ink transition-all shadow-md flex justify-center items-center"
                    title="Log Out"
                  >
                    <LogOut size={18} />
                  </button>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-curtain hover:bg-gold text-canvas hover:text-ink px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-md"
                  >
                    <LogOut size={14} /> Log Out
                  </button>
                )}
              </div>
            </div>

            {/* Main Content Area */}
            <div className={`${isSidebarCollapsed ? "lg:col-span-11" : "lg:col-span-9"} space-y-6 transition-all duration-300`}>
              
              {/* Controls Bar */}
              <div className="bg-white border border-gold/20 p-4 rounded-sm shadow-md flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-3 flex-grow max-w-md">
                  {isSidebarCollapsed && (
                    <button
                      onClick={() => setIsSidebarCollapsed(false)}
                      className="p-2 border border-gold/20 rounded-sm hover:bg-gold/10 text-curtain transition-colors shrink-0"
                      title="Expand Sidebar"
                    >
                      <PanelLeftOpen size={16} />
                    </button>
                  )}
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" size={16} />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by name or email..."
                      className="w-full bg-canvas border border-gold/10 focus:border-gold outline-none pl-10 pr-4 py-2 text-xs rounded-sm transition-colors text-ink"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <SlidersHorizontal size={14} className="text-gold" />
                  <span className="text-ink/60 font-semibold uppercase tracking-wider">Sort:</span>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as any)}
                    className="bg-canvas border border-gold/10 outline-none px-2 py-1.5 rounded-sm font-semibold text-ink"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
              </div>

              {/* Data Table / List / Website CRM */}
              <div className="space-y-4">
                {activeTab === "website_crm" ? (
                  /* WEBSITE CONTENT CRM PANEL */
                  <div className="space-y-8">
                    
                    {/* Toast Feedback */}
                    {crmToast && (
                      <div className="bg-emerald-800 text-canvas px-4 py-3 rounded-sm text-xs font-bold flex items-center justify-between shadow-lg animate-fadeIn">
                        <div className="flex items-center gap-2">
                          <Check size={16} className="text-gold" />
                          <span>{crmToast}</span>
                        </div>
                      </div>
                    )}

                    {/* SECTION 1: RAMLEELA GLIMPSES OF GLORY */}
                    <div className="bg-white border border-gold/20 p-6 rounded-sm shadow-md space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold/15 pb-4">
                        <div>
                          <h2 className="font-heading text-xl text-curtain font-bold flex items-center gap-2">
                            <Play size={18} className="text-gold" /> Ramleela: Glimpses of Glory Videos
                          </h2>
                          <p className="text-xs text-ink/60 mt-1 font-semibold">
                            Manage YouTube video links displayed in the Glimpses of Glory section on the Ramayan page.
                          </p>
                        </div>
                        {savingContent && (
                          <span className="text-xs text-gold font-bold uppercase tracking-wider animate-pulse">
                            Publishing...
                          </span>
                        )}
                      </div>

                      {/* Add New Video Link Input */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-grow">
                          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" size={14} />
                          <input
                            type="text"
                            value={newGlimpseInput}
                            onChange={(e) => setNewGlimpseInput(e.target.value)}
                            placeholder="Paste YouTube Link or Video ID (e.g. https://www.youtube.com/watch?v=myAHgdaFJbk)..."
                            className="w-full bg-canvas border border-gold/15 focus:border-gold outline-none pl-9 pr-4 py-2.5 text-xs rounded-sm text-ink font-semibold"
                          />
                        </div>
                        <button
                          onClick={handleAddGlimpse}
                          className="bg-curtain hover:bg-gold text-canvas hover:text-ink px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-md flex items-center justify-center gap-2 shrink-0"
                        >
                          <Plus size={14} /> Add Video Link
                        </button>
                      </div>

                      {/* Video Cards Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                        {ramayanGlimpses.map((yId, idx) => (
                          <div key={`${yId}-${idx}`} className="bg-canvas border border-gold/15 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
                            <div className="relative aspect-video bg-black overflow-hidden">
                              <img
                                src={`https://img.youtube.com/vi/${yId}/hqdefault.jpg`}
                                alt={`Glimpse ${idx + 1}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                              />
                              <span className="absolute top-2 left-2 bg-curtain/90 text-gold text-[10px] font-bold px-2 py-0.5 rounded-sm shadow">
                                Video #{idx + 1}
                              </span>
                            </div>
                            <div className="p-3 flex items-center justify-between gap-2">
                              <span className="text-[11px] font-mono text-ink/75 truncate font-semibold">
                                ID: {yId}
                              </span>
                              <button
                                onClick={() => handleDeleteGlimpse(yId)}
                                className="text-curtain hover:bg-curtain/10 p-1.5 rounded-sm transition-colors"
                                title="Delete Link"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* SECTION 2: OUR PRODUCTIONS MANAGER */}
                    <div className="bg-white border border-gold/20 p-6 rounded-sm shadow-md space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold/15 pb-4">
                        <div>
                          <h2 className="font-heading text-xl text-curtain font-bold flex items-center gap-2">
                            <Film size={18} className="text-gold" /> Our Productions Manager
                          </h2>
                          <p className="text-xs text-ink/60 mt-1 font-semibold">
                            Add new stage productions or edit existing playbills on the Productions page.
                          </p>
                        </div>
                        <button
                          onClick={() => setIsAddProdOpen(true)}
                          className="bg-curtain hover:bg-gold text-canvas hover:text-ink px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-md flex items-center gap-2 self-start sm:self-auto"
                        >
                          <Plus size={14} /> Add New Production
                        </button>
                      </div>

                      {/* Productions Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                        {customProductions.map((prod) => (
                          <div key={prod.slug} className="bg-canvas border border-gold/20 rounded-sm overflow-hidden shadow-md flex flex-col justify-between">
                            <div className="relative h-44 bg-ink overflow-hidden">
                              <img
                                src={prod.poster || "/production-assets/baaki-itihaas/poster-1.webp"}
                                alt={prod.title}
                                className="w-full h-full object-cover opacity-80"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent"></div>
                              <div className="absolute bottom-3 left-3 right-3">
                                <span className="text-[9px] text-gold uppercase tracking-widest font-bold block">
                                  {prod.year} • {prod.genre}
                                </span>
                                <h3 className="font-heading text-base text-canvas font-bold truncate">
                                  {prod.title}
                                </h3>
                              </div>
                            </div>
                            <div className="p-4 space-y-3 flex-grow flex flex-col justify-between text-xs">
                              <p className="text-ink/70 leading-relaxed line-clamp-3">
                                {prod.excerpt}
                              </p>
                              <div className="pt-2 border-t border-gold/10 flex items-center justify-between">
                                <span className="text-[10px] text-ink/50 font-semibold">Director: {prod.director}</span>
                                <button
                                  onClick={() => handleDeleteProduction(prod.slug)}
                                  className="text-curtain hover:bg-curtain/10 p-1.5 rounded-sm transition-colors"
                                  title="Delete Production"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : filteredData.length === 0 ? (
                  <div className="bg-white border border-gold/15 p-12 text-center rounded-sm shadow-md">
                    <p className="text-sm text-ink/50 font-semibold">No submissions found in this section.</p>
                  </div>
                ) : activeTab === "auditions" ? (
                  /* Auditions Grid View */
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {paginatedData.map((audition: Audition) => (
                      <div
                        key={audition.id}
                        className="bg-white border border-gold/20 rounded-sm overflow-hidden shadow-lg hover:shadow-xl transition-all flex flex-col group"
                      >
                        {/* Profile Image Banner */}
                        <div className="h-40 bg-ink relative overflow-hidden shrink-0">
                          {audition.coverImage ? (
                            <img
                              src={audition.coverImage}
                              style={{ objectPosition: audition.coverPosition || "50% 50%" }}
                              className="w-full h-full object-cover opacity-60"
                              alt="Cover image"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-b from-curtain to-ink opacity-40"></div>
                          )}
                          <div className="absolute bottom-3 left-4 right-4 flex items-end gap-3 z-10">
                            <img
                              src={audition.profileImage}
                              className="w-14 h-14 object-cover rounded-full border-2 border-gold shadow-md shrink-0 bg-canvas"
                              alt={audition.name}
                            />
                            <div className="overflow-hidden">
                              <h3 className="font-heading text-sm text-canvas font-bold truncate leading-tight">
                                {audition.name}
                              </h3>
                              <span className="text-[10px] text-gold font-bold uppercase tracking-wider block mt-0.5">
                                {audition.category}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Card Info */}
                        <div className="p-4 flex-grow flex flex-col justify-between text-xs space-y-3">
                          <div className="space-y-1.5 text-ink/75 font-semibold">
                            <div className="flex items-center gap-2">
                              <MapPin size={12} className="text-gold" />
                              <span>{audition.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar size={12} className="text-gold" />
                              <span>{audition.age} Yrs • {audition.height}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail size={12} className="text-gold" />
                              <span className="truncate">{audition.email}</span>
                            </div>
                          </div>

                          <div className="flex gap-2 pt-2 border-t border-gold/10">
                            <button
                              onClick={() => setSelectedAudition(audition)}
                              className="flex-grow bg-curtain hover:bg-gold text-canvas hover:text-ink py-2 text-[10px] uppercase font-bold tracking-wider rounded-sm transition-all flex items-center justify-center gap-1.5"
                            >
                              <Eye size={12} /> View Portfolio
                            </button>
                            <button
                              onClick={() => {
                                setIsDeletingId(audition.id);
                                setIsDeletingType("auditions");
                              }}
                              className="border border-curtain/30 hover:border-curtain text-curtain hover:bg-curtain/5 p-2 rounded-sm transition-all shrink-0"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Enquiries Table/List View */
                  <div className="bg-white border border-gold/15 rounded-sm overflow-hidden shadow-lg divide-y divide-gold/10">
                    {paginatedData.map((enquiry: Enquiry) => (
                      <div
                        key={enquiry.id}
                        className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-canvas/10 transition-colors"
                      >
                        <div className="space-y-1 max-w-xl">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <h3 className="font-heading text-base text-curtain font-bold leading-none">{enquiry.name}</h3>
                            <span className="text-[10px] text-ink/50 bg-canvas border border-gold/10 px-2 py-0.5 rounded-sm font-semibold font-mono">
                              {new Date(enquiry.createdAt).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-ink/60 font-semibold pt-0.5">
                            <Mail size={12} className="text-gold" />
                            <span>{enquiry.email}</span>
                          </div>
                          <p className="text-xs text-ink/80 leading-relaxed pt-2 block font-body">
                            {enquiry.message}
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            setIsDeletingId(enquiry.id);
                            setIsDeletingType("enquiries");
                          }}
                          className="border border-curtain/30 hover:border-curtain text-curtain hover:bg-curtain/5 p-2.5 rounded-sm transition-all self-end md:self-auto shrink-0"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Pagination Controls */}
              {filteredData.length > 0 && (
                <div className="bg-white border border-gold/20 p-4 rounded-sm shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-ink/70">
                  <div>
                    Showing{" "}
                    <span className="text-curtain font-bold">
                      {Math.min((currentPage - 1) * PAGE_SIZE + 1, filteredData.length)}
                    </span>{" "}
                    to{" "}
                    <span className="text-curtain font-bold">
                      {Math.min(currentPage * PAGE_SIZE, filteredData.length)}
                    </span>{" "}
                    of <span className="text-curtain font-bold">{filteredData.length}</span> submissions
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      className="px-3 py-1.5 border border-gold/20 rounded-sm hover:bg-gold/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all flex items-center gap-1 font-bold text-curtain"
                      title="Previous Page"
                    >
                      <ChevronLeft size={14} /> Previous
                    </button>
                    <span className="px-3 py-1.5 bg-canvas border border-gold/10 rounded-sm font-bold text-curtain">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      disabled={currentPage >= totalPages}
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      className="px-3 py-1.5 border border-gold/20 rounded-sm hover:bg-gold/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all flex items-center gap-1 font-bold text-curtain"
                      title="Next Page"
                    >
                      Next <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Audition Detail Modal */}
        {selectedAudition && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
            <div className="bg-canvas border border-gold/30 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative scrollbar-thin scrollbar-thumb-gold/20">
              
              {/* Cover Banner */}
              <div className="h-56 bg-ink relative overflow-hidden">
                {selectedAudition.coverImage ? (
                  <img
                    src={selectedAudition.coverImage}
                    style={{ objectPosition: selectedAudition.coverPosition || "50% 50%" }}
                    className="w-full h-full object-cover opacity-75"
                    alt="Cover banner"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-curtain to-ink opacity-60"></div>
                )}
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedAudition(null)}
                  className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 border border-canvas/20 text-canvas p-2 rounded-full transition-all z-20 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Profile Details Container */}
              <div className="px-6 md:px-10 pb-10 relative">
                
                {/* Profile Pic Floating */}
                <div className="-mt-16 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 z-10 relative">
                  <div className="flex flex-col md:flex-row items-center md:items-end gap-5">
                    <img
                      src={selectedAudition.profileImage}
                      className="w-32 h-32 object-cover rounded-full border-4 border-gold shadow-xl bg-canvas"
                      alt={selectedAudition.name}
                    />
                    <div className="text-center md:text-left">
                      <span className="text-[10px] bg-curtain text-canvas px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        {selectedAudition.category}
                      </span>
                      <h2 className="font-heading text-2xl md:text-3xl text-curtain font-bold mt-2 leading-tight">
                        {selectedAudition.name}
                      </h2>
                      <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-ink/60 font-semibold mt-1">
                        <MapPin size={12} className="text-gold" />
                        <span>{selectedAudition.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Connect WhatsApp */}
                  <a
                    href={`https://wa.me/${selectedAudition.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm shadow-md transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Phone size={14} /> Connect on WhatsApp
                  </a>
                </div>

                {/* Grid Split */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 border-t border-gold/15 pt-8">
                  
                  {/* Left Column: Details & Measurements */}
                  <div className="space-y-6 lg:col-span-1">
                    <div>
                      <h3 className="font-heading text-sm text-curtain uppercase tracking-wider border-b border-gold/10 pb-2 mb-4 font-bold">
                        Identity Info
                      </h3>
                      <table className="w-full text-xs font-body text-ink/80 border-collapse">
                        <tbody>
                          <tr className="border-b border-gold/5"><td className="py-2 font-bold text-ink/50">Email</td><td className="py-2 text-right select-all">{selectedAudition.email}</td></tr>
                          <tr className="border-b border-gold/5"><td className="py-2 font-bold text-ink/50">Phone</td><td className="py-2 text-right select-all">{selectedAudition.phone}</td></tr>
                          <tr className="border-b border-gold/5"><td className="py-2 font-bold text-ink/50">Age</td><td className="py-2 text-right">{selectedAudition.age} Years</td></tr>
                          <tr className="border-b border-gold/5"><td className="py-2 font-bold text-ink/50">Height</td><td className="py-2 text-right">{selectedAudition.height}</td></tr>
                          <tr className="border-b border-gold/5"><td className="py-2 font-bold text-ink/50">Weight</td><td className="py-2 text-right">{selectedAudition.weight}</td></tr>
                          <tr className="border-b border-gold/5"><td className="py-2 font-bold text-ink/50">Hair Color</td><td className="py-2 text-right">{selectedAudition.hairColor}</td></tr>
                          <tr className="border-b border-gold/5"><td className="py-2 font-bold text-ink/50">Eye Color</td><td className="py-2 text-right">{selectedAudition.eyeColor}</td></tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Social Media Links */}
                    <div>
                      <h3 className="font-heading text-sm text-curtain uppercase tracking-wider border-b border-gold/10 pb-2 mb-4 font-bold">
                        Social Handles
                      </h3>
                      <div className="space-y-2">
                        {selectedAudition.socialLinks.instagram && (
                          <a
                            href={selectedAudition.socialLinks.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-2 rounded-sm bg-white border border-gold/10 hover:border-gold/30 text-xs font-semibold text-ink/75 hover:bg-canvas/20 transition-all"
                          >
                            <div className="flex items-center gap-2">
                              <svg className="w-3.5 h-3.5 text-pink-600 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                              <span>Instagram</span>
                            </div>
                            <span className="text-[10px] text-ink/50">
                              {selectedAudition.socialLinks.instagramFollowers || "View"}
                            </span>
                          </a>
                        )}
                        {selectedAudition.socialLinks.youtube && (
                          <a
                            href={selectedAudition.socialLinks.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-2 rounded-sm bg-white border border-gold/10 hover:border-gold/30 text-xs font-semibold text-ink/75 hover:bg-canvas/20 transition-all"
                          >
                            <div className="flex items-center gap-2">
                              <svg className="w-3.5 h-3.5 text-red-600 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                              <span>YouTube</span>
                            </div>
                            <span className="text-[10px] text-ink/50">
                              {selectedAudition.socialLinks.youtubeSubscribers || "View"}
                            </span>
                          </a>
                        )}
                        {selectedAudition.socialLinks.facebook && (
                          <a
                            href={selectedAudition.socialLinks.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-2 rounded-sm bg-white border border-gold/10 hover:border-gold/30 text-xs font-semibold text-ink/75 hover:bg-canvas/20 transition-all"
                          >
                            <div className="flex items-center gap-2">
                              <Globe size={14} className="text-blue-600" />
                              <span>Facebook</span>
                            </div>
                            <span className="text-[10px] text-ink/50">
                              {selectedAudition.socialLinks.facebookFollowers || "View"}
                            </span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Bio, Experience, Photos & Videos */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Bio */}
                    <div>
                      <h3 className="font-heading text-sm text-curtain uppercase tracking-wider border-b border-gold/10 pb-2 mb-3 font-bold">
                        Artist Biography
                      </h3>
                      <p className="text-xs text-ink/80 leading-relaxed font-body whitespace-pre-line bg-white p-4 border border-gold/10 rounded-sm">
                        {selectedAudition.bio || "No biography provided."}
                      </p>
                    </div>

                    {/* Skills */}
                    <div>
                      <h3 className="font-heading text-sm text-curtain uppercase tracking-wider border-b border-gold/10 pb-2 mb-3 font-bold">
                        Skills & Specialties
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedAudition.skills.length > 0 ? (
                          selectedAudition.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="text-[10px] font-bold bg-white border border-gold/20 text-curtain px-2.5 py-1 rounded-sm uppercase tracking-wider"
                            >
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-ink/40">No specific skills listed.</span>
                        )}
                      </div>
                    </div>

                    {/* Theatrical Experience */}
                    <div>
                      <h3 className="font-heading text-sm text-curtain uppercase tracking-wider border-b border-gold/10 pb-2 mb-3 font-bold">
                        Theatrical Credits / History
                      </h3>
                      <div className="space-y-3 font-body text-xs">
                        {selectedAudition.experience && selectedAudition.experience.length > 0 ? (
                          selectedAudition.experience.map((item) => (
                            <div
                              key={item.id}
                              className="flex gap-4 p-3 border-l-2 border-gold bg-white shadow-sm rounded-r-sm"
                            >
                              <div className="font-bold text-curtain shrink-0 font-mono text-[11px] pt-0.5">
                                {item.year}
                              </div>
                              <div>
                                <h4 className="font-bold text-ink/85">{item.title}</h4>
                                <p className="text-ink/65 mt-0.5">Role: {item.role}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-ink/40 italic">No historical credits provided.</p>
                        )}
                      </div>
                    </div>

                    {/* Video / Intro Clips */}
                    {(selectedAudition.introVideo || selectedAudition.videos.length > 0) && (
                      <div>
                        <h3 className="font-heading text-sm text-curtain uppercase tracking-wider border-b border-gold/10 pb-2 mb-3 font-bold">
                          Video Reels & Showreels
                        </h3>
                        <div className="space-y-2">
                          {selectedAudition.introVideo && (
                            <a
                              href={selectedAudition.introVideo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 p-3 bg-curtain/5 border border-curtain/20 hover:bg-curtain/10 rounded-sm text-xs font-bold text-curtain transition-colors"
                            >
                              <Film size={14} className="text-gold" />
                              <span>1. Intro Audition Video Clip ({selectedAudition.introVideoRatio})</span>
                              <ExternalLink size={12} className="ml-auto" />
                            </a>
                          )}
                          {selectedAudition.videos.map((vid, idx) => (
                            <a
                              key={idx}
                              href={vid}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 p-3 bg-white border border-gold/15 hover:border-gold/30 rounded-sm text-xs font-semibold text-ink/75 transition-all"
                            >
                              <Film size={14} className="text-gold" />
                              <span>{selectedAudition.introVideo ? idx + 2 : idx + 1}. Performance Clip / Showreel Link</span>
                              <ExternalLink size={12} className="ml-auto text-ink/40" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Photos Gallery */}
                    <div>
                      <h3 className="font-heading text-sm text-curtain uppercase tracking-wider border-b border-gold/10 pb-2 mb-3 font-bold">
                        Portfolio Gallery
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {selectedAudition.gallery.map((photo, index) => (
                          <a
                            key={index}
                            href={photo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="aspect-square border border-gold/10 rounded-sm overflow-hidden bg-ink shadow-sm hover:shadow-md transition-shadow group relative block"
                          >
                            <img
                              src={photo}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              alt={`Gallery photo ${index + 1}`}
                            />
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                              <ExternalLink size={16} />
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Add Production Modal */}
        {isAddProdOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
            <div className="bg-canvas border border-gold/30 rounded-lg max-w-lg w-full p-6 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-gold/20 pb-3 mb-4">
                <h3 className="font-heading text-lg text-curtain font-bold flex items-center gap-2">
                  <Film size={18} className="text-gold" /> Add New Production
                </h3>
                <button
                  onClick={() => setIsAddProdOpen(false)}
                  className="text-ink/50 hover:text-curtain p-1 rounded-sm"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveAddProduction} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-ink/70 mb-1">
                    Production Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProdForm.title}
                    onChange={(e) => setNewProdForm({ ...newProdForm, title: e.target.value })}
                    placeholder="e.g. Maha Ramayan Live"
                    className="w-full bg-white border border-gold/20 focus:border-gold p-2.5 rounded-sm outline-none font-semibold text-ink"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-ink/70 mb-1">
                      Year
                    </label>
                    <input
                      type="number"
                      value={newProdForm.year}
                      onChange={(e) => setNewProdForm({ ...newProdForm, year: e.target.value })}
                      placeholder="2026"
                      className="w-full bg-white border border-gold/20 focus:border-gold p-2.5 rounded-sm outline-none font-semibold text-ink"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-ink/70 mb-1">
                      Director
                    </label>
                    <input
                      type="text"
                      value={newProdForm.director}
                      onChange={(e) => setNewProdForm({ ...newProdForm, director: e.target.value })}
                      placeholder="Animesh Pandit"
                      className="w-full bg-white border border-gold/20 focus:border-gold p-2.5 rounded-sm outline-none font-semibold text-ink"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-ink/70 mb-1">
                      Genre
                    </label>
                    <input
                      type="text"
                      value={newProdForm.genre}
                      onChange={(e) => setNewProdForm({ ...newProdForm, genre: e.target.value })}
                      placeholder="Theatre Drama"
                      className="w-full bg-white border border-gold/20 focus:border-gold p-2.5 rounded-sm outline-none font-semibold text-ink"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-ink/70 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={newProdForm.duration}
                      onChange={(e) => setNewProdForm({ ...newProdForm, duration: e.target.value })}
                      placeholder="120 mins"
                      className="w-full bg-white border border-gold/20 focus:border-gold p-2.5 rounded-sm outline-none font-semibold text-ink"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-ink/70 mb-1">
                    Poster Image URL (optional)
                  </label>
                  <input
                    type="text"
                    value={newProdForm.poster}
                    onChange={(e) => setNewProdForm({ ...newProdForm, poster: e.target.value })}
                    placeholder="/production-assets/baaki-itihaas/poster-1.webp or image URL..."
                    className="w-full bg-white border border-gold/20 focus:border-gold p-2.5 rounded-sm outline-none font-semibold text-ink"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-ink/70 mb-1">
                    Excerpt / Overview *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newProdForm.excerpt}
                    onChange={(e) => setNewProdForm({ ...newProdForm, excerpt: e.target.value })}
                    placeholder="Short description of the production..."
                    className="w-full bg-white border border-gold/20 focus:border-gold p-2.5 rounded-sm outline-none font-semibold text-ink"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-gold/15">
                  <button
                    type="button"
                    onClick={() => setIsAddProdOpen(false)}
                    className="bg-canvas border border-gold/20 text-ink/70 font-bold uppercase text-xs px-4 py-2 rounded-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-curtain hover:bg-gold text-canvas hover:text-ink font-bold uppercase text-xs px-5 py-2 rounded-sm transition-colors shadow-md"
                  >
                    Save & Publish Production
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeletingId && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white border border-gold/25 p-6 rounded-lg max-w-sm w-full shadow-2xl text-center">
              <h3 className="font-heading text-lg text-curtain font-bold mb-3 uppercase tracking-wide">
                Confirm Deletion
              </h3>
              <p className="text-xs text-ink/70 leading-relaxed mb-6 font-body">
                Are you sure you want to delete this submission? This action is permanent and cannot be undone.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => handleDelete(isDeletingId, isDeletingType!)}
                  className="bg-curtain hover:bg-red-800 text-canvas font-bold uppercase tracking-wider text-xs px-5 py-2.5 rounded-sm shadow-md transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setIsDeletingId(null);
                    setIsDeletingType(null);
                  }}
                  className="bg-canvas border border-gold/20 text-ink/75 hover:bg-canvas/50 font-bold uppercase tracking-wider text-xs px-5 py-2.5 rounded-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
      <Footer />
    </>
  );
}
