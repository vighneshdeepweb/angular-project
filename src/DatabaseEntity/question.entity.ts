import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm'

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    QuestionId: number;

    @Column()
    CategoryId: number;

    @Column()
    SkillId: number;

    @Column()
    QuestionText: string;

    @Column()
    Marks: number;

    @Column()
    QuestionType: string;

    @Column()
    TotalOptions: string;

    @Column()
    IsMultiAnswer: string;

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
    DifficultyLevelID:number;
    
}