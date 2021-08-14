import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    CategoryId: number;

    @Column()
    CategoryName: string;

    @Column()
    Description: string;

    @Column()
    Active: boolean;

    @Column()
    CreatedBy: number;

    @Column({ type: 'datetime' })
    CreatedDate: Date;

    @Column()
    ModifiedBy: number;

    @Column({ type: 'datetime' })
    ModifiedDate: Date;
}