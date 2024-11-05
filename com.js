// src/models/Student.ts
// export interface Student {
//     id?: number;
//     name: string;
//     age: number;
//     grade: string;
// }

// src/services/DatabaseService.ts
// import { Student } from '../models/Student';

// export interface IDatabaseService {
//     getAllStudents(): Promise<Student[]>;
//     getStudentById(id: number): Promise<Student | null>;
//     createStudent(student: Student): Promise<Student>;
//     updateStudent(id: number, student: Student): Promise<Student | null>;
//     deleteStudent(id: number): Promise<boolean>;
// }

// // In-memory database implementation
// export class InMemoryDatabase implements IDatabaseService {
//     private students: Student[] = [];
//     private currentId = 1;

//     async getAllStudents(): Promise<Student[]> {
//         // Simulate network delay
//         await new Promise(resolve => setTimeout(resolve, 100));
//         return [...this.students];
//     }

//     async getStudentById(id: number): Promise<Student | null> {
//         await new Promise(resolve => setTimeout(resolve, 100));
//         const student = this.students.find(s => s.id === id);
//         return student || null;
//     }

//     async createStudent(student: Student): Promise<Student> {
//         await new Promise(resolve => setTimeout(resolve, 100));
//         const newStudent = { ...student, id: this.currentId++ };
//         this.students.push(newStudent);
//         return newStudent;
//     }

//     async updateStudent(id: number, student: Student): Promise<Student | null> {
//         await new Promise(resolve => setTimeout(resolve, 100));
//         const index = this.students.findIndex(s => s.id === id);
//         if (index === -1) return null;
        
//         this.students[index] = { ...student, id };
//         return this.students[index];
//     }

//     async deleteStudent(id: number): Promise<boolean> {
//         await new Promise(resolve => setTimeout(resolve, 100));
//         const index = this.students.findIndex(s => s.id === id);
//         if (index === -1) return false;
        
//         this.students.splice(index, 1);
//         return true;
//     }
// }

// src/controllers/StudentController.ts
// import { Request, Response } from 'express';
// import { Student } from '../models/Student';
// import { IDatabaseService } from '../services/DatabaseService';

// export class StudentController {
//     constructor(private dbService: IDatabaseService) {}

//     async getAllStudents(req: Request, res: Response): Promise<void> {
//         try {
//             const students = await this.dbService.getAllStudents();
//             res.render('students/index', { students, error: null });
//         } catch (error) {
//             res.render('students/index', { 
//                 students: [], 
//                 error: 'Failed to fetch students' 
//             });
//         }
//     }

//     async createStudent(req: Request, res: Response): Promise<void> {
//         try {
//             const student: Student = {
//                 name: req.body.name,
//                 age: parseInt(req.body.age),
//                 grade: req.body.grade
//             };
//             await this.dbService.createStudent(student);
//             res.redirect('/students');
//         } catch (error) {
//             res.render('students/index', { 
//                 students: [], 
//                 error: 'Failed to create student' 
//             });
//         }
//     }

//     async updateStudent(req: Request, res: Response): Promise<void> {
//         try {
//             const id = parseInt(req.params.id);
//             const student: Student = {
//                 name: req.body.name,
//                 age: parseInt(req.body.age),
//                 grade: req.body.grade
//             };
//             const updated = await this.dbService.updateStudent(id, student);
//             if (updated) {
//                 res.redirect('/students');
//             } else {
//                 res.status(404).send('Student not found');
//             }
//         } catch (error) {
//             res.status(500).send('Failed to update student');
//         }
//     }

//     async deleteStudent(req: Request, res: Response): Promise<void> {
//         try {
//             const id = parseInt(req.params.id);
//             const deleted = await this.dbService.deleteStudent(id);
//             if (deleted) {
//                 res.redirect('/students');
//             } else {
//                 res.status(404).send('Student not found');
//             }
//         } catch (error) {
//             res.status(500).send('Failed to delete student');
//         }
//     }
// }

// src/app.ts
// import express from 'express';
// import { StudentController } from './controllers/StudentController';
// import { InMemoryDatabase } from './services/DatabaseService';

// const app = express();
// const port = 3000;

// // Middleware
// app.use(express.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');
// app.set('views', './src/views');

// // Dependency Injection
// const dbService = new InMemoryDatabase();
// const studentController = new StudentController(dbService);

// // Routes
// app.get('/students', (req, res) => studentController.getAllStudents(req, res));
// app.post('/students', (req, res) => studentController.createStudent(req, res));
// app.post('/students/:id/update', (req, res) => studentController.updateStudent(req, res));
// app.post('/students/:id/delete', (req, res) => studentController.deleteStudent(req, res));

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });

// src/views/students/index.ejs
// <!DOCTYPE html>
// <html>
// <head>
//     <title>Student Management System</title>
//     <style>
//         .error { color: red; }
//         table { border-collapse: collapse; width: 100%; }
//         th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
//         form { margin: 20px 0; }
//     </style>
// </head>
// <body>
//     <h1>Student Management System</h1>
    
//     <% if (error) { %>
//         <div class="error"><%= error %></div>
//     <% } %>

//     <h2>Add New Student</h2>
//     <form action="/students" method="POST">
//         <div>
//             <label>Name: <input type="text" name="name" required></label>
//         </div>
//         <div>
//             <label>Age: <input type="number" name="age" required></label>
//         </div>
//         <div>
//             <label>Grade: <input type="text" name="grade" required></label>
//         </div>
//         <button type="submit">Add Student</button>
//     </form>

//     <h2>Students List</h2>
//     <table>
//         <thead>
//             <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Age</th>
//                 <th>Grade</th>
//                 <th>Actions</th>
//             </tr>
//         </thead>
//         <tbody>
//             <% students.forEach(function(student) { %>
//                 <tr>
//                     <td><%= student.id %></td>
//                     <td><%= student.name %></td>
//                     <td><%= student.age %></td>
//                     <td><%= student.grade %></td>
//                     <td>
//                         <form action="/students/<%= student.id %>/delete" method="POST" style="display: inline;">
//                             <button type="submit">Delete</button>
//                         </form>
//                     </td>
//                 </tr>
//             <% }); %>
//         </tbody>
//     </table>
// </body>
// </html>