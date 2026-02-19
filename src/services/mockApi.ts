export const simulateBotResponse = async (
  userMessage: string,
  onChunk: (chunk: string) => void
): Promise<void> => {
  const response =
    "This is a simulated streaming response from the bot.";

  const chunks = response.match(/.{1,15}/g) || [];

  for (let i = 0; i < chunks.length; i++) {
    await new Promise((res) => setTimeout(res, 500));
    onChunk(chunks[i]);
  }
};
