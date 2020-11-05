import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Friend {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        (type) => User,
        (user) => user.following
    )
    user: User;

    @ManyToOne(
        (type) => User,
        (user) => user.id
    )
    followingId : number;

    @CreateDateColumn({ name: 'created_at', select: false })
    createdAt!: Date;
}