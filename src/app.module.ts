import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TareasModule } from 'modulos/tareas/tareas.module';
import { UsersModule } from 'modulos/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "root",
      "password": "G4br13l*",
      "database": "crud",
      "entities": ["dist/**/*.entity{.ts,.js}"],
      "synchronize": true
    }),
    UsersModule,
    TareasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
