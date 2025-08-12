import OpenAI from "openai";
import type { IContentRepository } from "../../domain/repositories/IContentRepository ";
import { ContentRequest } from "../../domain/entities/ContentRequest";
import { GeneratedContent } from "../../domain/entities/GeneratedContent";
import { v4 as uuidv4 } from "uuid";
import { getJSDocReadonlyTag } from "typescript";

export class OpenAIAdapter implements IContentRepository {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "",
    });
  }

  async generateContent(request: ContentRequest): Promise<GeneratedContent> {
    const response = await this.openai.chat.completions.create({
      model:'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content:this.buildPrompt(request)
        }
      ],
      max_tokens: request.maxLength
    });

    return new GeneratedContent(
      uuidv4(),
      response.choices[0]?.message.content || '',
      request.contentType,
      request.prompt,
      response.usage?.total_tokens || 0,
      {} as Record<string, any>
    )
  }

  private buildPrompt(request:ContentRequest):string {
    return `Generate a ${request.contentType} with a ${request.tone} tone in ${request.language}, Content: ${request.prompt}`
  }

  async getContentById(id: string): Promise<GeneratedContent | null> {
    return null;
  }

  async saveContent(content: GeneratedContent): Promise<void> {}

  async getContentHistory(limit?: number): Promise<GeneratedContent[]> {
    return [];
  }
}
