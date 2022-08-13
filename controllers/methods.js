const fsPromises = require('fs').promises
const express = require('express')
const app = express()


const handleHomeGet = async (req,res) => {
    const movies = await require('../database/movies.json')

    res.render('home', {movies:movies})
} 


const handleEachMovieGet = (req,res, movie, movies) => {
    res.render('movie', {movie:movie})
}


const handlePostComment = async (req,res,movie, movies) => {
        if(!req.body.text || !req.body.rate){
            res.json({msg:'Not complete'})
            return ;
        }
        const comment = {
            text:req.body.text,
            rate:req.body.rate
        }
        movie.comments.push(comment)
        let sum = 0
        movie.comments.forEach(comment => {
            sum += parseFloat(comment.rate)
        })
        movie.rating = sum/movie.comments.length
    
    await fsPromises.writeFile('./database/movies.json',JSON.stringify(movies))
    res.render('movie', {movie:movie})
}


module.exports = {handleHomeGet,handleEachMovieGet,handlePostComment}