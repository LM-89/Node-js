const express = require('express')
const router = express.Router()
const { getLanguages, getLanguageById, createLanguage, updateLanguage, deleteLanguage } = require('../services/languages')
const { getStudents } = require('../services/students')

module.exports = router 


router.get('/languages', (req, res, next) => {
    const languages = getLanguages()
    res.render('languages/languages', { languages })
})

router.get('/languages/:id', (req, res, next) => {
    const { id } = req.params
    const language = getLanguageById(id)
    const students = getStudents()
    const languageStudents = students.filter(student => student.language === language.name)    

    res.render('languages/language', { language, id, languageStudents })
})

router.get('/create-language', (req, res, next) => {
    res.render('languages/create-language')
})

router.post('/language-created', (req, res, next) => {
    const { body } = req
    const createdLanguage = createLanguage(body)    
    
    res.redirect(`/languages/${createdLanguage.id}`)
})

router.get('/edit-language/:id', (req, res, next) => {
    const { id } = req.params
    const language = getLanguageById(id)

    if (language) { 
        res.render('languages/edit-language', { language })       
    } else {
        res.redirect('/languages')
    }
})

router.post('/language-edited', (req, res, next) => {
    const { body } = req

    const updatedLanguage = updateLanguage(body)

    res.redirect(`/languages/${updatedLanguage.id}`)
})

router.post('/delete-language', (req, res, next) => {
    const { languageId } = req.body

    deleteLanguage(languageId)

    res.redirect('/languages')
})