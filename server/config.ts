
export const config = {
  apiKey: process.env.GOOGLE_API_KEY || '',
  maxTokens: 1000,
  temperature: 0.7,
  modelName: 'gemini-pro'
};

export default config;
