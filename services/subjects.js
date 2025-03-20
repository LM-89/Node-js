const { v4: uuid } = require('uuid')
const path = require('path')
const fs = require('fs')


function getSubjects() {
    const filePath = path.join('db', 'subjects.json')

    if (!fs.existsSync(filePath)) {
        throw new Error('File does not exist')
    }

    const fileContent = fs.readFileSync(filePath)

    const data = JSON.parse(fileContent)

    return data
}

function getSubjectById(id) {
    const subjects = getSubjects()

    return subjects.find(subject => subject.id === id)
}

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

function updateSubject(data) {
    const { id } = data

    const subjects = getSubjects()

    const updatedSubjects = subjects.map(subject => subject.id === id ? { ...subject, ...data } : subject)

    const stringifiedData = JSON.stringify(updatedSubjects, null, 2)
    
    const filePath = path.join('db', 'subjects.json')
    fs.writeFileSync(filePath, stringifiedData)

    return data
}

function deleteSubject(id) {
    const subjects = getSubjects().filter(subject => subject.id !== id)
      
    const stringifiedData = JSON.stringify(subjects, null, 2)
    const filePath = path.join('db', 'subjects.json')
    fs.writeFileSync(filePath, stringifiedData)
}


module.exports = {
    getSubjects,
    getSubjectById,
    createSubject,
    updateSubject,
    deleteSubject,
}