export const isBot = (): boolean => {
  const userAgent = navigator.userAgent.toLowerCase();
  const bots = [
    "googlebot",
    "bingbot",
    "slurp",
    "duckduckbot",
    "baiduspider",
    "yandexbot",
    "sogou",
    "exabot",
    "facebot",
    "facebookexternalhit",
    "twitterbot",
    "linkedinbot",
    "whatsapp", // Whatsapp previews
    "telegrambot",
    "discordbot",
  ];
  return bots.some((bot) => userAgent.includes(bot));
};
