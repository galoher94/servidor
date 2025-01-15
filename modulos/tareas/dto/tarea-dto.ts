import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class TareaDto {
    
    @ApiProperty({
            name: 'id',
            type: Number,
            description: 'Identificador de la tarea',
            required: true
        })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    id?: number;

    @ApiProperty({
        name: 'titulo',
        type: String,
        description: 'Titulo de la tarea',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    titulo!: string;

    @ApiProperty({
        name: 'descripcion',
        type: String,
        description: 'Descripcion de la tarea',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    descripcion!: string;

    @ApiProperty({
        name: 'fecha',
        type: Date,
        description: 'Fecha límite de la tarea',
        required: true
    })

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    fecha!: Date;

    @ApiProperty({
        name: 'prioridad',
        type: String,
        description: 'Prioridad de la tarea',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    prioridad!: string;

    @ApiProperty({
        name: 'estado',
        type: String,
        description: 'Estado de la tarea',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    estado!: string;

}