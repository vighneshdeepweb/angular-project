import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Country {

    @PrimaryGeneratedColumn()
    CountryId: number;

    @Column()
    CountryName: string;

    @Column()
    Status: number;

}