import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TareasService } from './tareas.service';
import { TareaDto } from './dto/tarea-dto';
import { ParseDatePipe } from 'pipes/parse-date/parse-date.pipe';

@Controller('api/tareas')
@ApiTags('Tareas')
export class TareasController {

    constructor(private tareaService: TareasService) { }

    @Post()
    @ApiOperation({
        description: 'Crea una nueva tarea'
    })
    @ApiBody({
        description: 'Crea una nueva tarea, deiante una TareaDto',
        type: TareaDto,
        examples: {
            tarea: {
                value: {
                    titulo: 'Conexión a la base de datos',
                    descripcion: 'Conectar con la base de datos de MySQL del servidor y en el frontend',
                    fecha: "2025-01-19",
                    prioridad: 'Alta',
                    estado: 'Pendiente'
                }
            }
        }
    })

    @ApiResponse({
        status: 201,
        description: 'La tarea fue creada con éxito.'
    })
    @ApiResponse({
        status: 400,
        description: 'Solicitud incorrecta (Bad Request).'
    })

    createTarea(@Body('fecha', ParseDatePipe) fecha: Date, @Body() tarea: TareaDto) {
        // Asignamos la fecha transformada al DTO
        tarea.fecha = fecha;
        // Pasamos el DTO al servicio
        return this.tareaService.createTarea(tarea);
    }

    // Recupera todas las tareas
    @Get()
    @ApiOperation({
        description: 'Devuelve todas las tareas de la base de datos'
    })
    @ApiResponse({
        status: 200,
        description: 'Tareas recuperadas con éxito.',
        type: [TareaDto]
      })
      @ApiResponse({
        status: 204,
        description: 'No hay tareas para mostrar.'
      })
    getTareas() {
        return this.tareaService.findAllTareas();
    }

    // Recupera una tarea por su id
    @Get('/:id')
    @ApiOperation({
        description: 'Devuelve una tarea por su id'
    })
    @ApiResponse({
        status: 200,
        description: 'Tarea recuperada con éxito.',
        type: TareaDto
      })
      @ApiResponse({
        status: 404,
        description: 'Tarea no encontrada.'
      })
    getTareaById(@Param("id") id: number) {
        return this.tareaService.findTarea(id);
    }

    // Actualiza una tarea
    @Put('/:id')  // Acepta el parámetro 'id' en la URL
    @ApiOperation({
        description: 'Actualiza una tarea en el caso de que exista el id, en caso contrario, nos creará un nuevo usuario. Devuelve true si se realiza con éxito.'
    })
    @ApiBody({
        description: 'Edita una tarea usando un TareaDto',
        type: TareaDto,
        examples: {
            ejemplo1: {
                value: {
                    id: 1,
                    titulo: 'Conexión a la base de datos',
                    descripcion: 'Conectar con la base de datos de MySQL del servidor y en el frontend',
                    fecha: "2025-01-19",
                    prioridad: 'Alta',
                    estado: 'Pendiente'
                }
            }
        }
    })
    @ApiResponse({
        status: 200,
        description: 'La tarea fue actualizada con éxito.'
      })
      @ApiResponse({
        status: 404,
        description: 'Tarea no encontrada.'
      })
    updateTarea(
        @Param('id') id: number,  // Recibe el parámetro 'id' desde la URL
        @Body('fecha', ParseDatePipe) fecha: Date,
        @Body() tarea: TareaDto
    ) {
        // Asignamos la fecha transformada al DTO
        tarea.fecha = fecha;
        // Agregamos el ID al DTO, si es necesario
        tarea.id = id;
        // Pasamos el DTO al servicio para la actualización
        return this.tareaService.updateTarea(tarea);
    }

    // Elimina una tarea por su id
    @Delete('/:idTarea')
    @ApiParam({
        name: 'idTarea',
        type: Number,
        description: 'Id de la tarea a borrar'
    })
    @ApiOperation({
        description: 'Elimina la tarea en el caso de que exista el id. Devuelve true si se realiza con exito.'
    })
    @ApiResponse({
        status: 200,
        description: 'La tarea fue eliminada con éxito.'
      })
      @ApiResponse({
        status: 404,
        description: 'Tarea no encontrada.'
      })
    deleteTarea(@Param('idTarea') idTarea: number) {
        return this.tareaService.deleteTarea(idTarea);
    }

}
