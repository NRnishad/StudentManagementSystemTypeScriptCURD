import express from 'express';
import { StudentController } from './controllers/StudentController';
import { InMemoryDatabase } from './services/DatabaseService';

const app = express();
const port = 3000;


app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './src/views');


const dbService = new InMemoryDatabase();
const studentController = new StudentController(dbService);


app.get('/students', (req, res) => studentController.getAllStudents(req, res));
app.post('/students', (req, res) => studentController.createStudent(req, res));
app.post('/students/:id/update', (req, res) => studentController.updateStudent(req, res));
app.post('/students/:id/delete', (req, res) => studentController.deleteStudent(req, res));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
