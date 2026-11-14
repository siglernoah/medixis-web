/** Prefix for files in /public, so images also work when the site is served from a sub-path. */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

// Company facts in one place. Anything marked `confirm` must be verified before launch.
export const site = {
  name: "Medixis",
  legalName: "Medixis Group LLC",
  legalNote: "a Wyoming limited liability company",
  url: "https://medixisgroup.com",
  tagline: "Medical equipment quotes for private clinics",
  offer: "Better equipment quotes. Free for clinics.",
  offerSub: "Suppliers pay us, not you.",
  description:
    "Medixis finds and vets medical equipment quotes for private clinics and hospitals. It's free for clinics: suppliers pay us a commission, not you.",
  email: "Jonas@medixisgroup.com",
  phone: "+45 93 90 36 60",
  phoneHref: "+4593903660",
  city: "Aarhus",
  country: "Denmark",
  countryCode: "DK",
  clientLogin: "https://medixisgroup.com/partner-portal",
  registration: {
    state: "Wyoming, USA",
    filingId: "2026-002124541",
    office: "30 N Gould St Ste R, Sheridan, WY 82801",
  },
  legalRepresentative: "Jonas Jorgensen, CEO",
  social: [
    { name: "LinkedIn", url: "https://www.linkedin.com/company/medixis/posts/" },
    { name: "Instagram", url: "https://www.instagram.com/medixisgroup/" },
  ],
};

export const nav = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/suppliers/", label: "For suppliers" },
  { href: "/standards/", label: "Standards" },
  { href: "/about/", label: "About" },
  { href: "/team/", label: "Team" },
];

export const vetting = [
  {
    title: "Business verification",
    body: "We confirm each supplier's legal registration, ownership and trading history before they join the network.",
  },
  {
    title: "Regulatory documentation",
    body: "We review the documentation that equipment must carry for the market it is delivered to.",
  },
  {
    title: "Product quality",
    body: "We check specifications, manufacturer information and warranty terms against what the buyer has asked for.",
  },
  {
    title: "Commercial reliability",
    body: "We look at lead times, payment terms and references to make sure a supplier can deliver what it quotes.",
  },
  {
    title: "Ongoing performance",
    body: "We keep reviewing suppliers after they join, based on how each order is delivered.",
  },
];

export const steps = [
  {
    n: "01",
    title: "Tell us what you need",
    body: "Describe the equipment or supplies your clinic needs, plus your timeline. No account, no fee and no obligation.",
  },
  {
    n: "02",
    title: "We source and vet quotes",
    body: "We do the supplier legwork: we find suppliers that fit your request, check them, and collect their quotes for you.",
  },
  {
    n: "03",
    title: "You compare and choose",
    body: "You see the options side by side and make the final decision. The supplier invoices you directly.",
  },
];

export const mission = {
  statement: "To simplify medical procurement for healthcare facilities worldwide.",
  why: "So that healthcare professionals can focus on patients, not on supply-chain complexity.",
};
export const vision = {
  statement: "To be the trusted procurement partner for healthcare facilities in every market we serve.",
  why: "Growing internationally while staying focused on healthcare professionals and the patients who depend on them.",
};
// "What we stand for": Medixis's own wording (Nov 2026). Text in [square brackets] is still to be confirmed.
export const standFor = {
  intro: "Buying medical equipment shouldn’t depend on who you happen to know, or how many weeks you can spend chasing quotes. Medixis exists to give private clinics a fair, honest way to find the right equipment, and to give good suppliers a straight path to the clinics that need them.",
  holdUs: "These are the principles we work by. Hold us to them.",
  principles: [
    {
      title: "Your clinic’s needs come first",
      body: "We don’t start with a catalogue and look for someone to sell it to. We start with what your clinic actually needs: the procedures you run, the space you have, your budget and your timeline. Then we find suppliers who fit.",
      practice: "Before we contact any supplier, we agree a written brief with you. If the right answer is to buy less, buy refurbished, or wait, we’ll tell you.",
    },
    {
      title: "Honesty about how we’re paid",
      body: "We’re paid a commission by the supplier, and only when a deal is completed. Clinics pay us nothing. We say this up front because you deserve to know where our money comes from.",
      practice: "We disclose our commission arrangements on request. Every recommendation comes with a side-by-side comparison of the quotes we gathered, so you can see the options for yourself and the final choice is always yours.",
    },
    {
      title: "Vetted suppliers, not a directory",
      body: "Anyone can put together a list of suppliers. What matters is knowing which ones deliver what they promise. We check suppliers before we introduce them to you.",
      practice: "We confirm company registration, product certifications ([CE marking/MDR] where required), delivery track record and after-sales support. If a supplier doesn’t meet the standard, they don’t get introduced.",
    },
    {
      title: "Fair to both sides",
      body: "A good deal is one both parties would happily make again. We don’t squeeze suppliers into deals that will fall apart, and we don’t oversell to clinics.",
      practice: "Clear quotes with no hidden costs, honest delivery timelines, and terms both sides understand before anyone signs.",
    },
    {
      title: "We do what we say",
      body: "In healthcare procurement, trust is the real currency. It’s built slowly and lost quickly. We’d rather promise less and deliver every time.",
      practice: "One named contact for your request, replies within [one working day], and a straight answer when we can’t help.",
    },
    {
      title: "Better equipment where it matters most",
      body: "Small clinics in growing healthcare markets are often underserved by large distributors. We want to change that, from independent practices in Europe to private clinics in West and North Africa.",
      practice: "We work markets where we can make a real difference, and we build long-term relationships rather than chasing one-off sales.",
    },
  ],
  why: {
    title: "Why we do this",
    body: "Medixis was founded on Christian conviction. We believe business can be a form of service, and that honest dealing, fair pricing and care for the people at the end of the supply chain (patients in clinics we’ll never see) are part of doing work well. We serve clients and partners of every faith and none. What we ask of ourselves is integrity.",
  },
};

export const audiences = [
  { title: "Small private clinics", body: "Specialist and general practices that need the right equipment but have no procurement team to chase suppliers." },
  { title: "Private hospitals", body: "Private hospitals that want vetted options to compare, without adding work to their purchasing staff." },
];

export const categories = [
  { title: "Monitoring & diagnostics", body: "Patient monitors, vital-signs and diagnostic devices." },
  { title: "Imaging equipment", body: "Including mobile X-ray units and related systems." },
  { title: "Beds & clinical furniture", body: "For patient rooms, wards and treatment areas." },
  { title: "Therapy & mobility", body: "Therapy, mobility and patient-handling equipment." },
  { title: "Consumables & smaller items", body: "Everyday clinical supplies and smaller devices, not only large equipment." },
];

// Equipment types used by the homepage quick request card and category pills.
export const equipmentTypes = ["Ultrasound", "Patient monitoring", "Sterilisation", "Dental", "Laboratory", "Furniture & beds", "Other"];

export const faqs = [
  {
    q: "Why is this free?",
    a: "Suppliers pay Medixis a commission when a purchase is completed. Clinics never pay us: there is no fee, subscription or invoice from Medixis. That is how we can do the supplier legwork for you at no cost.",
  },
  {
    q: "Are you biased toward certain suppliers?",
    a: "We are paid by suppliers, and we tell you that upfront. We present options based on fit for your clinic \u2014 price, warranty, service and delivery \u2014 and you always make the final choice. You are free to compare our quotes with any you find yourself.",
  },
  {
    q: "Who invoices me?",
    a: "The supplier you choose invoices you directly, and you pay them directly. Medixis does not invoice clinics.",
  },
  {
    q: "What if I already have a quote?",
    a: "Send it to us. We will look for options that beat it on price, warranty, service or delivery. If our quotes don\u2019t beat what you already have, you keep your current offer and you\u2019ve lost nothing.",
  },
  {
    q: "Do you work with public hospitals?",
    a: "No. We work with small private clinics and private hospitals. We don\u2019t take part in public tenders or government procurement.",
  },
  {
    q: "Do I have to buy anything?",
    a: "No. Requesting quotes is free and puts you under no obligation. If none of the options suit you, you simply don\u2019t go ahead.",
  },
  {
    q: "Is it only for large equipment?",
    a: "No. As well as larger equipment, we can source consumables and smaller items.",
  },
];

export const team = [
  { name: "Jonas Jorgensen", role: "Founder & CEO", email: "jonas@medixisgroup.com", photo: asset("/images/jonas-jorgensen.webp") },
  { name: "Noah Sigler", role: "Chief Operating Officer & Co-Founder", email: "n.sigler@medixisgroup.com", photo: asset("/images/noah-sigler.webp") },
  { name: "Márk Kovácsevics", role: "European Partner", email: "mark@medixisgroup.com", photo: asset("/images/mark-kovacsevics.webp") },
  { name: "Istishna Saleem", role: "Client Relations", email: "saleem@medixisgroup.com", photo: asset("/images/istishna-saleem.webp") },
];

// "Who we are": wording from the Medixis LinkedIn post "Why choose Medixis?" (carousel and caption),
// plus the offer and team facts from the company profile.
export const whoWeAre = {
  lead: "Medixis is a medical equipment sourcing partner for private clinics and private hospitals.",
  intro: [
    "We believe the best equipment decisions begin with understanding what a healthcare organisation is working to achieve. Behind every equipment request is an organisation working towards something: opening a room, replacing an ageing unit, expanding a service or improving how it operates.",
    "A clinic opening a new treatment room needs more than an examination table. It needs equipment that meets its clinical requirements, arrives when it is needed and fits the plans and resources of the practice.",
  ],
  perspective: {
    eyebrow: "Our perspective",
    title: "This is where the Medixis approach begins.",
  },
  approach: [
    "We bring a business perspective to medical equipment sourcing. That means looking at the purchase in the context of the organisation making it: its plans, budget, timeline and operational needs. We use that understanding to help identify suitable suppliers and bring clarity to the commercial details behind their quotations.",
    "For us, the objective is to help the provider make a well-informed decision about the agreement as a whole: an agreement that works for the patients, people and organisation relying on it.",
    "We are paid by suppliers, through a commission on completed purchases, so the service is free for clinics. We say that plainly because trust depends on it: a sourcing partner is only useful if the clinic can see how it works.",
    "Medixis is founder-led and works as a distributed team, headquartered in Aarhus, Denmark. Our founders, Jonas Jorgensen and Noah Sigler, are directly involved in the work, so clinics deal with the people accountable for their requests.",
  ],
};

// From the Medixis Company Profile (October 2026), figures removed.
export const whyMedixis = [
  { title: "No request left unanswered", body: "We take on the challenging requests too. Through our supplier network and a solution-oriented team, we work to make even complex procurement requirements possible." },
  { title: "One dedicated coordinator", body: "One person who knows your clinic, follows your request and answers your questions." },
  { title: "Vetted EU + global network", body: "Suppliers matched to your specifications, giving you more options than going it alone." },
  { title: "Transparent, itemised quotes", body: "Pricing, specifications and lead times side by side, with payment terms confirmed in writing." },
  { title: "Easy to start", body: "No account or portal needed. Send a request with spec sheets or documents attached." },
];

export const threeSides = [
  { title: "Clinics & hospitals", body: "Private clinics and private hospitals tell us what they need and get vetted options to compare, free of charge.", href: "/contact/", cta: "Request quotes" },
  { title: "Suppliers", body: "Vetted suppliers reach qualified private-clinic buyers and pay a commission only on completed deals.", href: "/suppliers/", cta: "For suppliers" },
  { title: "Partners", body: "Our international partners are the third side of the Medixis model. Their local insight helps us understand developments on the ground, respond quickly and give every client attentive service.", href: "/partners/", cta: "Partner programme" },
];

export const story = [
  "Medixis was founded on a simple belief: healthcare supply chains can and should work better. We set out to make medical equipment sourcing more efficient, reliable and transparent, building relationships founded on trust and accountability.",
  "But our vision has always extended beyond business. At the heart of Medixis is a commitment to helping people and making quality healthcare more accessible. We aspire to turn that commitment into meaningful action, including through a future charitable initiative focused on providing medical equipment to underserved communities, particularly in regions of Africa where access to essential healthcare remains limited.",
  "For us, improving healthcare is not just about connecting suppliers and providers; it is about making a difference in people\u2019s lives.",
];

// Where Medixis works: shown when a region on the About-page globe is clicked.
// Figures supplied by Medixis (Nov 2026), with the sources Medixis provided.
export type RegionId = "denmark" | "eastern-europe" | "morocco" | "nigeria";
export const regions: {
  id: RegionId;
  name: string;
  detail: string;
  center: [number, number]; // lon, lat the camera flies to
  radius: number;           // angular radius in degrees that should fill the view
  countryIds: string[];     // ISO 3166 numeric codes, as used by world-atlas
  text: string[];
  sources: { label: string; url: string; note: string }[];
}[] = [
  {
    id: "denmark",
    name: "Denmark",
    detail: "Headquarters, Aarhus",
    center: [10.4, 56.1],
    radius: 3.4,
    countryIds: ["208"],
    text: [
      "Denmark’s private hospital sector is small but growing: the hospitals industry has grown at a CAGR of 12.2% between 2021 and 2026, as private providers take on patients the public system can’t treat quickly.",
      "There’s less need for help with sourcing than in emerging markets, but Denmark is where our relationships are strongest. We’ve been operating there since April 2026.",
    ],
    sources: [
      { label: "IBISWorld – Hospitals in Denmark", url: "https://www.ibisworld.com/denmark/industry/hospitals/200324/", note: "12.2% CAGR 2021–2026; private hospitals taking on patients the public system can’t treat quickly" },
    ],
  },
  {
    id: "eastern-europe",
    name: "Eastern Europe",
    detail: "Poland, Romania, Bulgaria, Latvia",
    center: [23.8, 50.2],
    radius: 10.5,
    countryIds: ["616", "642", "100", "428"],
    text: [
      "More and more people in the region are paying for private care. Poland’s private healthcare market was close to PLN 90 billion in 2024 and growing by double digits, and demand for private care in Romania has kept rising with a growing, wealthier middle class.",
      "That means a large pool of private clinics we could sell to, and our Romanian supplier gives us a strong position on the supply side. We started looking at the region in November 2026.",
    ],
    sources: [
      { label: "PZU Group Annual Report 2025 – Polish health care sector", url: "https://annualreport2025.pzu.pl/en/about-pzu-group/environment/polish-health-care-sector-compared-to-europe/", note: "Poland: about PLN 90B private market in 2024, double-digit growth (figures from PMR Market Experts)" },
      { label: "bne IntelliNews – The new No. 1 in Romania’s private medical sector", url: "https://intellinews.com/the-new-no-1-in-romania-s-private-medical-sector-207709", note: "Romania: demand rising with a wealthier middle class" },
    ],
  },
  {
    id: "morocco",
    name: "Morocco",
    detail: "North Africa",
    center: [-6.6, 31.6],
    radius: 6.5,
    countryIds: ["504"],
    text: [
      "Morocco has more than 400 private clinics, mostly in the Casablanca-Settat and Rabat-Salé-Kénitra regions, and the private sector is growing alongside government investment in healthcare.",
      "It’s our closest market to a first deal, and we’re working with a Chinese supplier that has a local distributor. One caveat: importing or selling used or refurbished medical equipment is now illegal there, so the refurbished side of the business won’t work in Morocco. We’ve been looking into Morocco since June 2026.",
    ],
    sources: [
      { label: "U.S. ITA – Morocco Country Commercial Guide: Healthcare", url: "https://www.trade.gov/country-commercial-guides/morocco-healthcare", note: "400+ private clinics, Casablanca and Rabat regions" },
      { label: "Mobility Foresights – Morocco Medical Devices Market 2024–2030", url: "https://mobilityforesights.com/product/morocco-medical-devices-market", note: "Ban on importing or selling used or refurbished equipment" },
    ],
  },
  {
    id: "nigeria",
    name: "Nigeria",
    detail: "West Africa",
    center: [8.2, 9.3],
    radius: 6.8,
    countryIds: ["566"],
    text: [
      "Nigeria has the largest medical device market in West Africa. It’s projected to grow from US$414.8 million in 2025 to US$632.48 million by 2030, and it relies mostly on imported devices, with China holding the largest share.",
      "Private hospitals and specialist clinics are Medixis’s main opening, because they often buy newer devices faster than public hospitals do. We’ve been looking into Nigeria since September 2026, with a partner on the ground covering the region.",
    ],
    sources: [
      { label: "Statista data via BusinessDay – Nigeria leads West Africa’s medical device sector", url: "https://businessday.ng/?p=1113998", note: "US$414.8M in 2025 → US$632.48M by 2030" },
      { label: "U.S. International Trade Administration – Healthcare Resource Guide: Nigeria", url: "https://www.trade.gov/healthcare-resource-guide-nigeria", note: "Import reliance; China’s dominant share" },
      { label: "Nexdigm – Nigeria Medical Devices Industry", url: "https://www.nexdigm.com/market-research/insights/blog/nigeria-medical-devices-industry/", note: "Private hospitals buy newer devices faster" },
    ],
  },
];
