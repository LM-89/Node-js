const express = require('express')
const router = express.Router()
const { getStudents, getStudentById, createStudent, updateStudent, deleteStudent } = require('../services/students')

module.exports = router


router.get('/students', (req, res, next) => {    
    const students = getStudents()
    res.render('students/students', { students })    
})

router.get('/students/:id', (req, res, next) => {
    const { id } = req.params

    const student = getStudentById(id)

    res.render('students/student', { student, id })
})

router.get('/create-student', (req, res, next) => {
    res.render('students/create-student')
})

router.post('/student-created', (req, res, next) => {
    const { body } = req
    const createdStudent = createStudent(body)    
    
    res.redirect(`/students/${createdStudent.id}`)
})

router.get('/edit-student/:id', (req, res, next) => {
    const { id } = req.params

    const student = getStudentById(id)

    res.render('students/edit-student', { student })
})

router.post('/student-edited', (req, res, next) => {
    const { body } = req
    const updatedStudent = updateStudent(body)

    res.redirect(`/students/${updatedStudent.id}`)
})

router.post('/delete-student', (req, res, next) => {
    const { studentId } = req.body    
    
    deleteStudent(studentId)

    res.redirect('/students')
})