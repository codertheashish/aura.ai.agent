export const NAV = [['/', 'Home'], ['/#features', 'Features'], ['/#experience', 'Experience'], ['/how-it-works', 'How it works'], ['/downloads', 'Downloads'], ['/getting-started', 'Get started'], ['/tutorials', 'Tutorials'], ['/faq', 'FAQ']];
export const FEATURES = [
  ['Natural voice conversation', 'Talk to Babu and hear it answer back, the way you would with a person.'],
  ['Hindi, Hinglish and English', 'Switch between languages mid-sentence without changing settings.'],
  ['Gemini-powered intelligence', 'Understanding and replies come from Google Gemini, using your own API key.'],
  ['Voice input, speech output', 'Speak your request; Babu replies out loud.'],
  ['Wake word and push-to-talk', 'Call Babu hands-free, or hold a key when you want control.'],
  ['Personal memory', 'Babu remembers details you share, stored on your computer.'],
  ['Date-wise history', 'Browse past conversations by day. Stored locally in SQLite.'],
  ['Computer and app control', 'Open and operate applications on your computer by voice.'],
  ['Web search', 'Look things up and bring back information.'],
  ['Files and productivity', 'Help with files and everyday tasks.'],
  ['Plugins and tools', 'Extend Babu with tool integrations.'],
  ['Avatar interface', 'An interactive assistant avatar that shows when Babu is listening, thinking or speaking.'],
];
export const PAGES = {
  about: { title: 'About Babu', desc: 'What Babu AI is.', body: [
    ['A desktop AI assistant', 'Babu is an AI assistant that runs as an application on your computer. You talk to it, it understands you, and it helps you work with your files, apps and the web.'],
    ['Built for how people speak here', 'Babu is designed for Hindi, Hinglish and English, so you can speak naturally instead of translating in your head.'],
    ['Status', 'Babu is created and maintained by one developer. Public installers are not available yet. Features listed on this site may vary by operating system.']] },
  'how-it-works': { title: 'How Babu works', desc: 'From your voice to a spoken answer.', body: [
    ['1. Babu listens', 'Say the wake word or hold the push-to-talk key. Babu records what you say.'],
    ['2. Babu thinks', 'Your request is sent to Google Gemini using your own API key. Babu can also use tools, such as web search or app control, to complete it.'],
    ['3. Babu answers', 'The reply is spoken aloud and shown in the interface. The conversation is saved in a local SQLite database on your computer.']] },
  'getting-started': { title: 'Getting started', desc: 'Set up Babu on your computer.', body: [
    ['Before you start', 'Installers are not released yet, so there is nothing to download today. See the Downloads page for status.'],
    ['When an installer is available', 'Download it for your operating system, run it, then add your Gemini API key in Babu\u2019s settings.'],
    ['Need a key?', 'Follow the Gemini API key guide. It takes a few minutes.']] },
  'gemini-api-key': { title: 'Gemini API key setup', desc: 'Get your own Google Gemini API key.', body: [
    ['Why you need one', 'Babu uses your personal Gemini API key, so your usage is under your own Google account.'],
    ['Create the key', 'Open Google AI Studio (aistudio.google.com), sign in with your Google account, choose \u201cGet API key\u201d, and create a key.'],
    ['Keep it private', 'Do not share your key or post it publicly. Paste it only into Babu\u2019s settings on your computer. Google\u2019s current limits and pricing apply; check them in AI Studio.']] },
  privacy: { title: 'Privacy and security', desc: 'How Babu handles your data.', body: [
    ['Stored on your computer', 'Conversation history and personal memory are stored locally on your computer. No cloud conversation sync is implemented.'],
    ['Your own Gemini key', 'You provide your own Gemini API key. Live voice and text processing may be sent to Google\u2019s Gemini services, under Google\u2019s own terms.'],
    ['This website', 'This website does not collect your desktop conversations and does not use analytics or tracking.'],
    ['Limits of this page', 'Babu is software made by an individual developer. We describe what it does today and do not promise protection beyond that.']] },
  faq: { title: 'FAQ', desc: 'Common questions.', body: [
    ['Is Babu available to download?', 'Not yet. The Downloads page shows the current status.'],
    ['Does Babu work on Windows and macOS?', 'Both are planned. Some features may not work on every operating system.'],
    ['Is it free?', 'There is no payment or subscription on this website. You need your own Gemini API key, and Google\u2019s terms apply to its usage.'],
    ['Where is my data?', 'Conversations and memory stay on your computer. See Privacy.'],
    ['Which languages work?', 'Hindi, Hinglish and English.']] },
  contact: { title: 'Contact and creator', desc: 'Who makes Babu.', body: [
    ['Creator', 'CoderTheAshish'],
    ['Email', 'codertheashish@gmail.com'],
    ['GitHub', 'https://github.com/codertheashish']] },
};
