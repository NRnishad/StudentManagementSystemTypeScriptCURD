import { Student } from '../models/Student';

export interface IDatabaseService {
    getAllStudents(): Promise<Student[]>;
    getStudentById(id: number): Promise<Student | null>;
    createStudent(student: Student): Promise<Student>;
    updateStudent(id: number, student: Student): Promise<Student | null>;
    deleteStudent(id: number): Promise<boolean>;
}

export class InMemoryDatabase implements IDatabaseService {
    private students: Student[] = [];
    private currentId = 1;

    async getAllStudents(): Promise<Student[]> {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 100));
        return [...this.students];
    }

    async getStudentById(id: number): Promise<Student | null> {
        await new Promise(resolve => setTimeout(resolve, 100));
        const student = this.students.find(s => s.id === id);
        return student || null;
    }

    async createStudent(student: Student): Promise<Student> {
        await new Promise(resolve => setTimeout(resolve, 100));
        const newStudent = { ...student, id: this.currentId++ };
        this.students.push(newStudent);
        return newStudent;
    }

    async updateStudent(id: number, student: Student): Promise<Student | null> {
        await new Promise(resolve => setTimeout(resolve, 100));
        const index = this.students.findIndex(s => s.id === id);
        if (index === -1) return null;
        
        this.students[index] = { ...student, id };
        return this.students[index];
    }

    async deleteStudent(id: number): Promise<boolean> {
        await new Promise(resolve => setTimeout(resolve, 100));
        const index = this.students.findIndex(s => s.id === id);
        if (index === -1) return false;
        
        this.students.splice(index, 1);
        return true;
    }
}