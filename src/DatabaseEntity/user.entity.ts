import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    UserId: number;

    @Column()
    RoleId: number;

    @Column()
    FirstName: string;

    @Column()
    LastName: string;

    @Column()
    Email: string;

    @Column()
    Password: string;

    @Column()
    CountryId: number;

    @Column()
    StateId: number;

    @Column()
    CityId: number;

    @Column()
    UniversityId: number;

    @Column()
    Active: boolean;

    @Column({ type: 'datetime' })
    CreatedDate: Date;

    @Column()
    MobileNo: string;

    @Column()
    HomeTown: string;

    @Column()
    PercentageIn10th: string;

    @Column()
    PercentageIn12th: string;

    @Column()
    PercentageInGraduation: string;

    @Column()
    PercentageInPG: string;
    
    @Column()
    InterestedSkills: string;
    // @CreateDateColumn({ type: 'datetime' })
    // ModifiedDate: Date;

}