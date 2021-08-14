import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class University {

    @PrimaryGeneratedColumn()
    UniversityId: number;

    @Column()
    CountryId: number;

    @Column()
    StateId: number;

    @Column()
    CityId: number;

    @Column()
    UniversityName: string;

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