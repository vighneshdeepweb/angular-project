import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExamGroup {

    @PrimaryGeneratedColumn()
    ExamGroupId: number;
    
    @Column()
    ExamId: number;

    @Column({ type: 'datetime' })
    ExamDate: Date;

    @Column({ type: 'datetime' })
    CreatedDate: Date;

}