const express = require('express')
const router = express.Router()
const { getLecturers, getLecturerById, createLecturer, updateLecturer, deleteLecturer } = require('../services/lecturers')
const { getLanguages } = require('../services/languages')

module.exports = router 


router.get('/lecturers', (req, res, next) => {
    const lecturers = getLecturers()
    
    res.render('lecturers/lecturers', { lecturers })   
})

router.get('/lecturers/:id', (req, res, next) => {
    const { id } = req.params

    const lecturer = getLecturerById(id)
    
    if (lecturer) {

        res.render('lecturers/lecturer', { lecturer, id })

    } else {
        res.send(`
            <h1>Lecturer Not Found</h1>
            <a href="/lecturers">Back to List</a>        
        `)
    }
})

router.get('/create-lecturer', (req, res, next) => {
    const languages = getLanguages()
    res.render('lecturers/create-lecturer', { languages })
})

router.post('/lecturer-created', (req, res, next) => {
    const { body } = req
    const createdLecturer = createLecturer(body)    
    
    res.redirect(`/lecturers/${createdLecturer.id}`)
})

router.get('/edit-lecturer/:id', (req, res, next) => {
    const { id } = req.params

    const lecturer = getLecturerById(id) 
    const languages = getLanguages()   

    if (lecturer) {
        res.render('lecturers/edit-lecturer', { lecturer, languages })              
    } else {
        res.redirect('/lecturers')
    }
})

router.post('/lecturer-edited', (req, res, next) => {
    const { body } = req
    const updatedLecturer = updateLecturer(body)

    res.redirect(`/lecturers/${updatedLecturer.id}`)
})

router.post('/delete-lecturer', (req, res, next) => {
    const { lecturerId } = req.body

    deleteLecturer(lecturerId)

    res.redirect('/lecturers')
})