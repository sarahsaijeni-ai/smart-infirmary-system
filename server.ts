import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '20mb' }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API: Multi-modal Species Identification using Gemini 3.8 Flash
app.post('/api/identify', async (req, res) => {
  try {
    const { imageBase64, mimeType, userNotes } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({
        isMockFallback: true,
        message: 'No GEMINI_API_KEY provided in secrets. Fallback to Edge AI classification engine.',
      });
    }

    const systemPrompt = `You are the BioSphere AI Cloud Identification Engine.
Analyze the provided biological image. Always adhere strictly to the 6-stage core inquiry and safety protocol:
1. Identify the likely species with common name, scientific binomial name, and family/order.
2. Provide a calibrated confidence score (0-100%).
3. CRITICAL SAFETY RULE: If the specimen is toxic, poisonous, or venomous (like Amanita mushrooms, poison hemlock, venomous snakes, toxic caterpillars), you MUST include a prominent SAFETY_WARNING, stating that wild specimens must never be ingested or handled based on an AI prediction.
4. List 3 key diagnostic morphological keys observable.
5. Provide habitat, ecological role, and IUCN status.
6. Provide a lookalike species and how to differentiate them.
Format the output as a valid JSON object matching this schema:
{
  "commonName": string,
  "scientificName": string,
  "category": "Plant" | "Bird" | "Insect" | "Fungi" | "Reptile" | "Mammal" | "Amphibian" | "Marine",
  "confidenceScore": number,
  "isDangerousOrToxic": boolean,
  "dangerWarning": string | null,
  "isInvasive": boolean,
  "isAgriculturalPest": boolean,
  "isEndangeredSensitive": boolean,
  "iucnStatus": string,
  "diagnosticFeatures": string[],
  "habitat": string,
  "geographicRange": string,
  "ecologicalRole": string,
  "threats": string,
  "similarLookalike": {
    "name": string,
    "scientificName": string,
    "differentiatingTrait": string
  }
}`;

    const parts: any[] = [{ text: systemPrompt }];
    if (imageBase64) {
      parts.push({
        inlineData: {
          mimeType: mimeType || 'image/jpeg',
          data: imageBase64.replace(/^data:image\/[a-z]+;base64,/, ''),
        },
      });
    }
    if (userNotes) {
      parts.push({ text: `User field observations / environment notes: ${userNotes}` });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: { parts },
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ isMockFallback: false, result: parsed });
  } catch (error: any) {
    console.error('Gemini Identification Error:', error);
    return res.status(200).json({
      isMockFallback: true,
      error: error.message,
    });
  }
});

// API: AI Biodiversity Tutor
app.post('/api/tutor', async (req, res) => {
  try {
    const { question, contextSpecies } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({
        isMockFallback: true,
        answer: "Operating in offline edge simulation mode. For full conversational reasoning, attach an API key in Secrets.",
      });
    }

    const systemInstruction = `You are the BioSphere AI Biodiversity Tutor.
Your pedagogical philosophy: Rather than simply stating a species name, explain why an identification is likely, which morphological characteristics were key, how to distinguish similar species, where the organism occurs, its ecological role, threats it faces, and what the user can learn next.
CRITICAL SAFETY RULE: Never tell users an organism is safe to eat or handle solely because of an AI prediction. Warn about poisonous fungi and venomous animals clearly.`;

    const prompt = contextSpecies
      ? `The user is examining ${contextSpecies.commonName} (${contextSpecies.scientificName}).
User question: ${question}`
      : question;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
      },
    });

    return res.json({
      isMockFallback: false,
      answer: response.text,
    });
  } catch (error: any) {
    console.error('Gemini Tutor Error:', error);
    return res.status(200).json({
      isMockFallback: true,
      error: error.message,
    });
  }
});

// Mount Vite middleware in development
async function startServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BioSphere AI server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
