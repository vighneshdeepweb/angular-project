import { Controller, Post, Get, Body, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { Category } from '../../DatabaseEntity/category.entity';
import { CategoryService } from '../../Services/category/category.service';
import { JsonResponse } from '../../Models/JsonResponse';
import { AuthGuard } from '@nestjs/passport';



@Controller('category')
export class CategoryController {

    constructor(private categoryService: CategoryService) { }
    result: any;

    //@UseGuards(AuthGuard('jwt'))
    @Get('getcategorylist')
    async GetAllCategory(@Query('status') status): Promise<Category[]> {
        return await this.categoryService.GetAllCategory(status);
    }
    @Get('getcategorywithquecount')
    async GetCategoryWithQueCount(): Promise<Category[]> {
        return await this.categoryService.GetCategoryWithQueCount();
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('createcategory')
    async CreateCategory(@Body() category: Category): Promise<JsonResponse> {
        this.result = await this.categoryService.CreateCategory(category);
        if (this.result.CategoryId > 0) {
            return new JsonResponse("200", "success", "Category created successfully.", "", this.result.CategoryId, this.result);
        }
        else {
            return new JsonResponse("0", "error", "Category not created.", "", "", null);
        }
    }
    @UseGuards(AuthGuard('jwt'))
    @Get(':id/getcategorybyid')
    async GetCategoryById(@Param('id') id): Promise<Category> {
        return await this.categoryService.GetCategoryById(id);
    }
    @UseGuards(AuthGuard('jwt'))
    @Put(':id/updatecategory')
    async update(@Param('id') id, @Body() categoryData: Category): Promise<JsonResponse> {
        this.result = this.categoryService.UpdateCategory(categoryData);
        return new JsonResponse("200", "success", "Category updated successfully.", "", this.result.CategoryId, null);

    }
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id/deletecategory')
    async delete(@Param('id') id): Promise<JsonResponse> {
        this.result = this.categoryService.DeleteCategory(id);
        return new JsonResponse("200", "success", "Category deleted successfully.", "", this.result.CategoryId, null);
    }
}
