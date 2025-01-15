import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({type:String, length: 50})
    name?: string;

    @Column({type: String, nullable: false, unique: true, length: 255})
    email!: string;

    @Column({type: String, nullable: false, length: 150})
    password!: string;

} 
