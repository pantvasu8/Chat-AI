import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ClickHouseSetupService } from '../database';

@Injectable()
export class AuthService {
  constructor(
    private readonly clickHouseSetupService: ClickHouseSetupService,
  ) {}

  async signup(username: string, password: string): Promise<boolean> {
    try {
      // Hashing the password before storing it
      const query1 = `SELECT count()>0 AS user_count FROM users WHERE username = '${username}'`;
      const result = await this.clickHouseSetupService.clickHouse
        .query(query1, { username })
        .toPromise();

      console.log(result);
      if ((result[0] as any)?.user_count === 0) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `INSERT INTO users (username, password) VALUES ('${username}', '${hashedPassword}')`;

        const success = await this.clickHouseSetupService.clickHouse
          .query(query, {
            username,
            password: hashedPassword,
          })
          .toPromise();

        if (success) {
          console.log(`Signup successful for user: ${username}`);
          return true;
        }
      } else {
        console.log(`Signup failed for user: ${username} - User already exist`);
        return false;
      }
    } catch (error) {
      console.error(`Signup failed for user: ${username}`, error);
      throw error; 
    }
  }

  async login(username: string, password: string): Promise<boolean> {
    try {
      // Retrieving hashed password from ClickHouse
      const query = `SELECT password FROM users WHERE username = '${username}'`;
      const result = await this.clickHouseSetupService.clickHouse
        .query(query, { username })
        .toPromise();

      //console.log('result of login query', result);

      if (result) {
        const hashedPassword = (result[0] as any).password;

        // Comparing the provided password with the hashed password
        const success = await bcrypt.compare(password, hashedPassword);

        if (success) {
          console.log(`Login successful for user: ${username}`);
        } else {
          console.log(`Login failed for user: ${username} - Invalid password`);
        }

        return success;
      } else {
        console.log(`Login failed for user: ${username} - User not found`);
        return false;
      }
    } catch (error) {
      console.error(`Login failed for user: ${username}`, error);
      throw error; 
    }
  }
}
