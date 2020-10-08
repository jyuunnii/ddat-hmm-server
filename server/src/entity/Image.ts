import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filePath!: string;

    @Column()
    fileName!: string;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @ManyToOne(
        (type) => User,
        (user) => user.images, { nullable: false, onDelete: 'CASCADE' }
      )
      user!: User;
  
}