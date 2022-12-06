const mongoose = require('mongoose')
const validator = require ('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true   
}).catch(error => {
    console.log('Error', error)
})

const User = mongoose.model('User', {
    name: {
        type: 'String',
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        triim: true,
        lowercase: true,
        validate (value){
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid.')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate (value){
            if (value.toLowerCase().includes('password')){
                throw new Error('Password can not contain "password"')
            }
        }        
    },
    age: {
        type: Number,
        default: 0,
        validate (value){
            if (value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    }
})

// const me = new User({
//     name: 'Minh Anh',
//     email: 'minhanh030506@gmail.com',
//     password: 'Cun030506'
// })

// me.save().then((me) => {
//     console.log(me)
// }).catch(error => {
//     console.log('Error', error)
// })

const Task = mongoose.model('Task', {
    description: {
        type: 'String',
        required: true,
        trim: true        
    }, 
    completed: {
        type: Boolean,
        required: false,
        default: false
    }    
})

const task = new Task({
    description: '                 Complete the task by tomorrow     '
})

task.save().then(task => {
    console.log(task)
}).catch(error => {
    console.log('Error', error)
})