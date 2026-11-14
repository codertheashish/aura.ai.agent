// Edit these as things become real. null = not available yet; the UI shows an honest status.
export const SITE = {
  name: "BABU AI",
  url: "https://babu-ai-agent.vercel.app",
  tagline: "Your AI. Your Voice. Your Digital Companion.",
  description:
    "Meet Babu — an intelligent desktop AI assistant designed to understand, communicate, and help you interact with your digital world.",
};
export const DOWNLOADS: { windows: string | null; macos: string | null } = {
  windows: null, // paste the real installer URL when it exists
  macos: null,
};
export const CREATOR = {
  name: "CoderTheAshish",
  email: "codertheashish@gmail.com",
  github: "https://github.com/codertheashish",
  linkedin: null as string | null, // add your profile URL
  youtube: null as string | null, // add your channel URL
};
export const NAV = [
  ["Features", "/features"], ["Experience", "/experience"], ["How it works", "/how-it-works"],
  ["Download", "/download/windows"], ["Get started", "/getting-started"], ["FAQ", "/faq"],
] as const;
