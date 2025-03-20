const { v4: uuid } = require('uuid')
const path = require('path')
const fs = require('fs')


function getGroups() {
    const filePath = path.join('db', 'groups.json')

    if (!fs.existsSync(filePath)) {
        throw new Error('File does not exist')
    }

    const fileContent = fs.readFileSync(filePath)

    const data = JSON.parse(fileContent)

    return data
}

function getGroupById(id) {
    const groups = getGroups()

    return groups.find(group => group.id === id)
}

function createGroup(body) {
    const id = uuid()
    
    const newGroup = { 
        ...body,
        id 
    }

    const groups = getGroups()

    groups.push(newGroup)
    
    const stringifiedData = JSON.stringify(groups, null, 2)
    
    const filePath = path.join('db', 'groups.json')
    fs.writeFileSync(filePath, stringifiedData)

    return newGroup
}

function updateGroup(data) {
    const { id } = data

    const groups = getGroups()

    const updatedGroups = groups.map(group => group.id === id ? { ...group, ...data } : group)

    const stringifiedData = JSON.stringify(updatedGroups, null, 2)
    
    const filePath = path.join('db', 'groups.json')
    fs.writeFileSync(filePath, stringifiedData)

    return data
}

function deleteGroup(id) {
    const groups = getGroups().filter(group => group.id !== id)
      
    const stringifiedData = JSON.stringify(groups, null, 2)
    const filePath = path.join('db', 'groups.json')
    fs.writeFileSync(filePath, stringifiedData)
}


module.exports = {
    getGroups,
    getGroupById,
    createGroup,
    updateGroup,
    deleteGroup,
}