import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { CustomersService } from './services/customers/customers.service';
import { UsersController } from './controllers/users/users.controller';
import { CustomersController } from './controllers/customers/customers.controller';

@Module({
  providers: [UsersService, CustomersService],
  controllers: [UsersController, CustomersController]
})
export class UsersModule {}
