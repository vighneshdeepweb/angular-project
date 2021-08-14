import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Services
import { CategoryService } from '../../Services/category/category.service';
import { SkillService } from '../../Services/skill/skill.service';
import { QuestionService } from '../../Services/question/question.service';
import { AnswerService } from '../../Services/answer/answer.service';
import { ExamService } from '../../Services/exam/exam.service';
import { StateService } from '../../Services/state/state.service';
import { CityService } from '../../Services/city/city.service';
import { UniversityService } from '../../Services/university/university.service';
import { AssignexamService } from '../../Services/assignexam/assignexam.service';
import { UseranswerService } from '../../Services/useranswer/useranswer.service';
import { AttemptedexamsService } from '../../Services/attemptedexams/attemptedexams.service';

//Controllers
import { CategoryController } from '../../Controllers/category/category.controller';
import { SkillController } from '../../Controllers/skill/skill.controller';
import { QuestionController } from '../../Controllers/question/question.controller';
import { AnswerController } from '../../Controllers/answer/answer.controller';
import { ExamController } from '../../Controllers/exam/exam.controller';
import { StateController } from '../../Controllers/state/state.controller';
import { CityController } from '../../Controllers/city/city.controller';
import { UniversityController } from '../../Controllers/university/university.controller';

//Database Models
import { Category } from '../../DatabaseEntity/category.entity';
import { Skill } from '../../DatabaseEntity/skill.entity';
import { Question } from '../../DatabaseEntity/question.entity';
import { Answer } from '../../DatabaseEntity/answer.entity';
import { Exams } from '../../DatabaseEntity/exams.entity';
import { Assignexam } from '../../DatabaseEntity/assignexam.entity';
import { State } from '../../DatabaseEntity/state.entity';
import { City } from '../../DatabaseEntity/city.entity';
import { University } from '../../DatabaseEntity/university.entity';
import { useranswer } from '../../DatabaseEntity/useranswer.entity';
import { attemptedexams } from '../../DatabaseEntity/attemptedexams.entity';
import { include_marks } from '../../DatabaseEntity/marksincludeinexam.entity';
import { difficulty_level } from '../../DatabaseEntity/difficulty_level.entity';
import { skill_category_mapping } from '../../DatabaseEntity/skill_category_mapping.entity';
import { ExamGroup } from '../../DatabaseEntity/examgroup.entity';
//JWT Authentication
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../Services/auth/constants';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        TypeOrmModule.forFeature([Category, Skill, Question, Answer, Exams, Assignexam, State, City, University, useranswer, attemptedexams, include_marks, difficulty_level, skill_category_mapping,ExamGroup]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '2700s' },
        }),
    ],
    providers: [CategoryService, SkillService, QuestionService, AnswerService, ExamService, StateService, CityService, UniversityService, AssignexamService, UseranswerService, AttemptedexamsService],
    exports: [PassportModule],
    controllers: [CategoryController, SkillController, QuestionController, AnswerController, ExamController, StateController, CityController, UniversityController]
})
export class AdminModule { }
