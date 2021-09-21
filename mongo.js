const mongoose = require('mongoose')

if (process.argv.length < 3){
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.et0l9.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', phonebookSchema)

if (process.argv.length > 4){
const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
})

person.save().then(response => {
  console.log(`added ${person.name} number ${person.number} to phonebook`)
  mongoose.connection.close()
})
}

if (process.argv.length < 4) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}