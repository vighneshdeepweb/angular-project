import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Exclusion } from 'typeorm';

@Entity()
export class Exams {
    @PrimaryGeneratedColumn()
    ExamId: number;

    @Column()
    Title: string;

    @Column()
    Description: string;

    @Column()
    CategoryId: string;

    @Column()
    SkillId: string;

    // @Column()
    // MarksInclude: string;

    // @Column()
    // MarksCount: string;

    @Column()
    QuestionIds: string;

    @Column()
    Duration: number;

    @Column()
    TotalMarks: number;

    @Column()
    PassMarks: number;

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

    @Column()
    HardPercentage: number;

    @Column()
    MediumPercentage: number;

    @Column()
    EasyPercentage: number;






}