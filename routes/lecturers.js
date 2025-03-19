const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const { v4: uuid } = require('uuid')

module.exports = router 

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

//GET LECTURER BY ID
function getLecturerById(id) {
    const lecturers = getLecturers()

    return lecturers.find(lecturer => lecturer.id === id)
}

//CREATE/POST LECTURER
function createLecturer(body) {
    const id = uuid()

    const subjects = Array.isArray(body.subjects)
        ? body.subjects
        : body.subjects.split(',').map(subject => subject.trim())
    
    const favoriteLanguage = typeof body.favoriteLanguage === 'object'
        ? body.favoriteLanguage.name
        : body.favoriteLanguage;

    const newLecturer = { 
        ...body,
        subjects,
        favoriteLanguage,
        id 
    }

    const lecturers = getLecturers();
    lecturers.push(newLecturer);

    fs.writeFileSync(path.join('db', 'lecturers.json'), JSON.stringify(lecturers, null, 2));

    return newLecturer;
}

//EDIT/UPDATE LECTURER
function updateLecturer(data) {
    const { id } = data

    const lecturers = getLecturers()

    const updatedLecturers = lecturers.map(lecturer => {
        if (lecturer.id === id) {
            const subjects = []

            if (data.subjects) {
                if (typeof data.subjects === 'string') {
                    subjects.push(data.subjects)
                } else {
                    subjects.push(...data.subjects)
                }
            }
        
            const updatedLecturer = { 
                ...data,
                subjects,
            }

            return updatedLecturer
        } else {
            return lecturer
        }
         
    })

    const stringifiedData = JSON.stringify(updatedLecturers, null, 2)
    
    const filePath = path.join('db', 'lecturers.json')
    fs.writeFileSync(filePath, stringifiedData)

    return data
}

//DELETE LECTURER
function deleteLecturer(id) {
    const lecturers = getLecturers().filter(lecturer => lecturer.id !== id)
      
    const stringifiedData = JSON.stringify(lecturers, null, 2)
    const filePath = path.join('db', 'lecturers.json')
    fs.writeFileSync(filePath, stringifiedData)
}

//-----------------LECTURERS--------------------

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