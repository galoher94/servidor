import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user-dto';
import { User } from './entity/user.entity';
import { Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

type Tokens = {
  access_Token: string;
  refresh_Token: string;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) // Inyecta el repositorio de usuarios
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

 // Función para crear un nuevo usuario
  async createUser(user: UserDto) {
    try {
      // Verifica si el usuario ya existe por su email, username o cualquier campo único
      const existingUser = await this.userRepository.findOne({ where: { email: user.email } });
      if (existingUser) {
        throw new HttpException('Usuario ya existe', HttpStatus.CONFLICT); // Si el usuario ya está registrado, lanza una excepción de conflicto
      }
  
      // Crear el usuario solo si no existe
      const userEntity = this.userRepository.create(user); 
      const salt = await bcrypt.genSalt(); // Genera un salt aleatorio
      userEntity.password = await bcrypt.hash(user.password, salt); // Encripta la contraseña 
      // Guardar el usuario
      
      const newUser = await this.userRepository.save(userEntity);
      const {access_Token, refresh_Token} = await this.generateTokens(newUser);
      return {
        access_Token, 
        refresh_Token,
        newUser: this.removePassword(user),
        status: HttpStatus.CREATED,
        message: 'Usuario creado exitosamente'
      };
 
    } catch (error) {
      // Si el error no es una excepción personalizada, lanza otra para manejarlo
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error al crear el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  // Función para iniciar sesión del usuario
    async loginUser(email: string, password: string){ // Recibe el email y la contraseña como parámetros
    const user = await this.userRepository.findOne({ where: { email }}); // Busca el usuario por su email
    const isPasswordValid = await bcrypt.compare(password, user.password); // Verifica la contraseña con la encriptada
      if (!isPasswordValid) {
        throw new HttpException('Credenciales incorrectas', HttpStatus.UNAUTHORIZED); // Si las credenciales son incorrectas envia excepción
      }

      if (user && isPasswordValid) {
        const payload = { sub: user.id, email: user.email, name: user.name  }; // Crea el payload con el email del usuario
        const {access_Token, refresh_Token} = await this.generateTokens(payload);
        
        return { 
          access_Token, 
          refresh_Token,
          newUser: this.removePassword(user),
          status: HttpStatus.OK,
          message: "Inicio de sesión exitoso",
         };
      }
  }

  // Función para actualizar el token
  async refreshToken(refreshToken: string) {
    try {
      const user = this.jwtService.verify(refreshToken, { secret: "refresh_token" });
      const payload = { sub: user.sub, email: user.email, name: user.name };
      const {access_Token, refresh_Token} = await this.generateTokens(payload);
      
      return {
        access_Token,
        refresh_Token,
        status: 200,
        message: "Token actualizado"
      }
    } catch (error) {
      throw new HttpException('Refresh token invlalido', HttpStatus.UNAUTHORIZED);
    }
  }


  private async generateTokens(user): Promise<Tokens> {
    const JwtPayload = { sub: user.id, email: user.email, name: user.name };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(JwtPayload, {
        secret: process.env.SECRET_KEY,
        expiresIn: '1d'
      }), 
      this.jwtService.signAsync(JwtPayload, {
        secret: "refresh_token",
        expiresIn: '7d' 
      }),
    ])
    return {
      access_Token: accessToken,
      refresh_Token: refreshToken
    }
  }
  

  //Función para actualizar el usuario
  async updateUser(user: UserDto) {
    const userEntity = await this.userRepository.findOne({ where: { id: user.id } });
    if (userEntity) {
      userEntity.name = user.name;
      userEntity.email = user.email;
      userEntity.password = user.password;
      return await this.userRepository.save(userEntity);
    }
    return null;
  }

  //Función para obtener todos los usuarios
  async getUsers() {
    return await this.userRepository.find();  
}

//Función para eliminar el usuario por su id
  async deleteUser(idUser: number) {
    return await this.userRepository.delete(idUser);
  }

  private removePassword(user: User) {
    const { password, ...result } = user;
    return result;
  }
}