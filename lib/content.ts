import shots from "@/content/screenshots.json";
import tuts from "@/content/tutorials.json";
export type Shot = { id: string; title: string; description: string; category: "Listening" | "Thinking" | "Speaking" | "Gallery"; src: string; published?: boolean };
export type Tut = { id: string; title: string; youtube: string };
export const screenshots = (shots.items as Shot[]).filter((s) => s.published !== false);
export const tutorials = tuts.items as Tut[];
export const FEATURES = [
  ["Natural voice conversation", "Talk to Babu and hear it answer."],
  ["Hindi, Hinglish and English", "Switch between languages in the same conversation."],
  ["Gemini-powered intelligence", "Responses come from Google's Gemini models using your own API key."],
  ["Voice input and speech output", "Speak your request; Babu replies out loud."],
  ["Wake word and push-to-talk", "Call Babu by name, or hold a key to speak."],
  ["Personal memory", "Babu can remember details you share. Stored on your computer."],
  ["Date-wise history", "Browse past conversations by day."],
  ["Computer and app control", "Open and operate applications by voice or text."],
  ["Web search", "Look up current information without leaving the chat."],
  ["File and productivity help", "Assist with everyday file and task work."],
  ["Plugins and tools", "Extend Babu with tool integrations."],
  ["Avatar interface", "An interactive on-screen assistant that shows what Babu is doing."],
  ["Local history in SQLite", "Conversations are saved in a database on your machine."],
] as const;
export const STATES = [
  ["Listening", "Babu is capturing your voice."],
  ["Thinking", "Babu is working out a response."],
  ["Speaking", "Babu is replying out loud."],
] as const;
