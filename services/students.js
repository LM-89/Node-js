const { v4: uuid } = require('uuid')
const path = require('path')
const fs = require('fs')


function getStudents() {
    const filePath = path.join('db', 'students.json')

    if (!fs.existsSync(filePath)) {
        throw new Error('File does not exist')
    }

    const fileContent = fs.readFileSync(filePath)

    const data = JSON.parse(fileContent)

    return data
}

function getStudentById(id) {
    const students = getStudents()

    return students.find(student => student.id === id)
}

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

function deleteStudent(id) {
    const students = getStudents().filter(student => student.id !== id)
      
    const stringifiedData = JSON.stringify(students, null, 2)
    const filePath = path.join('db', 'students.json')
    fs.writeFileSync(filePath, stringifiedData)
}


module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
}