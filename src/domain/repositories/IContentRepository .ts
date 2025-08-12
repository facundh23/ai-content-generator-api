import { ContentRequest } from "../entities/ContentRequest";
import { GeneratedContent } from "../entities/GeneratedContent";

export interface IContentRepository {
    generateContent(request:ContentRequest): Promise<GeneratedContent>;
    getContentById(id:string): Promise<GeneratedContent | null>;
    saveContent(content:GeneratedContent):Promise<void>;
    getContentHistory(limit?:number): Promise<GeneratedContent[]>;
}