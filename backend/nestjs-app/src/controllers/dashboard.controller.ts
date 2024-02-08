import { Controller, Post, Body } from '@nestjs/common';
import { DashboardService } from '../services/dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post('filterLogs')
  async filterLogs(
    @Body()
    body: {
      username: string;
      model: string;
      status: string;
      startDate: string;
      endDate: string;
    },
  ): Promise<any[]> {
    const filteredLogs = await this.dashboardService.filterLogs(
      body.username,
      body.model,
      body.status,
      body.startDate,
      body.endDate,
    );
    return filteredLogs;
  }

  @Post('getTotalInputOutputTokens')
  async getTotalInputOutputTokens(
    @Body() body: { username: string },
  ): Promise<any> {
    const totals = await this.dashboardService.getTotalInputOutputTokens(
      body.username,
    );
    return totals;
  }

  @Post('getRequestsPerSecond')
  async getRequestsPerSecond(
    @Body() body: { username: string },
  ): Promise<any[]> {
    try {
      const { username } = body;
      const result = await this.dashboardService.getRequestsPerSecond(username);
      return result;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Rethrow the error if needed
    }
  }

  @Post('getStatusCount')
  async getStatusCount(@Body() body: { username: string }): Promise<{
    successCount: number;
    failureCount: number;
  }> {
    try {
      const { username } = body;
      const result = await this.dashboardService.getStatusCount(username)
      return result;
    } catch (error) {
      console.error('Error fetching status count and average latency:', error);
      throw error; // Rethrow the error if needed
    }
  }

  @Post('getP95LatencyAndAvgLatency')
  async getP95LatencyAndAvgLatency(
    @Body() body: { username: string },
  ): Promise<{
    p95Latency: number;
    avgLatency: number;
  }> {
    try {
      const { username } = body;
      const result =
        await this.dashboardService.getP95LatencyAndAvgLatency(username)
      return result;
    } catch (error) {
      console.error('Error fetching P95 latency:', error);
      throw error; 
    }
  }

  @Post('getLatencies')
  async getLatencies(
    @Body() body: { username: string },
  ): Promise<{ Latency: number[] }> {
    try {
      const { username } = body
      const result = await this.dashboardService.getLatencies(username)
      return result
    } catch (error) {
      console.error('Error fetching latencies:', error)
      throw error 
    }
  }
}
