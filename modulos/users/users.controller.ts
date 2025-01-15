import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { UserDto } from './dto/user-dto';
import { UsersService } from './users.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { request } from 'http';

@Controller('api/usuarios')
@ApiTags('Usuarios')
export class UsersController {
    constructor(private userService: UsersService) { }

    //implementación del metodo Post
    @Post('/register')
    @ApiOperation({
        description: 'Crea un usuario.'
    })
    @ApiBody({
        description: 'Crea un usuario, mediante un UserDto. Devuelve true si se realiza con exito.',
        type: UserDto,
        examples: {
            ejemplo1: {
                value: {
                    "name": "Gabriel",
                    "email": "email@gmail.com",
                    "password": "password123",
                }
            }
        }
    })
    createUser(@Body() user: UserDto) {
        return this.userService.createUser(user);
    }

    @Post('/login')
    @ApiOperation({
        description: 'Loguea un usuario.'
    })
    @ApiBody({
        description: 'Loguea un usuario, mediante un UserDto. Devuelve true si se realiza con exito.',
        type: UserDto,
        examples: {
            ejemplo1: {
                value: {
                    "email": "email@gmail.com",
                    "password": "password123",
                }
            }
        }
    })
    login(@Body() user: UserDto) {
        const { email, password } = user;
        return this.userService.loginUser(email, password);
    }

    @Post('refresh')
    @ApiOperation({
        description: 'Actualiza el token de un usuario.'
    })
    @ApiBody({
        description: 'Actualiza el token de un usuario, mediante la request.',
        type: UserDto,
        examples: {
            ejemplo1: {
                value: {
                    "refresh_token": "refresh_token",
                }
            }
        }
    })
    refreshToken(@Req() request: Request) {
        const [type, token] = request.headers['authorization']?.split(' ') || [];
        return this.userService.refreshToken(token);
    }

    //implementación del metodo Get
    @Get()
    @ApiOperation({
        description: 'Devuelve todos los usuarios.'
    })
    getUsers() {
        return this.userService.getUsers();
    }

    //implementación del metodo Put
    @Put()
    @ApiOperation({
        description: 'Actualiza un usuario en el caso de que exista el id, en caso contrario, nos creará un nuevo usuario. Devuelve true si se realiza con exito.'
    })
    @ApiBody({
        description: 'Edita un usuario usando un UserDto',
        type: UserDto,
        examples: {
            ejemplo1: {
                value: {
                    "id": 1,
                    "name": "Gabriel",
                    "email": "email@gmail.com",
                    "password": "password123",
                }
            }
        }
    })
    updateUser(@Body() user: UserDto) {
        return this.userService.updateUser(user);
    }

    //implementación del metodo Delete
    @Delete('/:idUser')
    @ApiParam({
        name: 'idUser',
        type: Number,
        description: 'Id del usuario a borrar'
    })
    @ApiOperation({
        description: 'Elimina un usuario en el caso de que exista el id. Devuelve true si se realiza con exito.'
    })
    deleteUser(@Param('idUser') idUser: number) {
        return this.userService.deleteUser(idUser);
    }

}