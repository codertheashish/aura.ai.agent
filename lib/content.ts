import shots from "@/content/screenshots.json";
import tuts from "@/content/tutorials.json";
export type Shot = { id: string; title: string; description: string; category: "Listening" | "Thinking" | "Speaking" | "Gallery"; src: string; published?: boolean };
export type Tut = { id: string; title: string; youtube: string };
export const screenshots = (shots.items as Shot[]).filter((s) => s.published !== false);
export const tutorials = tuts.items as Tut[];
export const FEATURES = [
  ["Natural voice conversation", "Talk to Jini and hear it answer."],
  ["Hindi, Hinglish and English", "Switch between languages in the same conversation."],
  ["Gemini-powered intelligence", "Responses come from Google's Gemini models using your own API key."],
  ["Voice input and speech output", "Speak your request; Jini replies out loud."],
  ["Wake word and push-to-talk", "Call Jini by name, or hold a key to speak."],
  ["Personal memory", "Jini can remember details you share. Stored on your computer."],
  ["Date-wise history", "Browse past conversations by day."],
  ["Computer and app control", "Open and operate applications by voice or text."],
  ["Web search", "Look up current information without leaving the chat."],
  ["File and productivity help", "Assist with everyday file and task work."],
  ["Plugins and tools", "Extend Jini with tool integrations."],
  ["Avatar interface", "An interactive on-screen agent that shows what Jini is doing."],
  ["Local history in SQLite", "Conversations are saved in a database on your machine."],
] as const;
export const STATES = [
  ["Listening", "Jini is capturing your voice."],
  ["Thinking", "Jini is working out a response."],
  ["Speaking", "Jini is replying out loud."],
] as const;
