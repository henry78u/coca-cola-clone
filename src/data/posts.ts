export interface BlogPostItem {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  image: string;
  readTime: string;
  content: string[];
}

export const POSTS: BlogPostItem[] = [
  {
    slug: "evolution-of-contour-bottle",
    title: "The Sculpted Curve: How the 1915 Contour Bottle Redefined Industrial Design",
    excerpt: "Explore the fascinating ergonomic origin of the world's most recognizable bottle silhouette designed to be identified in total darkness.",
    category: "Design Heritage",
    author: "Elena Vance",
    authorRole: "Senior Curator of Packaging Design",
    date: "March 15, 2026",
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=1200&q=80",
    readTime: "5 min read",
    content: [
      "In 1915, a simple design brief changed the landscape of modern consumer product branding forever: 'A bottle which a person could recognize even if they felt it in the dark, and so shaped that, even if broken, a person could tell at a glance what it was.'",
      "The result was the Root Glass Company's patent design inspired by the elongated lobes of the cacao pod. With its sinuous fluting, subtle waist, and heavy glass base, the contour bottle became an instantaneous industrial triumph.",
      "Over a century later, this iconic physical artifact teaches design students about brand affordances, tactile recognition, and how aesthetic permanence transcends fleeting marketing cycles."
    ]
  },
  {
    slug: "art-of-carbonation-fizz-mechanics",
    title: "The Physics of the Perfect Chill: Carbonation, Temperature, and Taste Reception",
    excerpt: "Why is an ice-cold beverage served at precisely 3.3°C so uniquely satisfying? We unpack the molecular science of effervescence.",
    category: "Beverage Craft",
    author: "Dr. Marcus Hayes",
    authorRole: "Sensory Science Lead",
    date: "February 28, 2026",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=1200&q=80",
    readTime: "4 min read",
    content: [
      "The sensory bite of carbon dioxide (CO₂) isn't solely a tactile sensation of bursting bubbles against the palate—it stimulates nociceptors and acid-sensing taste receptors, creating that invigorating 'crisp' signature.",
      "When soda is cooled between 3.0°C and 4.0°C, the solubility of CO₂ increases drastically, allowing delicate aromatic notes of vanilla, citrus oils, and botanical spices to blossom on the tongue without overwhelming volatility.",
      "This thermal sweet spot is why every glass poured over freshly cracked crystal ice delivers that unmistakable rush of pure refreshment."
    ]
  },
  {
    slug: "zero-sugar-innovation-revolution",
    title: "Engineering Zero: Replicating Signature Mouthfeel Without Added Sugar",
    excerpt: "A deep dive into molecular food science and modern sweetness mapping that paved the way for modern zero-calorie triumphs.",
    category: "Innovation",
    author: "Sarah Chen",
    authorRole: "Flavor Chemistry Director",
    date: "February 12, 2026",
    image: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=1200&q=80",
    readTime: "6 min read",
    content: [
      "For decades, replicating the rich, coating mouthfeel of cane sugar without adding carbohydrates was considered the holy grail of food chemistry.",
      "Traditional sweeteners often suffered from lingering metallic aftertastes or a hollow sensory profile. Recent developments in synergy mapping combine multi-tiered non-nutritive components to match the kinetic sweetness onset and rapid, clean decay of sucrose.",
      "Our team continually refines these profiles to ensure that choosing zero sugar means making zero concessions on flavor authenticity."
    ]
  },
  {
    slug: "global-culture-and-local-rituals",
    title: "1.9 Billion Daily Connections: Rituals of Refreshment Across Continents",
    excerpt: "From midnight street food stalls in Tokyo to sun-drenched family tables in Guadalajara, how a single beverage weaves through world cultures.",
    category: "Global Stories",
    author: "Mateo Ortiz",
    authorRole: "Anthropological Writer",
    date: "January 24, 2026",
    image: "https://images.unsplash.com/photo-1596803244618-8dbee441d70b?auto=format&fit=crop&w=1200&q=80",
    readTime: "7 min read",
    content: [
      "Food and drink are universal social lubricants. Across more than 200 nations, the distinct hiss of a bottle cap popping and the clink of glass create an instant shared pause in the day.",
      "In Latin America, chilled glass bottles accompany spicy street tacos, cutting through heat with caramel effervescence. In Japanese convenience culture, special seasonal editions celebrate cherry blossom blooms with artistic packaging.",
      "These micro-rituals illustrate that while the beverage recipe remains faithful, the memories created around it are as diverse as humanity itself."
    ]
  },
  {
    slug: "sustainable-packaging-future",
    title: "Towards Circularity: Reimagining 100% Recycled PET and Closed-Loop Systems",
    excerpt: "How modern material science and bottle-to-bottle recovery pipelines are redefining the future of sustainable packaging.",
    category: "Sustainability",
    author: "Amara Ndiaye",
    authorRole: "Materials Research Lead",
    date: "January 10, 2026",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80",
    readTime: "5 min read",
    content: [
      "A truly circular economy demands that every single bottle produced becomes the raw material for the next bottle, eliminating virgin petroleum polymers completely.",
      "Innovations in high-purity mechanical sorting, optical flake decontamination, and chemical depolymerization now permit 100% rPET (recycled polyethylene terephthalate) bottles with flawless clarity and structural integrity.",
      "By closing the production loop and investing heavily in consumer collection hubs, we aim to ensure no package ever ends up as environmental waste."
    ]
  },
  {
    slug: "typography-and-brand-endurance",
    title: "The Spencerian Script: An Enduring Masterclass in Hand-Lettered Identity",
    excerpt: "Frank Robinson hand-lettered the original logo in 1886. Why has this Victorian script survived digital screens and flat design eras intact?",
    category: "Typography",
    author: "Julian Thorne",
    authorRole: "Brand Historian & Typographer",
    date: "December 18, 2025",
    image: "https://images.unsplash.com/photo-1594971475674-6a97f8fe8c2b?auto=format&fit=crop&w=1200&q=80",
    readTime: "6 min read",
    content: [
      "During the late 19th century in America, business correspondence and bookkeeping were taught through Spencerian penmanship—characterized by flowing rhythmic loops, distinct contrast between thick downstrokes, and delicate hairlines.",
      "Bookkeeper Frank Mason Robinson penned the distinctive logo by hand, suggesting that 'the two C’s would look well in advertising.'",
      "While countless brands modernised toward sterile geometric sans-serifs during the 2000s, this historic script remains an anchor of warmth, craftsmanship, and human touch."
    ]
  },
];
