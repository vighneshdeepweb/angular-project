import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Skill {

    @PrimaryGeneratedColumn()
    SkillId: number;

    @Column()
    SkillName: string;

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