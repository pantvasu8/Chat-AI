import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { ClickHouseSetupService } from '../database';

@Injectable()
export class OpenaiService {
  private readonly apiKey: string;
  private readonly openai: OpenAI;

  constructor(private readonly clickHouseSetupService: ClickHouseSetupService) {

    this.apiKey = process.env.OPENAI_API_KEY;
    if (!this.apiKey) {
      throw new Error('OpenAI API key not found in environment variables.');
    }

    this.openai = new OpenAI({ apiKey: this.apiKey });
  }

  async getPromptResponse(
    username: string,
    prompt: string,
    model: string,
  ): Promise<{ data: string }> {
    try {
      const startTime = Date.now();
      const response_openai = await this.openai.completions.create({
        prompt,
        model,
      });

      const endTime = Date.now();
      const latency = endTime - startTime;

      const completionTokens = response_openai.usage.completion_tokens;
      const promptTokens = response_openai.usage.prompt_tokens;
      const totalTokens = response_openai.usage.total_tokens;
      const responseText = response_openai.choices[0]?.text?.trim() || '';
      const originalDate = new Date();
      // Format oridinalDate as 'YYYY-MM-DD HH:mm:ss' and storing as timestamp
      const timestamp = `${originalDate.getFullYear()}-${(originalDate.getMonth() + 1).toString().padStart(2, '0')}-${originalDate.getDate().toString().padStart(2, '0')} ${originalDate.getHours().toString().padStart(2, '0')}:${originalDate.getMinutes().toString().padStart(2, '0')}:${originalDate.getSeconds().toString().padStart(2, '0')}`;
      //console.log(timestamp);
      const status = 'success';

      const query = `  INSERT INTO logs (username, latency, model, status, timestamp, request, response, totalTokens, completionTokens, promptTokens)
      VALUES ('${username}','${latency}', '${model}', '${status}', '${timestamp}', '${prompt}', '${responseText}', '${totalTokens}', '${completionTokens}', '${promptTokens}')`;

      await this.clickHouseSetupService.clickHouse
        .query(query, {
          username,
          latency,
          model,
          status,
          timestamp,
          prompt,
          responseText,
          totalTokens,
          promptTokens,
          completionTokens,
        })
        .toPromise();

      return { data: response_openai.choices[0]?.text?.trim() || '' };
    } catch (error) {
      return new Promise(async (resolve, reject) => {
        const latency = 0.0;
        const completionTokens = 0;
        const promptTokens = 0;
        const totalTokens = 0;
        const responseText = 'NA';
        const originalDate = new Date();
        const timestamp = `${originalDate.getFullYear()}-${(originalDate.getMonth() + 1).toString().padStart(2, '0')}-${originalDate.getDate().toString().padStart(2, '0')} ${originalDate.getHours().toString().padStart(2, '0')}:${originalDate.getMinutes().toString().padStart(2, '0')}:${originalDate.getSeconds().toString().padStart(2, '0')}`;
        //console.log(timestamp);
        const status = 'failure';

        const query = `INSERT INTO logs (username, latency, model, status, timestamp, request, response, totalTokens, completionTokens, promptTokens)
          VALUES ('${username}','${latency}', '${model}', '${status}', '${timestamp}', '${prompt}', '${responseText}', '${totalTokens}', '${completionTokens}', '${promptTokens}')`;

        await this.clickHouseSetupService.clickHouse
          .query(query, {
            username,
            latency,
            model,
            status,
            timestamp,
            prompt,
            responseText,
            totalTokens,
            promptTokens,
            completionTokens,
          })
          .toPromise();

        console.error(
          'Error calling OpenAI API or error logging OpenAI response to the database:',
          error.message,
        );
        reject(error);
      });
    }
  }
}
