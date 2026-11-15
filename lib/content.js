export const NAV = [['/', 'Home'], ['/#features', 'Features'], ['/#experience', 'Experience'], ['/how-it-works', 'How it works'], ['/downloads', 'Downloads'], ['/getting-started', 'Get started'], ['/tutorials', 'Tutorials'], ['/faq', 'FAQ']];
export const FEATURES = [
  ['Natural voice conversation', 'Talk to Jini and hear it answer back, the way you would with a person.'],
  ['Hindi, Hinglish and English', 'Switch between languages mid-sentence without changing settings.'],
  ['Gemini-powered intelligence', 'Understanding and replies come from Google Gemini, using your own API key.'],
  ['Voice input, speech output', 'Speak your request; Jini replies out loud.'],
  ['Wake word and push-to-talk', 'Call Jini hands-free, or hold a key when you want control.'],
  ['Personal memory', 'Jini saves important details you share, such as preferences and projects, and keeps them on your computer.'],
  ['Computer and app control', 'Open and operate applications on your computer by voice.'],
  ['Web search', 'Look things up and bring back information.'],
  ['Files and productivity', 'Help with files and everyday tasks.'],
  ['Plugins and tools', 'Extend Jini with tool integrations.'],
  ['Avatar interface', 'An interactive agent avatar that shows when Jini is listening, thinking or speaking.'],
];
export const PAGES = {
  about: { title: 'About Jini', desc: 'What Jini AI is.', body: [
    ['A desktop AI agent', 'Jini is an AI agent that runs as an application on your computer. You talk to it, it understands you, and it helps you work with your files, apps and the web.'],
    ['Built for how people speak here', 'Jini is designed for Hindi, Hinglish and English, so you can speak naturally instead of translating in your head.'],
    ['Status', 'Jini is created and maintained by one developer. Public installers are not available yet. Features listed on this site may vary by operating system.']] },
  'how-it-works': { title: 'How Jini works', desc: 'From your voice to a spoken answer.', body: [
    ['1. Jini listens', 'Say the wake word or hold the push-to-talk key. Jini records what you say.'],
    ['2. Jini thinks', 'Your request is sent to Google Gemini using your own API key. Jini can also use tools, such as web search or app control, to complete it.'],
    ['3. Jini answers', 'The reply is spoken aloud and shown in the interface. Jini keeps the current session in mind for follow-up questions, and saves only important personal details to its local memory.']] },
  'getting-started': { title: 'Getting started', desc: 'Set up Jini on your computer.', body: [
    ['Before you start', 'Installers are not released yet, so there is nothing to download today. See the Downloads page for status.'],
    ['When an installer is available', 'Download it for your operating system, run it, then add your Gemini API key in Jini\u2019s settings.'],
    ['Need a key?', 'Follow the Gemini API key guide. It takes a few minutes.']] },
  'gemini-api-key': { title: 'Gemini API key setup', desc: 'Get your own Google Gemini API key.', body: [
    ['Why you need one', 'Jini uses your personal Gemini API key, so your usage is under your own Google account.'],
    ['Create the key', 'Open Google AI Studio (aistudio.google.com), sign in with your Google account, choose \u201cGet API key\u201d, and create a key.'],
    ['Keep it private', 'Do not share your key or post it publicly. Paste it only into Jini\u2019s settings on your computer. Google\u2019s current limits and pricing apply; check them in AI Studio.']] },
  privacy: { title: 'Privacy and security', desc: 'How Jini handles your data.', body: [
    ['Stored on your computer', 'Jini does not keep a date-wise record of your conversations. Personal memory, the important details Jini saves for later, is stored locally on your computer. No cloud conversation sync is implemented.'],
    ['Your own Gemini key', 'You provide your own Gemini API key. Live voice and text processing may be sent to Google\u2019s Gemini services, under Google\u2019s own terms.'],
    ['This website', 'This website does not collect your desktop conversations and does not use analytics or tracking.'],
    ['Limits of this page', 'Jini is software made by an individual developer. We describe what it does today and do not promise protection beyond that.']] },
  faq: { title: 'FAQ', desc: 'Common questions.', body: [
    ['Is Jini available to download?', 'Not yet. The Downloads page shows the current status.'],
    ['Does Jini work on Windows and macOS?', 'Both are planned. Some features may not work on every operating system.'],
    ['Is it free?', 'There is no payment or subscription on this website. You need your own Gemini API key, and Google\u2019s terms apply to its usage.'],
    ['Where is my data?', 'Personal memory stays on your computer, and Jini does not save full conversation history. See Privacy.'],
    ['Which languages work?', 'Hindi, Hinglish and English.']] },
  contact: { title: 'Contact and creator', desc: 'Who makes Jini.', body: [
    ['Creator', 'CoderTheAshish'],
    ['Email', 'codertheashish@gmail.com'],
    ['GitHub', 'https://github.com/codertheashish']] },
};
export const CREATOR = { name: 'CoderTheAshish', email: 'codertheashish@gmail.com', github: 'https://github.com/codertheashish', linkedin: 'https://www.linkedin.com/in/codertheashish/', instagram: 'https://www.instagram.com/codertheashish/', youtube: 'https://www.youtube.com/@codertheashish' };
PAGES.contact.body = [['Creator', CREATOR.name], ['Email', CREATOR.email], ['GitHub', CREATOR.github], ['LinkedIn', CREATOR.linkedin], ['Instagram', CREATOR.instagram], ['YouTube', CREATOR.youtube]];
