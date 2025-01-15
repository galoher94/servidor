import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UserDto {
    @ApiProperty({
        name: 'id',
        type: Number,
        description: 'Identificador del usuario',
        required: false,
    })
    @IsNumber()
    @IsOptional() // Cambiar a opcional para alinear con la descripción
    id?: number;

    @ApiProperty({
        name: 'name',
        type: String,
        description: 'Nombre del usuario',
        required: false,
    })
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty({
        name: 'email',
        type: String,
        uniqueItems: true,
        description: 'Email del usuario',
        required: true,
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        name: 'password',
        type: String,
        description: 'Contraseña del usuario',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}