import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Assignexam {

    @PrimaryGeneratedColumn()
    AssignExamId: number;

    @Column()
    ExamGroupId: number;

    @Column()
    UserId: number;

    @Column()
    CreatedBy: number;

    @Column({ type: 'datetime' })
    CreatedDate: Date;

}