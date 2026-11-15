// Edit these as things become real. null = not available yet; the UI shows an honest status.
export const SITE = {
  name: "JINI AI",
  url: "https://jini-ai-agent.vercel.app",
  tagline: "Your AI. Your Voice. Your Digital Companion.",
  description:
    "Meet Jini — an intelligent desktop AI agent designed to understand, communicate, and help you interact with your digital world.",
};
export const DOWNLOADS: { windows: string | null; macos: string | null } = {
  windows: null, // paste the real installer URL when it exists
  macos: null,
};
export const CREATOR = {
  name: 'CoderTheAshish',
  email: 'mailto:codertheashish@gmail.com',
  github: 'https://github.com/codertheashish',
  linkedin: 'https://www.linkedin.com/in/codertheashish/',
  youtube: 'https://www.youtube.com/@codertheashish',
  instagram: 'https://www.instagram.com/codertheashish/',
};
export const NAV = [
  ["Features", "/features"], ["Experience", "/experience"], ["How it works", "/how-it-works"],
  ["Download", "/download/windows"], ["Get started", "/getting-started"], ["FAQ", "/faq"],
] as const;
