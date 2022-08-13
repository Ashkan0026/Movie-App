const fsPromises = require('fs').promises
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const {handleHomeGet,handleEachMovieGet,handlePostComment} = require('./controllers/methods')
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname,'resources')))
app.use('/movies', express.static(path.join(__dirname, 'resources')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine','ejs')


app.get('/', (req,res) => {
    handleHomeGet(req,res)
})

const movies = require('./database/movies.json')
for(let i = 0;i<movies.length;i++){
    app.get(`/movies/${movies[i].url}`, (req,res) => {
            
        handleEachMovieGet(req,res,movies[i], movies)
    })
    app.post(`/movies/${movies[i].url}`, (req,res) => {
        console.log('on posting '+movies[i].name)
        handlePostComment(req,res,movies[i],movies)
    })
}

app.listen(PORT, () => {
    console.log('Running on PORT : '+PORT)
})