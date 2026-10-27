// Icons — clean SVG icon components using Heroicons paths
// Usage: <Icon.Search className="w-5 h-5 text-sky-600" />

const base = "fill-none stroke-current stroke-2";

const Icon = {
  Search: (p) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...p} className={`${base} ${p.className||""}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Heart: ({ filled, ...p }) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...p}
         className={`${filled ? "fill-current" : "fill-none"} stroke-current stroke-2 ${p.className||""}`}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  Moon: (p) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...p} className={`${base} ${p.className||""}`}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  ),
  Sun: (p) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...p} className={`${base} ${p.className||""}`}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Globe: (p) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...p} className={`${base} ${p.className||""}`}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  GraduationCap: (p) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...p} className={`${base} ${p.className||""}`}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  ),
  Calendar: (p) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...p} className={`${base} ${p.className||""}`}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  MapPin: (p) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...p} className={`${base} ${p.className||""}`}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  BookOpen: (p) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...p} className={`${base} ${p.className||""}`}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  X: (p) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...p} className={`${base} ${p.className||""}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  ArrowRight: (p) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...p} className={`${base} ${p.className||""}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  ),
  ChevronDown: (p) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...p} className={`${base} ${p.className||""}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  ),
  Lightning: (p) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...p} className={`fill-current ${p.className||""}`}>
      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Check: (p) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...p} className={`${base} ${p.className||""}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  CurrencyDollar: (p) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...p} className={`${base} ${p.className||""}`}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Clock: (p) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...p} className={`${base} ${p.className||""}`}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Sparkles: (p) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...p} className={`${base} ${p.className||""}`}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  Filter: (p) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...p} className={`${base} ${p.className||""}`}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  ),
  Award: (p) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...p} className={`${base} ${p.className||""}`}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
};

export default Icon;
