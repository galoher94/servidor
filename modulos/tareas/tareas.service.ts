import { Injectable } from '@nestjs/common';
import { TareaDto } from './dto/tarea-dto';
import { Tarea } from './entity/tareas.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TareasService {
    constructor(
        @InjectRepository(Tarea)
        private readonly tareaRepository: Repository<Tarea>
    ) {

    }

    async createTarea(tarea: TareaDto) {
        const tareaEntity = this.tareaRepository.create(tarea);
        return await this.tareaRepository.save(tarea)
    }
    
    async findAllTareas() {
        return await this.tareaRepository.find();
    }
    
     async findTarea(id: number) {
        return await this.tareaRepository.findOne({ where: { id } })
    }

    async updateTarea(tarea: TareaDto) {
        return await this.tareaRepository.update(tarea.id, tarea);
    }

    async deleteTarea(idTarea: number) {
        return await this.tareaRepository.delete(idTarea);
    }
}