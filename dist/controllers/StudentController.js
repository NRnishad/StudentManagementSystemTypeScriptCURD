"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
class StudentController {
    constructor(dbService) {
        this.dbService = dbService;
    }
    getAllStudents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const students = yield this.dbService.getAllStudents();
                res.render('index', { students, error: null });
            }
            catch (error) {
                res.render('index', {
                    students: [],
                    error: 'Failed to fetch students'
                });
            }
        });
    }
    createStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const student = {
                    name: req.body.name,
                    age: parseInt(req.body.age),
                    grade: req.body.grade
                };
                yield this.dbService.createStudent(student);
                res.redirect('/students');
            }
            catch (error) {
                res.render('index', {
                    students: [],
                    error: 'Failed to create student'
                });
            }
        });
    }
    updateStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const student = {
                    name: req.body.name,
                    age: parseInt(req.body.age),
                    grade: req.body.grade
                };
                const updated = yield this.dbService.updateStudent(id, student);
                if (!updated) {
                    res.render('students/index', {
                        students: yield this.dbService.getAllStudents(),
                        error: 'Student not found'
                    });
                    return;
                }
                res.redirect('/students');
            }
            catch (error) {
                const students = yield this.dbService.getAllStudents();
                res.render('students/index', {
                    students,
                    error: 'Failed to update student'
                });
            }
        });
    }
    deleteStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const deleted = yield this.dbService.deleteStudent(id);
                if (deleted) {
                    res.redirect('/students');
                }
                else {
                    res.status(404).send('Student not found');
                }
            }
            catch (error) {
                res.status(500).send('Failed to delete student');
            }
        });
    }
}
exports.StudentController = StudentController;
