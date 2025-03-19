const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const { v4: uuid } = require('uuid')

module.exports = router 

// GET SUBJECTS
function getSubjects() {
    const filePath = path.join('db', 'subjects.json')

    if (!fs.existsSync(filePath)) {
        throw new Error('File does not exist')
    }

    const fileContent = fs.readFileSync(filePath)

    const data = JSON.parse(fileContent)

    return data
}

// GET LECTURERS
function getLecturers() {
    const filePath = path.join('db', 'lecturers.json')

    if (!fs.existsSync(filePath)) {
        throw new Error('File does not exist')
    }

    const fileContent = fs.readFileSync(filePath)

    const data = JSON.parse(fileContent)

    return data
}

//GET SUBJECT BY ID
function getSubjectById(id) {
    const subjects = getSubjects()

    return subjects.find(subject => subject.id === id)
}

//CREATE/POST SUBJECT
function createSubject(body) {
    const id = uuid()
    
    const newSubject = { 
        ...body,
        id 
    }

    const subjects = getSubjects()

    subjects.push(newSubject)
    
    const stringifiedData = JSON.stringify(subjects, null, 2)
    
    const filePath = path.join('db', 'subjects.json')
    fs.writeFileSync(filePath, stringifiedData)

    return newSubject
}

//EDIT/UPDATE SUBJECT
function updateSubject(data) {
    const { id } = data

    const subjects = getSubjects()

    const updatedSubjects = subjects.map(subject => subject.id === id ? { ...subject, ...data } : subject)

    const stringifiedData = JSON.stringify(updatedSubjects, null, 2)
    
    const filePath = path.join('db', 'subjects.json')
    fs.writeFileSync(filePath, stringifiedData)

    return data
}

//DELETE SUBJECT
function deleteSubject(id) {
    const subjects = getSubjects().filter(subject => subject.id !== id)
      
    const stringifiedData = JSON.stringify(subjects, null, 2)
    const filePath = path.join('db', 'subjects.json')
    fs.writeFileSync(filePath, stringifiedData)
}

// //-----------------SUBJECTS---------------------

router.get('/subjects', (req, res, next) => {
    const subjects = getSubjects()
    res.render('subjects/subjects', { subjects })   
})

router.get('/subjects/:id', (req, res, next) => {
    const { id } = req.params
    const subject = getSubjectById(id)

    if (!subject) {
        return res.status(404).send("Subject not found")
    }

    const lecturers = getLecturers()
    const subjectLecturers = lecturers.filter(lecturer =>
        lecturer.subjects.some(subj => subj.toLowerCase() === subject.name.toLowerCase())
    )

    res.render('subjects/subject', { subject, id, subjectLecturers })
})

router.get('/create-subject', (req, res, next) => {
    res.render('subjects/create-subject')        
})

router.post('/subject-created', (req, res, next) => {
    const { body } = req
    const createdSubject = createSubject(body)    
    
    res.redirect(`/subjects/${createdSubject.id}`)
})

router.get('/edit-subject/:id', (req, res, next) => {
    const { id } = req.params
    const subject = getSubjectById(id)

    if (subject) { 
        res.render('subjects/edit-subject', { subject })       
    } else {
        res.redirect('/subjects')
    }       
})

router.post('/subject-edited', (req, res, next) => {
    const { body } = req

    const updatedSubject = updateSubject(body)

    res.redirect(`/subjects/${updatedSubject.id}`)
})

router.post('/delete-subject', (req, res, next) => {
    const { subjectId } = req.body

    deleteSubject(subjectId)

    res.redirect('/subjects')
})