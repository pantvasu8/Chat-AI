import { Injectable } from '@nestjs/common';
import { ClickHouseSetupService } from '../database';

@Injectable()
export class DashboardService {
  constructor(
    private readonly clickHouseSetupService: ClickHouseSetupService,
  ) {}

  async filterLogs(
    username: string,
    model: string,
    status: string,
    startDate: string,
    endDate: string,
  ): Promise<any[]> {
    try {
      let dynamicQuery = '';
      if (username) dynamicQuery += ` AND username = '${username}'`;
      if (model) dynamicQuery += ` AND model = '${model}'`;
      if (status) dynamicQuery += ` AND status = '${status}'`;      
      if (startDate) {
        dynamicQuery += ` AND timestamp >= toDateTime('${startDate}', 'Asia/Kolkata')`;
      }
      if (endDate) {
        dynamicQuery += ` AND timestamp <= toDateTime('${endDate}', 'Asia/Kolkata')`;
      }

      
      const query = `
        SELECT
          *
        FROM logs
        WHERE 1=1 ${dynamicQuery}
      `;

      const result = await this.clickHouseSetupService.clickHouse
        .query(query, {
          username,
          model,
          status,
          startDate,
          endDate,
        })
        .toPromise();

      return result;
    } catch (error) {
      console.error('Error filtering logs:', error);
      throw error; // Rethrow the error if needed
    }
  }

  async getTotalInputOutputTokens(username: string): Promise<any> {
    try {
      const query = `
        SELECT
          sum(promptTokens) AS totalInputTokens,
          sum(completionTokens) AS totalOutputTokens
        FROM logs
        WHERE username = '${username}'
      `;

      const result = await this.clickHouseSetupService.clickHouse
        .query(query, { username })
        .toPromise();

      console.log('Total Input and Output Tokens:', result);

      return result[0];
    } catch (error) {
      console.error('Error calculating total input and output tokens:', error);
      throw error;
    }
  }

  async getRequestsPerSecond(username: string): Promise<any[]> {
    try {
      const timePeriods: Array<
        '5min' | '30min' | '1hour' | '6hours' | '1day' | '2days'
      > = ['5min', '30min', '1hour', '6hours', '1day', '2days'];

      const result: any = {};

      for (const timePeriod of timePeriods) {
        const { startTime, intervalDuration } =
          this.calculateTimeDetails(timePeriod);
        const query = `
          SELECT
            toStartOfInterval(timestamp, INTERVAL ${intervalDuration} SECOND) AS interval_start,
            count() AS requests
          FROM logs
          WHERE username = '${username}' AND timestamp >= '${startTime}'
          GROUP BY interval_start
          ORDER BY interval_start
        `;
        const data = await this.clickHouseSetupService.clickHouse
          .query(query, { username })
          .toPromise();

        const countKey = `count_${timePeriod}`;
        result[countKey] = (data as any[]).reduce(
          (acc, entry) => acc + entry.requests,
          0,
        );
      }

      return result;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; 
    }
  }
  calculateTimeDetails(timePeriod: string): {
    startTime: string;
    intervalDuration: number;
  } {
    const currentDate = new Date();
    let startTime: string;
    let intervalDuration: number;

    switch (timePeriod) {
      case '5min':
        intervalDuration = 300; // 5 minutes in seconds
        startTime = this.subtractTime(currentDate, intervalDuration);
        break;

      case '30min':
        intervalDuration = 1800; // 30 minutes in seconds
        startTime = this.subtractTime(currentDate, intervalDuration);
        break;

      case '1hour':
        intervalDuration = 3600; // 1 hour in seconds
        startTime = this.subtractTime(currentDate, intervalDuration);
        break;

      case '6hours':
        intervalDuration = 21600; // 6 hours in seconds
        startTime = this.subtractTime(currentDate, intervalDuration);
        break;

      case '1day':
        intervalDuration = 86400; // 1 day in seconds
        startTime = this.subtractTime(currentDate, intervalDuration);
        break;

      case '2days':
        intervalDuration = 172800; // 2 days in seconds
        startTime = this.subtractTime(currentDate, intervalDuration);
        break;

      default:
        throw new Error(`Unsupported time period: ${timePeriod}`);
    }

    return { startTime, intervalDuration };
  }

  subtractTime(date: Date, seconds: number): string {
    const newDate = new Date(date.getTime() - seconds * 1000);
    return newDate.toISOString().slice(0, 19).replace('T', ' '); // Format as 'YYYY-MM-DD HH:mm:ss'
  }

  async getStatusCount(username: string): Promise<{
    successCount: number;
    failureCount: number;
  }> {
    try {
      const query = `
      SELECT
        countIf(status = 'success') AS successCount,
        countIf(status = 'failure') AS failureCount       
      FROM logs
      WHERE username = '${username}'
    `;

      const result = await this.clickHouseSetupService.clickHouse
        .query(query, { username })
        .toPromise();

      const { successCount, failureCount } = result[0] as any;

      return {
        successCount: successCount || 0,
        failureCount: failureCount || 0,
      };
    } catch (error) {
      console.error('Error fetching status count:', error);
      throw error; 
    }
  }

  async getP95LatencyAndAvgLatency(username: string): Promise<{
    p95Latency: number;
    avgLatency: number;
  }> {
    try {
      const query = `
      SELECT
        quantile(0.95)(latency) AS p95Latency,
        avgIf(latency, status = 'success') AS avgLatency
      FROM logs
      WHERE username = '${username}' AND status = 'success'
    `;

      const result = await this.clickHouseSetupService.clickHouse
        .query(query, { username })
        .toPromise();

      const { p95Latency, avgLatency } = result[0] as any;

      return {
        p95Latency: p95Latency || 0,
        avgLatency: avgLatency || 0,
      };
    } catch (error) {
      console.error('Error fetching P95 latency:', error);
      throw error; 
    }
  }

  async getLatencies(username: string): Promise<{ Latency: number[] }> {
    try {
      
      const query = `
          SELECT
              latency
          FROM logs
          WHERE username = '${username}'
      `;
      
      const results = await this.clickHouseSetupService.clickHouse
        .query(query, { username })
        .toPromise()
      
      const latencies = results.map((row: any) => row.latency || 0);
      
      return { Latency: latencies };
    } catch (error) {
      console.error('Error fetching latencies:', error)
      throw error 
    }
  }
}
