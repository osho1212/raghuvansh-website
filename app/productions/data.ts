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
    directorsNote: "History is not merely what is recorded; it is equally what is remembered, forgotten, and silently carried within us.",
    teaser: "/production-assets/baaki-itihaas/rgv-baaki-itihaas.webm",
    cast: ["Sharad (Krishna Shrivastav)", "Vasanti (Isha Khera)", "Sitanath (Animesh Pandit)", "Kanak (Anoushka Sharma)", "Vidubhushan (Anil Gagneja)", "Nikhil (Arman)", "Vijay (Aryan Verma)", "Vasudev (Aryan Verma)", "Kanak’s Father (Anil Gagneja)", "Postman (Jivansh Bihagra)"],
    castRoles: [
      { role: "Sharad", actor: "Krishna Shrivastav" },
      { role: "Vasanti", actor: "Isha Khera" },
      { role: "Sitanath", actor: "Animesh Pandit" },
      { role: "Kanak", actor: "Anoushka Sharma" },
      { role: "Vidubhushan", actor: "Anil Gagneja" },
      { role: "Nikhil", actor: "Arman" },
      { role: "Vijay", actor: "Aryan Verma" },
      { role: "Vasudev", actor: "Aryan Verma" },
      { role: "Kanak’s Father", actor: "Anil Gagneja" },
      { role: "Postman", actor: "Jivansh Bihagra" }
    ],
    synopsisFull: [
      "Baaki Itihaas transcends the boundaries of conventional theatre, emerging as a profound reflection on human existence, memory, guilt, and the enduring search for life's meaning. Through an intimate portrayal of an ordinary middle-class family, the play delves into the emotional and psychological complexities that define modern existence. Beneath the façade of everyday life lie unfulfilled aspirations, silent disappointments, moral dilemmas, and unresolved conflicts. An unexpected event shatters this fragile normalcy, compelling the characters to confront their past, reassess their relationships, and question the very purpose of their lives.",
      "Penned by Badal Sircar, one of India's most influential modern playwrights, the play challenges the conventional understanding of history. It asks whether history belongs only to kings, wars, and celebrated achievements, or whether every ordinary individual also carries a history that remains unwritten. Hidden beneath the routines of daily existence are countless untold stories of sacrifice, remorse, love, fear, and longing—stories that never find a place in official records, yet shape the very essence of a person's life. This unwritten narrative is the 'remaining history' that the play seeks to uncover.",
      "Baaki Itihaas presents a poignant commentary on the anxieties of the middle class, the alienation of modern society, existential uncertainty, and the emotional isolation that often accompanies contemporary life. Rather than offering definitive answers, it invites its audience to embark on an inward journey, encouraging them to reflect upon the forgotten chapters of their own lives - the dreams abandoned, the choices regretted, and the emotions left unspoken.",
      "More than a theatrical performance, Baaki Itihaas is an introspective experience that reminds us that the most significant history is rarely the one preserved in books, but the one silently carried within every human heart. Its greatest strength lies not in the answers it provides, but in the questions it leaves behind - questions that continue to resonate long after the curtain falls."
    ],
    directorsNoteFull: [
      "Every human being carries a history that remains untold - a collection of forgotten dreams, unspoken regrets, unresolved questions, and silent battles that rarely find a place in the pages of history. It is this invisible narrative that drew me to Baaki Itihaas.",
      "Badal Sircar's writing possesses a rare ability to transform the ordinary into the extraordinary. Through seemingly familiar lives, he reveals the profound anxieties that define modern existence, the burden of memory, the weight of guilt, the loneliness of the individual, and the relentless search for meaning. His characters are not heroes or villains; they are reflections of ourselves, navigating the fragile balance between what we have lived, what we have lost, and what we continue to carry within.",
      "Our interpretation of Baaki Itihaas does not seek to provide answers. Instead, it invites the audience into a shared space of introspection. Every pause, every silence, and every fragmented memory on stage has been approached not as a dramatic device, but as an invitation to look inward. The play reminds us that while history celebrates extraordinary events, it often overlooks the quiet struggles of ordinary lives—the very struggles that shape who we become.",
      "Theatre, at its finest, is not about offering certainty; it is about asking questions that continue to echo long after the performance has ended. As the curtain falls, I hope this production encourages you to reflect upon your own 'remaining history'—the moments you cherish, the choices you question, the memories you protect, and the stories that have shaped you but have never been spoken aloud.",
      "If this performance inspires even one person to pause, reflect, and rediscover a forgotten part of themselves, then our journey to bring Baaki Itihaas to the stage will have found its true purpose."
    ]
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
    directorsNote: "The longest journeys are often not measured in miles, but in moments of silence, reflection, and self-discovery.",
    teaser: [
      "/production-assets/saari-raat/IMG_8868~2.webp",
      "/production-assets/saari-raat/IMG_8898.webp",
      "/production-assets/saari-raat/IMG_8909.webp",
      "/production-assets/saari-raat/IMG_8928.webp",
      "/production-assets/saari-raat/IMG_8935.webp",
      "/production-assets/saari-raat/IMG_8946.webp"
    ],
    cast: ["Husband", "Wife", "Old Man"],
    castRoles: [
      { role: "Husband", actor: "Cast Member" },
      { role: "Wife", actor: "Cast Member" },
      { role: "Old Man", actor: "Cast Member" }
    ],
    synopsisFull: [
      "Saari Raat is a deeply philosophical play that explores loneliness, human relationships, and the timeless search for truth. Set over the course of a single night, Badal Sircar transforms an ordinary encounter into an extraordinary journey of introspection, where every conversation, silence, and passing moment reveals hidden layers of the human psyche. What begins as a chance meeting between a husband, a wife, and an enigmatic old man gradually unfolds into a profound exploration of life and the self.",
      "As the night progresses, the boundaries between reality and metaphor begin to dissolve, compelling the characters to confront their fears, prejudices, desires, and the emptiness that often lies beneath the routines of everyday life. Through its deceptively simple narrative, the play examines the alienation of modern society, the fragility of human relationships, and the pursuit of material comforts at the cost of inner fulfilment. The old man emerges as more than a character - he becomes a symbol of wisdom, conscience, and self-realization.",
      "Blending realism with rich symbolism, Saari Raat does not seek to offer definitive answers but invites the audience into quiet contemplation. It reminds us that life's greatest transformations often arise not from extraordinary events, but from moments of reflection, empathy, and genuine human connection. Long after the curtain falls, the play continues to resonate, leaving audiences with deeply personal questions about themselves and the lives they lead."
    ],
    directorsNoteFull: [
      "There are nights that pass unnoticed, and then there are nights that transform us forever. Saari Raat belongs to the latter. What begins as an ordinary encounter gradually unfolds into a profound exploration of the human condition, where time slows, conversations deepen, and every silence speaks louder than words.",
      "Badal Sircar masterfully strips away the distractions of everyday life to reveal the questions we often avoid—Who are we when we are left alone with ourselves? What remains of our identities once social roles, ambitions, and pretenses begin to fade? Through a seemingly simple narrative, the play confronts us with themes of loneliness, alienation, faith, compassion, and the timeless search for truth.",
      "In our interpretation, the night is more than a setting—it is a metaphor. It represents uncertainty, introspection, and the liminal space where the external world recedes, allowing the inner world to emerge. The characters' journey through the darkness mirrors our own search for meaning, reminding us that the deepest conversations often take place not with others, but within ourselves.",
      "This production embraces the quiet power of Sircar's writing. Rather than relying on spectacle, it seeks to create an intimate theatrical experience where pauses, gestures, and silences become as meaningful as dialogue. Every creative choice has been guided by the belief that theatre is at its most powerful when it invites audiences not merely to watch, but to participate emotionally and intellectually.",
      "As dawn approaches in the world of the play, one is reminded that every night, however long, carries within it the possibility of illumination. My hope is that this performance encourages each viewer to reflect upon their own fears, beliefs, relationships, and unanswered questions, discovering that sometimes the most meaningful revelations arrive in the stillness of a single night.",
      "If, as you leave the auditorium, you find yourself carrying a question that lingers longer than an answer, then Saari Raat will have fulfilled the purpose for which it was written—and for which we have chosen to bring it to life."
    ]
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
    directorsNote: "ऐसा भी कभी तुम न्याय करो, शत्रू को नहीं — शत्रुता हरो। Shabd Baan - 'word arrows' - is a theatrical experiment where words become weapons, wounds, and windows. It is envisioned as a larger series of unfiltered, uncomfortable, extended conversations between iconic figures from Indian history.",
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
    directorsNoteFull: [
      "Shabd Baan - 'word arrows' - is a theatrical experiment where words become weapons, wounds, and windows. It is envisioned as a larger series of unfiltered, uncomfortable, extended conversations between iconic figures from Indian history — conversations that may have taken place, or perhaps should have. Conversations that tradition kept quiet, but humanity needed to hear.",
      "This opening chapter steps into the heavy silence after the Mahabharata. The war is over, yet the battlefield still trembles with unanswered questions. In that silence, Gandhari rises - not as a queen, not as a devotee, but simply as a mother. A mother who has lost all her sons and now stands before Shri Krishna, demanding not miracles, but explanations.",
      "She asks Krishna to answer her not as God, but as a witness. She challenges him with a rawness only a grieving mother can bear: 'If you could not stop this destruction, what is the meaning of being God?' Her pain becomes her power, her grief her clarity. And in a moment of profound truth, she teaches him: 'ऐसा भी कभी तुम न्याय करो, शत्रू को नहीं — शत्रुता हरो।' True justice is not the destruction of an enemy, but the destruction of enmity.",
      "This play is conceived as a musical and poetic drama, where characters converse in verse, question in melody, and break in rhythm. The stage is minimal, the emotions maximal.",
      "As a director, my intention is to let the audience witness a rare sight - a mother scolding God with innocence, and God listening with surrender. Shabd Baan invites you into a space where mythology becomes human, grief becomes philosophy, and words become awakening."
    ]
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
    directorsNote: "Wrong Turn is not merely an incident or a story; it is a theatrical exploration of those moments in life when, often unknowingly, a person takes a turn that challenges their beliefs, relationships, and sense of self.",
    teaser: "/production-assets/wrong-turn/teaser.webm",
    cast: ["Arun Mehra", "Lateef Zaidi", "Makarand Joshi", "Jagdeesh Mathur", "Neena Oberoi", "Banne Miyaan", "Raghu", "White Man", "Shivani"],
    castRoles: [
      { role: "Arun Mehra", actor: "Cast Member" },
      { role: "Lateef Zaidi", actor: "Cast Member" },
      { role: "Makarand Joshi", actor: "Cast Member" },
      { role: "Jagdeesh Mathur", actor: "Cast Member" },
      { role: "Neena Oberoi", actor: "Cast Member" },
      { role: "Banne Miyaan", actor: "Cast Member" },
      { role: "Raghu", actor: "Cast Member" },
      { role: "White Man", actor: "Cast Member" },
      { role: "Shivani", actor: "Cast Member" }
    ],
    synopsisFull: [
      "Wrong Turn is a thought-provoking contemporary play that explores the complex relationship between human choices and their consequences. The narrative focuses on those defining moments in life when individuals, driven by fear, uncertainty, pressure, or haste, take a turn that irrevocably alters the course of their lives.",
      "The characters emerge from familiar, everyday circumstances, yet the conflicts they carry within are deeply profound. As the story unfolds, the audience is drawn into the emotional and psychological spaces between the characters' past and present. Decisions that initially appear insignificant gradually reveal themselves as catalysts for conflict, fractured relationships, regret, and self-reckoning.",
      "More than a sequence of external events, Wrong Turn is a journey into the inner lives of its characters. Each carries a burden—an unspoken truth, a lingering guilt, or an unresolved question. The silences between conversations, moments of confrontation, and emotional pauses become as significant as the spoken dialogue itself, forming the emotional core of the play.",
      "At its heart, the play poses a appealing question: Does every wrong decision inevitably lead to downfall, or can mistakes also become pathways to self-discovery and transformation? Through this inquiry, Wrong Turn invites audiences to reflect upon the turning points in their own lives and reconsider the choices that have shaped their journeys.",
      "Presented through a balanced interplay of realism and symbolism, Wrong Turn does not seek to impose conclusions or moral judgments. Instead, it encourages viewers to engage with the narrative through their own experiences and interpretations, leaving the theatre with questions, reflections, and insights that extend beyond the performance itself."
    ],
    directorsNoteFull: [
      "Wrong Turn is not merely an incident or a story; it is a theatrical exploration of those moments in life when, often unknowingly, a person takes a turn that challenges their beliefs, relationships, and sense of self. This play seeks to capture the psychological space where human decisions collide with circumstance, creating consequences that are both unexpected and deeply revealing.",
      "At its core, the play is not centered on any single character but on a universal human tendency—the tendency to lose direction in moments of haste, fear, pride, or uncertainty. Wrong Turn raises an enduring question: Is every mistake simply an error in judgment, or can it also become a means of uncovering truths that lie hidden within us?",
      "Written by Ranjit Kapoor as an adaptation of Frederick Dürrenmatt's The Dangerous Game, the play retains the suspense and moral complexity of the original while placing its characters within a context that feels immediate and relatable. Beneath its dramatic tension lies a deeper inquiry into human nature, responsibility, and the fragile line between perception and reality.",
      "As a director, my endeavor has been to maintain a balance between realism and symbolism. The set, lighting, silence, and music are not merely visual or auditory effects; they are integral parts of the emotional and psychological journey of the narrative. The pauses between dialogues are often as significant as the spoken words themselves, allowing the audience to engage with the unspoken tensions that drive the story forward.",
      "In working with the actors, my focus has been less on external performance and more on revealing the internal conflicts of each character. Every individual in this play carries a struggle within—a conflict between truth and illusion, certainty and doubt, control and vulnerability. It is through these inner battles that the characters ultimately communicate with the audience.",
      "Ultimately, Wrong Turn is a play of introspection. Rather than offering definitive answers, it invites viewers to revisit the turning points in their own lives and reflect upon the choices that shaped them. If, upon leaving the theatre, a member of the audience finds themselves reconsidering a decision, a mistake, or an unanswered question from their own journey, then this production will have achieved its purpose."
    ]
  }
];
