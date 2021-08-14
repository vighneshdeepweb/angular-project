import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from '../../DatabaseEntity/skill.entity';
import { skill_category_mapping } from '../../DatabaseEntity/skill_category_mapping.entity';
import { Skill_Category_ViewModel } from '../../Models/Skill_Category_ViewModel';
import { JsonResponse } from '../../Models/JsonResponse';
@Injectable()
export class SkillService {

    constructor(
        @InjectRepository(Skill)
        private skillRepository: Repository<Skill>,
        @InjectRepository(skill_category_mapping)
        private categoryskillRepository: Repository<skill_category_mapping>
    ) { }

    async GetAllSkills(status: number): Promise<Skill[]> {
        if (status == undefined || status == -1) {
            //SELECT s.SkillId,s.CategoryId,s.SkillName,s.Description,c.CategoryName,s.Active,s.CreatedDate,s.CreatedBy,s.ModifiedBy,s.ModifiedDate FROM Skill s LEFT JOIN category c ON s.categoryid = c.categoryid;
            return await this.skillRepository.query("select scm.CategoryId,scm.SkillId,C.CategoryName,S.SkillName,s.Description,s.Active,s.CreatedDate,s.CreatedBy,s.ModifiedBy,s.ModifiedDate from skill_category_mapping scm left join Category C on scm.CategoryId=C.CategoryId left join Skill S on scm.SkillId=S.SkillId order by S.SkillName");
        }
        else {
            return await this.skillRepository.query("select scm.CategoryId,scm.SkillId,C.CategoryName,S.SkillName,s.Description,s.Active,s.CreatedDate,s.CreatedBy,s.ModifiedBy,s.ModifiedDate from skill_category_mapping scm left join Category C on scm.CategoryId=C.CategoryId left join Skill S on scm.SkillId=S.SkillId where s.Active=" + status + " order by S.SkillName;");
        }
    }
    async CreateSkill(skill: Skill): Promise<Skill> {
        return await this.skillRepository.save(skill);
    }
    async GetSkillById(id: number): Promise<Skill> {
        return await this.skillRepository.findOne({ where: [{ SkillId: id }] });
    }
    async GetSkillByName(name: string): Promise<Skill[]> {
        return await this.skillRepository.query("select * from skill where skillname='" + name + "'");

    }
    async UpdateSkill(sc: Skill_Category_ViewModel): Promise<JsonResponse> {
        var nameExists = await this.GetSkillByName(sc.SkillName);
        console.log("name", nameExists[0].SkillId);
        console.log("cate", sc.CategoryId);
        if (nameExists != null && nameExists.length > 0) {
            var data = await this.skillRepository.query("select * from skill_category_mapping where skillid=" + nameExists[0].SkillId + " and categoryid<>" + sc.CategoryId + ";");
            console.log("data", data);
            if (data != null && data.length > 0) {
                return new JsonResponse("0", "error", "This skill name is already exists.", "", sc.SkillId.toString(), null);
            }
            else {

                // var query = "update skill set skillname='" + sc.SkillName + "',Description='" + sc.Description + "',Active=" + sc.Active + ",ModifiedBy=" + sc.ModifiedBy + ",ModifiedDate='" + sc.ModifiedDate + "' where skillid=" + sc.SkillId + ";";
                // console.log("query", query);

                // await this.skillRepository.query("update skill set skillname='" + sc.SkillName + "',Description='" + sc.Description + "',Active=" + sc.Active + ",ModifiedBy=" + sc.ModifiedBy + ",ModifiedDate='" + sc.ModifiedDate + "' where skillid=" + sc.SkillId + ";");
                // return new JsonResponse("200", "success", "Skill updated successfully.", "", sc.SkillId.toString(), null);
            }
        }
        else {
            await this.skillRepository.query("update skill set skillname='" + sc.SkillName + "',Description='" + sc.Description + "',Active=" + sc.Active + ",ModifiedBy=" + sc.ModifiedBy + " where skillid=" + sc.SkillId + ";");
            return new JsonResponse("200", "success", "Skill updated successfully.", "", sc.SkillId.toString(), null);
        }
        //  this.skillRepository.query("update skill_category_mapping set SkillId=" + skillcategory.SkillId + ",CategoryId=" + skillcategory.CategoryId + "")
    }
    async DeleteSkill(skillid, categoryid): Promise<DeleteResult> {

        /* Check if skill is available or not expect this category  */
        var data = await this.skillRepository.query("select * from skill_category_mapping where skillid=" + skillid + " and categoryid<>" + categoryid + ";");
        if (data != null && data.length > 0) {
            await this.skillRepository.query("delete from skill_category_mapping where skillid=" + skillid + " and categoryid=" + categoryid + "")
        }
        else {
            await this.skillRepository.query("delete from skill_category_mapping where skillid=" + skillid + " and categoryid=" + categoryid + "")
            return await this.skillRepository.delete(skillid);
        }
    }

    async GetSkillsByCategoryId(categoryId, skillid): Promise<skill_category_mapping[]> {
        //return await this.skillRepository.query("select * from skill_category_mapping where categoryid= " + categoryId + " and skillid=" + skillid + "")
        var query = "select scm.CategoryId,scm.SkillId,C.CategoryName,S.SkillName,s.Description,";
        query += "s.Active,s.CreatedDate,s.CreatedBy,s.ModifiedBy,s.ModifiedDate from skill_category_mapping scm ";
        query += "left join Category C on scm.CategoryId=C.CategoryId left join Skill S on scm.SkillId=S.SkillId";
        query += " where scm.categoryid= " + categoryId + "";
        if (skillid > 0)
            query += " and scm.skillid=" + skillid + "";
        //console.log(query);
        return await this.skillRepository.query(query);
    }
    async GetSkillsByCategoryIds(categoryId): Promise<skill_category_mapping[]> {
        //return await this.skillRepository.query("select * from skill_category_mapping where categoryid= " + categoryId + " and skillid=" + skillid + "")
        var query = "select scm.CategoryId,scm.SkillId,C.CategoryName,S.SkillName,s.Description,";
        query += "s.Active,s.CreatedDate,s.CreatedBy,s.ModifiedBy,s.ModifiedDate from skill_category_mapping scm ";
        query += "left join Category C on scm.CategoryId=C.CategoryId left join Skill S on scm.SkillId=S.SkillId";
        query += " where scm.categoryid in (" + categoryId + ")";

        return await this.skillRepository.query(query);
    }

    async SaveSkillCategoryMapping(catskillmapping: skill_category_mapping): Promise<skill_category_mapping> {
        return await this.categoryskillRepository.save(catskillmapping);
    }

}
