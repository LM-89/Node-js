const express = require('express')
const router = express.Router()
const { getSubjects, getSubjectById, createSubject, updateSubject, deleteSubject } = require('../services/subjects')
const { getLecturers } = require('../services/lecturers')

module.exports = router 


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