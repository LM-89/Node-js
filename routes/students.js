const express = require('express')
const router = express.Router()
const { getStudents, getStudentById, createStudent, updateStudent, deleteStudent } = require('../services/students')
const { getLanguages } = require('../services/languages')
const { getGroups } = require('../services/groups')
const { getSubjects } = require('../services/subjects')

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
    const languages = getLanguages()
    const groups = getGroups()
    const subjects = getSubjects()

    res.render('students/create-student', { languages, groups, subjects })
})

router.post('/student-created', (req, res, next) => {
    const { body } = req

    if (body.interests && !Array.isArray(body.interests)) {
      body.interests = [body.interests]
    }
    if (body.subjects && !Array.isArray(body.subjects)) {
      body.subjects = [body.subjects]
    }
    
    const createdStudent = createStudent(body)    
    res.redirect(`/students/${createdStudent.id}`)
})

router.get('/edit-student/:id', (req, res, next) => {
    const { id } = req.params

    const languages = getLanguages()
    const groups = getGroups()
    const subjects = getSubjects()
    const student = getStudentById(id)

    res.render('students/edit-student', { student, languages, groups, subjects })
})


router.post('/student-edited', (req, res, next) => {
    const { body } = req
    
    if (body.interests && !Array.isArray(body.interests)) {
      body.interests = [body.interests]
    }
    if (body.subjects && !Array.isArray(body.subjects)) {
      body.subjects = [body.subjects]
    }

    const updatedStudent = updateStudent(body)
    res.redirect(`/students/${updatedStudent.id}`)
})

router.post('/delete-student', (req, res, next) => {
    const { studentId } = req.body    
    
    deleteStudent(studentId)

    res.redirect('/students')
})