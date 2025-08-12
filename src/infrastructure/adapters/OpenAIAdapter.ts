import OpenAI from "openai";
import { ContentRequest } from "../../domain/entities/ContentRequest";
import { GeneratedContent } from "../../domain/entities/GeneratedContent";
import { v4 as uuidv4 } from "uuid";
import type { IContentRepository } from "../../domain/repositories/IContentRepository ";

export class OpenAIAdapter implements IContentRepository {
  async generateContent(request: ContentRequest): Promise<GeneratedContent> {
    // Crear el cliente aquí, no en el constructor
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "",
    });

    try {
      const prompt = this.buildPrompt(request);

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: request.maxLength,
      });

      console.log("✅ OpenAI response received");

      return new GeneratedContent(
        uuidv4(),
        response.choices?.[0]?.message?.content || "No content generated",
        request.contentType,
        request.prompt,
        response.usage?.total_tokens || 0
      );
    } catch (error) {
      console.error("❌ OpenAI Adapter error:", error);
      throw error;
    }
  }

  private buildPrompt(request: ContentRequest): string {
    return `Generate a ${request.contentType} with a ${request.tone} tone in ${request.language}. Content: ${request.prompt}`;
  }

  async getContentById(id: string): Promise<GeneratedContent | null> {
    return null;
  }

  async saveContent(content: GeneratedContent): Promise<void> {
    // Por ahora vacío
  }

  async getContentHistory(limit?: number): Promise<GeneratedContent[]> {
    return [];
  }
}
