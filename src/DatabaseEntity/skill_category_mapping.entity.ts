import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class skill_category_mapping {

    @PrimaryGeneratedColumn()
    mapping_id: number;

    @Column()
    SkillId: number;

    @Column()
    CategoryId: number;

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