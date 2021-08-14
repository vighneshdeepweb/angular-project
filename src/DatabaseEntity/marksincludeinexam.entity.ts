import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class include_marks {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    ExamId: number;

    @Column()
    MarksNo: number;

    @Column()
    MarksCount: number;

    @Column()
    HardQuestionCount:number;

    @Column()
    MediumQuestionCount:number;

    @Column()
    EasyQuestionCount:number;


}