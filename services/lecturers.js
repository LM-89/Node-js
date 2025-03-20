const { v4: uuid } = require('uuid')
const path = require('path')
const fs = require('fs')


function getLecturers() {
    const filePath = path.join('db', 'lecturers.json')

    if (!fs.existsSync(filePath)) {
        throw new Error('File does not exist')
    }

    const fileContent = fs.readFileSync(filePath)

    const data = JSON.parse(fileContent)

    return data
}

function getLecturerById(id) {
    const lecturers = getLecturers()

    return lecturers.find(lecturer => lecturer.id === id)
}

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

function deleteLecturer(id) {
    const lecturers = getLecturers().filter(lecturer => lecturer.id !== id)
      
    const stringifiedData = JSON.stringify(lecturers, null, 2)
    const filePath = path.join('db', 'lecturers.json')
    fs.writeFileSync(filePath, stringifiedData)
}


module.exports = {
    getLecturers,
    getLecturerById,
    createLecturer,
    updateLecturer,
    deleteLecturer,
}