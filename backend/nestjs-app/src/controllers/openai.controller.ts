import { Controller, Post, Body } from '@nestjs/common';
import { OpenaiService } from '../services/openai.service';

@Controller('openai')
export class OpenAIController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('getCompletionResponse')
  async getResponse(
    @Body() body: { username: string; prompt: string; model: string },
  ): Promise<{ data: string }> {
    const response = await this.openaiService.getPromptResponse(
      body.username,
      body.prompt,
      body.model,
    );
    return response;
  }
}
