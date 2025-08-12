export class GeneratedContent {
  public readonly id: string;
  public readonly content: string;
  public readonly contentType: string;
  public readonly originalPrompt: string;
  public readonly tokensUsed: number;
  public readonly generatedAt: Date;
  public readonly metadata: Record<string, any>;

  constructor(
    id: string,
    content: string,
    contentType: string,
    originalPrompt: string,
    tokensUsed: number,
     metadata: Record<string, any> = {} 
  ) {
    this.validateContent(content);

    this.id = id;
    this.content = content;
    this.contentType = contentType;
    this.originalPrompt = originalPrompt;
    this.tokensUsed = tokensUsed;
    this.generatedAt = new Date();
    this.metadata = metadata;
  }

  private validateContent(content: string): void {
    if (!content || content.trim().length === 0) {
      throw new Error("Generated content cannot be empty");
    }
  }

  public getWordCount(): number {
    return this.content.split(" ").length;
  }
}
