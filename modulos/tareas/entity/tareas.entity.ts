import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tarea {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({type:String, nullable :false, length: 100})
    titulo!: string;

    @Column({type: String, nullable: false, length: 255})
    descripcion!: string;

    @Column({ type: 'date', nullable: false })
    fecha!: Date;

    @Column({type: String, nullable: false, length: 50,})
    prioridad!: string;

    @Column({type: String, nullable: false, length: 50, })
    estado!: string;
} 
