import { GoogleGenerativeAI } from '@google/generative-ai';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc    Handle chat messages via Gemini
// @route   POST /api/chat
// @access  Public
export const handleChat = asyncHandler(async (req, res, next) => {
  const { message, history } = req.body;

  if (!message) {
    return next(new ErrorResponse('Please provide a message', 400));
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // Using a fast, standard model

    const systemPrompt = `
      You are MedCompare Assistant, a highly intelligent, versatile, and knowledgeable AI assistant powered by Google Gemini.
      You are currently integrated into the MedCompare platform in India (a healthcare platform for comparing medicine prices across verified local pharmacies like Apollo, Netmeds, Tata 1mg, etc.).
      
      Current Date and Time Information:
      - Current Date: ${new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}
      - Current Time: ${new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })}
      - Current Day: ${new Date().toLocaleDateString('en-IN', { weekday: 'long', timeZone: 'Asia/Kolkata' })}

      Guidelines:
      1. You have vast general knowledge about the world, science, history, coding, math, pop culture, and everything else. Feel free to answer ANY question the user asks intelligently and accurately.
      2. If the user greets you or asks who you are, introduce yourself as the MedCompare Assistant powered by Gemini.
      3. If asked about MedCompare, explain that it brings transparency to healthcare pricing and helps users save money on medicines.
      4. If asked about specific medicines or prices on the platform, guide the user to use the "Search" bar on the dashboard.
      5. Keep your answers natural, helpful, empathetic, and professional. 
      6. Do NOT provide strict medical diagnoses or prescribe medications (add a disclaimer to consult a doctor if medical advice is sought), but you CAN provide general health and wellness information.
      7. You speak English, Hindi (Hinglish), and other regional languages depending on how the user talks to you.
    `;

    // Combine history for context if needed, but for simplicity, we'll send the prompt + recent context
    const fullPrompt = `${systemPrompt}\n\nUser: ${message}\nAssistant:`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({
      success: true,
      data: {
        reply: text
      }
    });

  } catch (error) {
    console.error("Gemini Error:", error);
    return next(new ErrorResponse('Failed to generate chat response', 500));
  }
});
