import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

const API_KEY = '123332';
const API_KEY_PROD = 'PROD12323343';

@Module({
  imports: [HttpModule, ProductsModule, UsersModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const task = await firstValueFrom(
          http.get('https://jsonplaceholder.typicode.com/todos'),
        );
        return task.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
