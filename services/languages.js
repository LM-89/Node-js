const { v4: uuid } = require('uuid')
const path = require('path')
const fs = require('fs')


function getLanguages() {
    const filePath = path.join('db', 'languages.json')

    if (!fs.existsSync(filePath)) {
        throw new Error('File does not exist')
    }

    const fileContent = fs.readFileSync(filePath)

    const data = JSON.parse(fileContent)

    return data
}

function getLanguageById(id) {
    const languages = getLanguages()

    return languages.find(language => language.id === id)
}

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

function updateLanguage(data) {
    const { id } = data

    const languages = getLanguages()

    const updatedLanguages = languages.map(language => language.id === id ? { ...language, ...data } : language)

    const stringifiedData = JSON.stringify(updatedLanguages, null, 2)
    
    const filePath = path.join('db', 'languages.json')
    fs.writeFileSync(filePath, stringifiedData)

    return data
}

function deleteLanguage(id) {
    const languages = getLanguages().filter(language => language.id !== id)
      
    const stringifiedData = JSON.stringify(languages, null, 2)
    const filePath = path.join('db', 'languages.json')
    fs.writeFileSync(filePath, stringifiedData)
}


module.exports = {
    getLanguages,
    getLanguageById,
    createLanguage,
    updateLanguage,
    deleteLanguage,
}