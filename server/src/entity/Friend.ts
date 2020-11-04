import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Friend {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    followerId: number;

    @ManyToOne(
        (type) => User,
        (user) => user.friends
    )
    followed: User;

    @CreateDateColumn({ name: 'created_at', select: false })
    createdAt!: Date;
}