import ContentType from "./ContentType";

export interface ContentRequestParams {
  prompt: string;
  contentType: string;
  tone?: "professional" | "casual" | "friendly" | "formal";
  maxLength?: number;
  language?: string;
}

export class ContentRequest {
  public readonly prompt: string;
  public readonly contentType: string;
  public readonly tone: string;
  public readonly maxLength: number;
  public readonly language: string;
  public readonly createdAt: Date;

  constructor(params: ContentRequestParams) {
    this.validateParams(params);

    this.prompt = params.prompt;
    this.contentType = params.contentType;
    this.tone = params.tone || "professional";
    this.maxLength = params.maxLength || 500;
    this.language = params.language || "es";
    this.createdAt = new Date();
  }

  private validateParams(params: ContentRequestParams): void {
    if (!params.prompt || params.prompt.trim().length === 0) {
      throw new Error("Promp is required");
    }

    if (!ContentType.isValid(params.contentType)) {
      throw new Error(`Invalid content type: ${params.contentType}`);
    }
  }
}
