import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm'

@Entity()
export class useranswer {

    @PrimaryGeneratedColumn()
    UserAnswerId: number;

    @Column()
    UserId: number;

    @Column()
    ExamId: number;

    @Column()
    ExamGroupId: number;

    @Column()
    QuestionId: number;

    @Column()
    SkillId: number;

    @Column()
    Marks: number;

    @Column()
    GivenAnswerId: string;

    @Column({ type: 'datetime' })
    AttemptDateTime: Date

    @Column()
    RemainingTime: string

}