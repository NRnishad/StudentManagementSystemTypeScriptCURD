"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const StudentController_1 = require("./controllers/StudentController");
const DatabaseService_1 = require("./services/DatabaseService");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './src/views');
const dbService = new DatabaseService_1.InMemoryDatabase();
const studentController = new StudentController_1.StudentController(dbService);
app.get('/students', (req, res) => studentController.getAllStudents(req, res));
app.post('/students', (req, res) => studentController.createStudent(req, res));
app.post('/students/:id/update', (req, res) => studentController.updateStudent(req, res));
app.post('/students/:id/delete', (req, res) => studentController.deleteStudent(req, res));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
