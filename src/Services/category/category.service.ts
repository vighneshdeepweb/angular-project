import { Injectable, Param } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../DatabaseEntity/category.entity';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) { }

    async GetAllCategory(status: number): Promise<Category[]> {
        if (status == undefined || status == -1) {
            return await this.categoryRepository.find();
        }
        else {
            return await this.categoryRepository.find({ where: [{ Active: status }] });
        }
    }
    async GetCategoryWithQueCount(): Promise<Category[]> {
        var query = "select c.CategoryId,CONCAT(CategoryName,' ','(',(select count(QuestionId) from Question ";
        query += "where CategoryId=C.CategoryId),')')as CategoryName,c.Description,c.Active,C.CreatedDate ";
        query += "from category c where c.Active=1;"
        return await this.categoryRepository.query(query);
    }
    async CreateCategory(category: Category): Promise<Category> {
        return await this.categoryRepository.save(category);
    }
    async GetCategoryById(id: number): Promise<Category> {
        return await this.categoryRepository.findOne({ where: [{ CategoryId: id }] });
    }
    async UpdateCategory(category: Category): Promise<UpdateResult> {
        return await this.categoryRepository.update(category.CategoryId, category);
    }
    async DeleteCategory(id): Promise<DeleteResult> {
        return await this.categoryRepository.delete(id);
    }



}
