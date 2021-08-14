import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Answer {

    @PrimaryGeneratedColumn()
    AnswerId: number;

    @Column()
    QuestionId: number;

    @Column()
    AnswerText: string;

    @Column()
    IsRightAnswer: boolean;
}