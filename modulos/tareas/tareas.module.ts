import { Module } from '@nestjs/common';
import { TareasController } from './tareas.controller';
import { TareasService } from './tareas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarea } from './entity/tareas.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tarea]),
  ],
  controllers: [TareasController],
  providers: [TareasService]
})
export class TareasModule {}
