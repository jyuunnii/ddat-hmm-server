import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    count: number;

    @Column()
    targetUserId: number;

    @ManyToOne(
        (type) => User,
        (user) => user.messages,
        {eager: true, nullable: false, onDelete: 'CASCADE'}
    )
    user: User;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}