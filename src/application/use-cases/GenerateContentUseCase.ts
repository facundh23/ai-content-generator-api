import { ContentRequest } from "../../domain/entities/ContentRequest";
import { GeneratedContent } from "../../domain/entities/GeneratedContent";
import type { IContentRepository } from "../../domain/repositories/IContentRepository ";

export class GenerateContentUseCase {
  constructor(private contentRepository: IContentRepository) {}

  async execute(request: ContentRequest): Promise<GeneratedContent> {
    try {
      const generatedContent = await this.contentRepository.generateContent(
        request
      );
      await this.contentRepository.saveContent(generatedContent);
      return generatedContent;
    } catch (error: any) {
      throw new Error(`Failed to generate content: ${error.message}`);
    }
  }
}
