import { Injectable } from '@nestjs/common';
import { ClickHouse } from 'clickhouse';

@Injectable()
export class ClickHouseSetupService {
  public readonly clickHouse: ClickHouse;

  constructor() {
    this.clickHouse = new ClickHouse({
      url: 'https://srahyrpq5d.ap-south-1.aws.clickhouse.cloud',
      port: 8443,
      debug: false,
      basicAuth: {
        username: process.env.CLICKHOUSE_USERNAME,
        password: process.env.CLICKHOUSE_PASSWORD,
      },
      isUseGzip: false,
    });
  }

  async createTables(): Promise<void> {
    await this.createUsersTable();
    await this.createLogsTable();
  }

  private async createUsersTable(): Promise<void> {
    // Define the raw SQL query to create the users table
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        username String,
        password String,
        PRIMARY KEY (username)
      ) ENGINE = MergeTree ORDER BY username
    `;

    await this.clickHouse.query(query).toPromise();
  }

  private async createLogsTable(): Promise<void> {
    // Define the raw SQL query to create the logs table
    const query = `
      CREATE TABLE IF NOT EXISTS logs (
        username String,
        latency Float32,
        model String,
        status String,
        timestamp DateTime('Asia/Kolkata'),
        request String,
        response String,
        totalTokens UInt32,
        promptTokens UInt32,
        completionTokens UInt32,
        PRIMARY KEY (username)
      ) ENGINE = MergeTree ORDER BY username
    `;

    await this.clickHouse.query(query).toPromise();
  }
}
