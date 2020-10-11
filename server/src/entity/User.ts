import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import { Image } from "./Image";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: null})
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({  default: null, name: 'updated_at' })
    updatedAt!: Date;

    @OneToMany(
        (type) => Image,
        (image) => image.user,
      )
      images!: Image[];

}
