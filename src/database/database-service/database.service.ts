import {
  Injectable,
  OnModuleInit,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { createConnection } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Users } from './../entities';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);
  constructor(private config: ConfigService) { }
  async onModuleInit(): Promise<void> {
    await createConnection({
      type: 'mysql',
      host: this.config.get('DATABASE_HOST'),
      port: Number(this.config.get('DATABASE_PORT')),
      username: this.config.get('DATABASE_USER'),
      password: this.config.get('DATABASE_PASSWORD'),
      database: this.config.get('DATABASE_NAME'),
      synchronize: false,
      logging: false,
      entities: [Users],
    })
      .then((connectionEstablished) => {
        this.logger.log(
          `DB Connection created: ${connectionEstablished.isConnected}`,
        );
      })
      .catch((err) => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
