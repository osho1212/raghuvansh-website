export interface CastMember {
  role: string;
  actor: string;
}

export interface Production {
  slug: string;
  title: string;
  year: number;
  director: string;
  excerpt: string;
  genre: string;
  duration: string;
  poster: string;
  posterBackup?: string;
  brochure: string;
  cast: string[];
  castRoles: CastMember[];
  playwright: string;
  quote: string;
  directorsNote: string;
  directorsNoteFull: string[];
  synopsisFull: string[];
  teaser: string | string[] | null;
  youtube?: string;
}

export const productionsData: Production[] = [
  {
    slug: "baaki-itihaas",
    title: "Baaki Itihaas",
    year: 2024,
    director: "Animesh Pandit",
    excerpt: "Baaki Itihaas transcends the boundaries of conventional theatre, emerging as a profound reflection on human existence, memory, guilt, and the enduring search for life's meaning.",
    genre: "Drama / Reflection",
    duration: "120 mins",
    poster: "/production-assets/baaki-itihaas/poster-1.webp",
    posterBackup: "/production-assets/baaki-itihaas/poster-2.webp",
    brochure: "/production-assets/baaki-itihaas/brochure.pdf",
    playwright: "Badal Sircar",
    quote: "History is not only what is written in books; it is also what every individual silently carries within, yet never finds the words to tell.",
    directorsNote: "",
    teaser: "/production-assets/baaki-itihaas/rgv-baaki-itihaas.webm",
    cast: ["Sharad (Krishna Shrivastav)", "Vasanti (Isha Khera)", "Sitanath (Animesh Pandit)", "Kanak (Anoushka Pandit)", "Vidubhushan (Anil Gagneja)", "Nikhil (Arman)", "Vijay (Aryan Verma)", "Vasudev (Aryan Verma)", "Kanak’s Father (Anil Gagneja)", "Postman (Jivansh Bihagra)"],
    castRoles: [
      { role: "Sharad", actor: "Krishna Shrivastav" },
      { role: "Vasanti", actor: "Isha Khera" },
      { role: "Sitanath", actor: "Animesh Pandit" },
      { role: "Kanak", actor: "Anoushka Pandit" },
      { role: "Vidubhushan", actor: "Anil Gagneja" },
      { role: "Nikhil", actor: "Arman" },
      { role: "Vijay", actor: "Aryan Verma" },
      { role: "Vasudev", actor: "Aryan Verma" },
      { role: "Kanak’s Father", actor: "Anil Gagneja" },
      { role: "Postman", actor: "Jivansh Bihagra" }
    ],
    synopsisFull: [
      "Baaki Itihaas transcends the boundaries of conventional theatre to become a profound exploration of human existence, memory, guilt, and the search for meaning. Through the lives of an ordinary middle-class family, Badal Sircar examines the emotional and psychological complexities hidden beneath everyday life - unfulfilled aspirations, silent disappointments, moral dilemmas, and unresolved conflicts. When an unexpected event disrupts their routine, the characters are forced to confront their past, reassess their relationships, and question the purpose of their lives.",
      "One of Badal Sircar's most celebrated works, Baaki Itihaas challenges the notion that history belongs only to kings, wars, and great achievements. It reveals that every individual carries an unwritten history shaped by sacrifice, love, remorse, fear, and longing. Rather than offering easy answers, the play invites audiences to reflect on the forgotten chapters of their own lives, reminding us that the most significant history is often the one silently carried within the human heart."
    ],
    directorsNoteFull: []
  },
  {
    slug: "saari-raat",
    title: "Saari Raat",
    year: 2024,
    director: "Animesh Pandit",
    excerpt: "Saari Raat transcends the boundaries of conventional theatre, emerging as a deeply philosophical exploration of loneliness, human relationships, and the timeless search for truth.",
    genre: "Philosophical Drama",
    duration: "110 mins",
    poster: "/production-assets/saari-raat/poster.webp",
    brochure: "/production-assets/saari-raat/brochure.pdf",
    playwright: "Badal Sircar",
    quote: "Sometimes, it takes an entire night to discover what a lifetime of routine has kept hidden.",
    directorsNote: "",
    teaser: [
      "/production-assets/saari-raat/IMG_8868~2.webp",
      "/production-assets/saari-raat/IMG_8898.webp",
      "/production-assets/saari-raat/IMG_8909.webp",
      "/production-assets/saari-raat/IMG_8928.webp",
      "/production-assets/saari-raat/IMG_8935.webp",
      "/production-assets/saari-raat/IMG_8946.webp"
    ],
    cast: ["Aadmi (Arman Kumar)", "Aurat (Anoushka Pandit)", "Vriddh (Animesh Pandit)"],
    castRoles: [
      { role: "Aadmi", actor: "Arman Kumar" },
      { role: "Aurat", actor: "Anoushka Pandit" },
      { role: "Vriddh", actor: "Animesh Pandit" }
    ],
    synopsisFull: [
      "Saari Raat is a deeply philosophical play that explores loneliness, human relationships, and the timeless search for truth. Set over the course of a single night, Badal Sircar transforms an ordinary encounter into an extraordinary journey of introspection, where every conversation, silence, and passing moment reveals hidden layers of the human psyche. What begins as a chance meeting between a husband, a wife, and an enigmatic old man gradually unfolds into a profound exploration of life and the self.",
      "As the night progresses, the boundaries between reality and metaphor begin to dissolve, compelling the characters to confront their fears, prejudices, desires, and the emptiness that often lies beneath the routines of everyday life. Through its deceptively simple narrative, the play examines the alienation of modern society, the fragility of human relationships, and the pursuit of material comforts at the cost of inner fulfilment. The old man emerges as more than a character - he becomes a symbol of wisdom, conscience, and self-realization.",
      "Blending realism with rich symbolism, Saari Raat does not seek to offer definitive answers but invites the audience into quiet contemplation. It reminds us that life's greatest transformations often arise not from extraordinary events, but from moments of reflection, empathy, and genuine human connection. Long after the curtain falls, the play continues to resonate, leaving audiences with deeply personal questions about themselves and the lives they lead."
    ],
    directorsNoteFull: []
  },
  {
    slug: "shabd-baan",
    title: "Shabd Baan",
    year: 2026,
    director: "Animesh Pandit",
    excerpt: "Shabd Baan is an intense dramatic exploration of grief, dharma, and divine accountability, imagined through a searing conversation between Gandhari and Shri Krishna in the aftermath of the Mahabharata.",
    genre: "Musical & Poetic Drama",
    duration: "90 mins",
    poster: "/production-assets/shabd-baan/poster.webp",
    brochure: "/production-assets/shabd-baan/brochure.pdf",
    playwright: "Animesh Pandit",
    quote: "True justice is not the destruction of an enemy, but the destruction of enmity.",
    directorsNote: "",
    teaser: "/production-assets/shabd-baan/teaser.webm",
    cast: ["Krishn", "Gaandhari", "Kaurav", "Draupadi"],
    castRoles: [
      { role: "Krishn", actor: "Cast Member" },
      { role: "Gaandhari", actor: "Cast Member" },
      { role: "Kaurav", actor: "Cast Member" },
      { role: "Draupadi", actor: "Cast Member" }
    ],
    synopsisFull: [
      "Shabd Baan is an intense dramatic exploration of grief, dharma, and divine accountability, imagined through a searing conversation between Gandhari and Shri Krishna in the aftermath of the Mahabharata. The war has ended, but its silence is heavier than the clang of weapons. In this silence, a mother rises, not with prayers, but with questions sharp as arrows.",
      "Gandhari confronts Krishna not as a devotee, but as a mother who has lost all her sons. Her grief becomes a force that even divinity cannot ignore. She demands to know why such destruction was allowed, asking, 'After unleashing this devastation, where are you going now?' Through her voice, the play captures the agony of every mother who became childless because of a war she never chose.",
      "She urges Krishna to answer not as God, but as a witness to suffering. Her questions pierce the idea of divine purpose: 'If you could not prevent this war, then what is the meaning of being God?' The exchange reveals a profound truth—when their children are at stake, even mothers can challenge God without hesitation.",
      "Shabd Baan extends beyond this single encounter. It represents a larger creative vision: a series of unfiltered, imagined conversations from Indian history, where characters speak the truths that were never recorded but always resonated beneath the surface.",
      "Through emotionally charged dialogue and philosophical depth, the play becomes a timeless confrontation between human pain and cosmic design-an artistic journey shaped entirely by the vision and writing of Animesh Pandit."
    ],
    directorsNoteFull: []
  },
  {
    slug: "wrong-turn",
    title: "Wrong Turn",
    year: 2024,
    director: "Animesh Pandit",
    excerpt: "Wrong Turn is a thought-provoking contemporary play that explores the complex relationship between human choices and their consequences, adapting Frederick Dürrenmatt's The Dangerous Game.",
    genre: "Contemporary Drama / Psychological Theatre",
    duration: "100 mins",
    poster: "/production-assets/wrong-turn/poster.webp",
    brochure: "/production-assets/wrong-turn/brochure.pdf",
    playwright: "Ranjit Kapoor",
    quote: "Does every wrong decision inevitably lead to downfall, or can mistakes also become pathways to self-discovery and transformation?",
    directorsNote: "",
    teaser: "/production-assets/wrong-turn/teaser.webm",
    cast: ["Arun Mehra", "Lateef Zaidi", "Makarand Joshi", "Jagdeesh Mathur", "Neena Oberoi", "Banne Miyaan", "Raghu", "White Man", "Shivani"],
    castRoles: [
      { role: "Arun Mehra", actor: "" },
      { role: "Lateef Zaidi", actor: "" },
      { role: "Makarand Joshi", actor: "" },
      { role: "Jagdeesh Mathur", actor: "" },
      { role: "Neena Oberoi", actor: "" },
      { role: "Banne Miyaan", actor: "" },
      { role: "Raghu", actor: "" },
      { role: "White Man", actor: "" },
      { role: "Shivani", actor: "" }
    ],
    synopsisFull: [
      "Wrong Turn is a thought-provoking contemporary play that explores the profound relationship between human choices and their consequences. It follows individuals whose lives are transformed by defining moments, where decisions made under fear, uncertainty, pressure, or haste set them on paths that irrevocably alter their futures. Through familiar characters and everyday situations, the play reveals the emotional and psychological complexities hidden beneath ordinary life.",
      "As the narrative unfolds, seemingly insignificant decisions evolve into sources of conflict, fractured relationships, regret, and self-discovery. More than a sequence of events, Wrong Turn journeys into the inner lives of its characters, where unspoken truths, lingering guilt, and unresolved questions carry as much weight as the dialogue itself. Every silence and confrontation deepens the emotional resonance of the story.",
      "Blending realism with subtle symbolism, Wrong Turn asks a timeless question: Do wrong decisions inevitably lead to downfall, or can they become the first step towards growth and redemption? Rather than offering easy answers, the play invites audiences to reflect on the turning points in their own lives, leaving them with questions and insights that linger long after the performance ends."
    ],
    directorsNoteFull: [],
    youtube: "https://youtu.be/V-u5rKnQuTs?si=Q9K_ARu_DaKYk-21"
  }
];
