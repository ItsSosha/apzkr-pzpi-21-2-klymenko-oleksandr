import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { Measurement } from 'src/measurement/entities';

@Injectable()
export class AiService {
  private readonly genAi: GoogleGenerativeAI;
  private readonly genAiModel: GenerativeModel;

  constructor(private readonly configService: ConfigService) {
    this.genAi = new GoogleGenerativeAI(this.configService.getGeminiApiKey());
    this.genAiModel = this.genAi.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });
  }

  async recommendationPrompt(measurements: Measurement[]) {
    const measurementsString = measurements
      .map(
        (item) =>
          `Heart rate: ${item.heartRate}; Temperature: ${item.temperature}°C at ${item.date.getHours()}:${item.date.getMinutes()}`,
      )
      .join('\n');
    const prompt = this.configService
      .getRecommendationPrompt()
      .replace('*measurements*', measurementsString);
    const result = await this.genAiModel.generateContent(prompt);
    console.log(`AI response: ${result.response.text()}`);
    return result.response.text();
  }
}
