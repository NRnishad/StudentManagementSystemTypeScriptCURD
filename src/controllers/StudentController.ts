import { Request, Response } from 'express';
import { Student } from '../models/Student';
import { IDatabaseService } from '../services/DatabaseService';

export class StudentController {
    constructor(private dbService: IDatabaseService) {}

    async getAllStudents(req: Request, res: Response): Promise<void> {
        try {
            const students = await this.dbService.getAllStudents();
            res.render('index', { students, error: null });
        } catch (error) {
            res.render('index', { 
                students: [], 
                error: 'Failed to fetch students' 
            });
        }
    }

    async createStudent(req: Request, res: Response): Promise<void> {
        try {
            const student: Student = {
                name: req.body.name,
                age: parseInt(req.body.age),
                grade: req.body.grade
            };
            await this.dbService.createStudent(student);
            res.redirect('/students');
        } catch (error) {
            res.render('index', { 
                students: [], 
                error: 'Failed to create student' 
            });
        }
    }

    async updateStudent(req: Request, res: Response): Promise<void> {
    try {
        const id = parseInt(req.params.id);
        const student: Student = {
            name: req.body.name,
            age: parseInt(req.body.age),
            grade: req.body.grade
        };
        
        const updated = await this.dbService.updateStudent(id, student);
        
        if (!updated) {
            res.render('students/index', { 
                students: await this.dbService.getAllStudents(),
                error: 'Student not found'
            });
            return;
        }
        
        res.redirect('/students');
    } catch (error) {
        const students = await this.dbService.getAllStudents();
        res.render('students/index', { 
            students,
            error: 'Failed to update student'
        });
    }
}

    async deleteStudent(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const deleted = await this.dbService.deleteStudent(id);
            if (deleted) {
                res.redirect('/students');
            } else {
                res.status(404).send('Student not found');
            }
        } catch (error) {
            res.status(500).send('Failed to delete student');
        }
    }
}