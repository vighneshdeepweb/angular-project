import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class difficulty_level {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    Level: string;

    @Column()
    Active: boolean;
}