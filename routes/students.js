const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const { v4: uuid } = require('uuid')

module.exports = router

// GET STUDENTS
function getStudents() {
    const filePath = path.join('db', 'students.json')

    if (!fs.existsSync(filePath)) {
        throw new Error('File does not exist')
    }

    const fileContent = fs.readFileSync(filePath)

    const data = JSON.parse(fileContent)

    return data
}

//GET STUDENT BY ID
function getStudentById(id) {
    const students = getStudents()

    return students.find(student => student.id === id)
}

//CREATE/POST STUDENT
function createStudent(body) {
    const id = uuid()
    const interests = []

    if (body.interests) {
        if (typeof body.interests === 'string') {
            interests.push(body.interests)
        } else {
            interests.push(...body.interests)
        }
    }

    const newStudent = { 
        ...body,
        interests,
        id 
    }

    const students = getStudents()

    students.push(newStudent)
    
    const stringifiedData = JSON.stringify(students, null, 2)
    
    const filePath = path.join('db', 'students.json')
    fs.writeFileSync(filePath, stringifiedData)

    return newStudent
}

//EDIT/UPDATE STUDENT
function updateStudent(data) {
    const { id } = data

    const students = getStudents()

    const updatedStudents = students.map(student => {
        if (student.id === id) {
            const interests = []

            if (data.interests) {
                if (typeof data.interests === 'string') {
                    interests.push(data.interests)
                } else {
                    interests.push(...data.interests)
                }
            }
        
            const updatedStudent = { 
                ...data,
                interests,
            }

            return updatedStudent
        } else {
            return student
        }
         
    })

    const stringifiedData = JSON.stringify(updatedStudents, null, 2)
    
    const filePath = path.join('db', 'students.json')
    fs.writeFileSync(filePath, stringifiedData)

    return data
}

//DELETE STUDENT
function deleteStudent(id) {
    const students = getStudents().filter(student => student.id !== id)
      
    const stringifiedData = JSON.stringify(students, null, 2)
    const filePath = path.join('db', 'students.json')
    fs.writeFileSync(filePath, stringifiedData)
}

//-----------STUDENTS----------------------------

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
