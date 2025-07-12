import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCmZu5zC-Cj-4YsRm-HFyvz9rlfC28CAaA");

export const getCodeSuggestion = async (req, res) => {
  const { code, task } = req.body;

  try {
    const prompt = `${task}\n\nCode:\n${code}`;

    // Use the correct model name: "gemini-1.0-pro" or check with listModels()
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const result = await model.generateContent([prompt]);
    const response = result.response;
    const suggestion = await response.text();

    res.status(200).json({ suggestion });
  } catch (error) {
    console.error("Gemini error:", error.message);
    res.status(500).json({ error: "Failed to get AI suggestion." });
  }
};
