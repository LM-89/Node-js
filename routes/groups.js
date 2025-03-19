const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const { v4: uuid } = require('uuid')

module.exports = router 

// GET GROUPS
function getGroups() {
    const filePath = path.join('db', 'groups.json')

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

//GET GROUP BY ID
function getGroupById(id) {
    const groups = getGroups()

    return groups.find(group => group.id === id)
}

//CREATE/POST GROUP
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

//EDIT/UPDATE GROUP
function updateGroup(data) {
    const { id } = data

    const groups = getGroups()

    const updatedGroups = groups.map(group => group.id === id ? { ...group, ...data } : group)

    const stringifiedData = JSON.stringify(updatedGroups, null, 2)
    
    const filePath = path.join('db', 'groups.json')
    fs.writeFileSync(filePath, stringifiedData)

    return data
}

//DELETE GROUP
function deleteGroup(id) {
    const groups = getGroups().filter(group => group.id !== id)
      
    const stringifiedData = JSON.stringify(groups, null, 2)
    const filePath = path.join('db', 'groups.json')
    fs.writeFileSync(filePath, stringifiedData)
}

//-----------------GROUPS-------------------

router.get('/groups', (req, res, next) => {
    const groups = getGroups()
    res.render('groups/groups', { groups })
})

router.get('/groups/:id', (req, res, next) => {
    const { id } = req.params
    const group = getGroupById(id)
    const students = getStudents()
    const groupStudents = students.filter(student => student.group === group.name)    

    res.render('groups/group', { group, id, groupStudents })
})

router.get('/create-group', (req, res, next) => {
    res.render('groups/create-group')
})

router.post('/group-created', (req, res, next) => {
    const { body } = req
    const createdGroup = createGroup(body)    
    
    res.redirect(`/groups/${createdGroup.id}`)
})

router.get('/edit-group/:id', (req, res, next) => {
    const { id } = req.params
    const group = getGroupById(id)

    if (group) { 
        res.render('groups/edit-group', { group })       
    } else {
        res.redirect('/groups')
    }
})

router.post('/group-edited', (req, res, next) => {
    const { body } = req

    const updatedGroup = updateGroup(body)

    res.redirect(`/groups/${updatedGroup.id}`)
})

router.post('/delete-group', (req, res, next) => {
    const { groupId } = req.body

    deleteGroup(groupId)

    res.redirect('/groups')
})