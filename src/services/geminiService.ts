import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

export default async function generateDescriptionWithGemini(imageBuffer: Buffer) {
  const prompt =
    'Provide a single paragraph description of this image. Be specific and factual. Do not use phrases like "I see" or "This image shows" - start directly with the description.'
  try {
    const image = {
      inlineData: {
        data: imageBuffer.toString('base64'),
        mimeType: 'image/png',
      },
    }
    const result = await model.generateContent([prompt, image])
    return result.response.text() || 'Alt-text not available.'
  } catch (error: any) {
    console.error('Error getting alt-text:', error.message, error)
    throw new Error('Error getting alt-text from Gemini.')
  }
}
