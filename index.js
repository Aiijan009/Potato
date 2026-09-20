const express = require('express');

const server = express();
const PORT = 9000
const HOSTNAME = 'localhost';

server.use(express.json());

const students = [
    { id: 1, name: "Janine", course: "BSIT" },
    { id: 2, name: "Ian", course: "BSCS" },
    { id: 3, name: "Gian", course: "BSIT" }
];


server.get("/", (req, res) => {
    res.send("Hello World!");

});


server.get("/students", (req, res) => {
    res.json(students);
});

server.post("/students", (req, res) => {
    const newStudent = req.body;

    students.push(newStudent);

    res.json(newStudent);
});   


server.put("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    student.name = req.body.name;
    student.course = req.body.course;

    res.json(student);
});

server.patch("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    Object.assign(student, req.body);

    res.json(student);
});

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running in ${HOSTNAME}:${PORT}`);
});