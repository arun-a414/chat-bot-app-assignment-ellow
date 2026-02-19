/**
 * Simulates a backend streaming response.
 *
 * The response is split into chunks and emitted
 * with a delay to mimic real-time streaming behavior.
 *
 * @param _userMessage - The message sent by the user
 * @param onChunk - Callback executed for each streamed chunk
 */
export const simulateBotResponse = async (
  _userMessage: string,
  onChunk: (chunk: string) => void
): Promise<void> => {
  const response =
    "This is a simulated streaming response from the bot.";

  // Split response into small chunks (3–5 segments)
  const chunks = response.match(/.{1,15}/g) || [];

  for (let i = 0; i < chunks.length; i++) {
    // Simulate network delay
    await new Promise((res) => setTimeout(res, 500));
    onChunk(chunks[i]);
  }
};
