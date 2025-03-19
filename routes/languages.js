const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const { v4: uuid } = require('uuid')

module.exports = router 

// GET LANGUAGES
function getLanguages() {
    const filePath = path.join('db', 'languages.json')

    if (!fs.existsSync(filePath)) {
        throw new Error('File does not exist')
    }

    const fileContent = fs.readFileSync(filePath)

    const data = JSON.parse(fileContent)

    return data
}

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

//GET LANGUAGE BY ID
function getLanguageById(id) {
    const languages = getLanguages()

    return languages.find(language => language.id === id)
}

//CREATE/POST LANGUAGE
function createLanguage(body) {
    const id = uuid()
    
    const newLanguage = { 
        ...body,
        id 
    }

    const languages = getLanguages()

    languages.push(newLanguage)
    
    const stringifiedData = JSON.stringify(languages, null, 2)
    
    const filePath = path.join('db', 'languages.json')
    fs.writeFileSync(filePath, stringifiedData)

    return newLanguage
}

//EDIT/UPDATE LANGUAGE
function updateLanguage(data) {
    const { id } = data

    const languages = getLanguages()

    const updatedLanguages = languages.map(language => language.id === id ? { ...language, ...data } : language)

    const stringifiedData = JSON.stringify(updatedLanguages, null, 2)
    
    const filePath = path.join('db', 'languages.json')
    fs.writeFileSync(filePath, stringifiedData)

    return data
}

//DELETE LANGUAGE
function deleteLanguage(id) {
    const languages = getLanguages().filter(language => language.id !== id)
      
    const stringifiedData = JSON.stringify(languages, null, 2)
    const filePath = path.join('db', 'languages.json')
    fs.writeFileSync(filePath, stringifiedData)
}

//-----------------LANGUAGES-------------------

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