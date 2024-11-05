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
exports.InMemoryDatabase = void 0;
// In-memory database
class InMemoryDatabase {
    constructor() {
        this.students = [];
        this.currentId = 1;
    }
    getAllStudents() {
        return __awaiter(this, void 0, void 0, function* () {
            // Simulate network delay
            yield new Promise(resolve => setTimeout(resolve, 100));
            return [...this.students];
        });
    }
    getStudentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise(resolve => setTimeout(resolve, 100));
            const student = this.students.find(s => s.id === id);
            return student || null;
        });
    }
    createStudent(student) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise(resolve => setTimeout(resolve, 100));
            const newStudent = Object.assign(Object.assign({}, student), { id: this.currentId++ });
            this.students.push(newStudent);
            return newStudent;
        });
    }
    updateStudent(id, student) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise(resolve => setTimeout(resolve, 100));
            const index = this.students.findIndex(s => s.id === id);
            if (index === -1)
                return null;
            this.students[index] = Object.assign(Object.assign({}, student), { id });
            return this.students[index];
        });
    }
    deleteStudent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise(resolve => setTimeout(resolve, 100));
            const index = this.students.findIndex(s => s.id === id);
            if (index === -1)
                return false;
            this.students.splice(index, 1);
            return true;
        });
    }
}
exports.InMemoryDatabase = InMemoryDatabase;
