const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.static('dist'))

app.use(cors({
  origin: 'http://localhost:5173' //frontend origin
}))

app.use(express.json())

let notes = [
    {
      id: "1",
      content: "HTML is easy as abc",
      important: true
    },
    {
      id: "2",
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: "3",
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    },
    {
      "id": "4",
      "content": "Peter smacker is bad",
      "important": false
    },
    {
      "id": "5",
      "content": "Peter smacker is good",
      "important": false
    }
  
  ]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})



app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

// POST a new note
app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ error: 'Content missing' })
  }

  const newNote = {
    content: body.content,
    important: body.important || false,
    id: (notes.length ? Math.max(...notes.map(note => parseInt(note.id))) : 0) + 1
  }

  notes = notes.concat(newNote);
  response.json(newNote); // Send the created note as the response
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} http://localhost:3001`)
})
