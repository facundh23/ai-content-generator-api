import type { Request, Response } from "express";
import { GenerateContentUseCase } from "../../application/use-cases/GenerateContentUseCase";
import { ContentRequest } from "../../domain/entities/ContentRequest";
import { OpenAIAdapter } from "../../infrastructure/adapters/OpenAIAdapter";

export class ContentController {
  private generateContentUseCase: GenerateContentUseCase;

  constructor() {
    const openAiAdapter = new OpenAIAdapter();
    this.generateContentUseCase = new GenerateContentUseCase(openAiAdapter);
  }

  async generateContent(req: Request, res: Response): Promise<void> {

    try {
      const { prompt, contentType, tone, maxLength, language } = req.body;

      const contentRequest = new ContentRequest({
        prompt,
        contentType,
        tone,
        maxLength,
        language,
      });

      const result = await this.generateContentUseCase.execute(contentRequest);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
}
