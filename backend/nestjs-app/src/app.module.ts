import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { DashboardController } from './controllers/dashboard.controller';
import { ClickHouseSetupService } from './database';
import { AuthService } from './services/auth.service';
import { OpenaiService } from './services/openai.service';
import { OpenAIController } from './controllers/openai.controller';
import { DashboardService } from './services/dashboard.service';

@Module({
  imports: [],
  controllers: [AuthController, OpenAIController, DashboardController],
  providers: [
    ClickHouseSetupService,
    AuthService,
    OpenaiService,
    DashboardService,
  ],
})
export class AppModule {
  constructor(private readonly clickHouseSetupService: ClickHouseSetupService) {
    this.setupDatabase();
  }

  async setupDatabase(): Promise<void> {
    try {
      await this.clickHouseSetupService.createTables();
      console.log('Connection established to ClickHouse');
      console.log('Database setup complete- tables created');
    } catch (error) {
      console.error(
        'Error establishing connection to ClickHouse or error in queries:',
        error,
      );
    }
  }
}
