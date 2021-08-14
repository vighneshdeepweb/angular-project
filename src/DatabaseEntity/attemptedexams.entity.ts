import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm'

@Entity()
export class attemptedexams {

    @PrimaryGeneratedColumn()
    AttemptedExamId: number;

    @Column()
    ExamGroupId: number;

    @Column()
    ExamId: number;

    @Column()
    UserId: number;

    @Column()
    TotalQuestions: number;

    @Column()
    NotAttemptedQuestions: number;

    @Column()
    AttemptedQuestions: number;

    @Column()
    MarksObtained: number;

    @Column()
    Percentage: number;

    @Column()
    Result: boolean;

    @Column({ type: 'datetime' })
    ExamDate: Date;

    @Column()
    ExamStatusId: number;
}