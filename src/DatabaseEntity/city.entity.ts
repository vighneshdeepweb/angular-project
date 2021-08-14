import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class City {

    @PrimaryGeneratedColumn()
    CityId: number;

    @Column()
    StateId: number;

    @Column()
    CountryId: number;

    @Column()
    CityName: string;

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