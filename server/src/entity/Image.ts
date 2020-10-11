import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: null})
    filePath!: string;

    @Column({default: null})
    fileName!: string;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
  
    @UpdateDateColumn({ default: null, name: 'updated_at' })
    updatedAt!: Date;

    @ManyToOne(
        (type) => User,
        (user) => user.images, { nullable: false, onDelete: 'CASCADE' }
      )
      user!: User;
  
}