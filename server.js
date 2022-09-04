const path = require( 'path' )

const express = require( 'express' )
const expressSession = require( 'express-session' )
const { urlencoded, json } = require( 'body-parser' )
const app = express()
const port = 8080

app.use( expressSession({
    secret: 'secret'
    , resave: false
    , saveUninitialized: true
}) )

app.use( express.static( 'public' ) )

app.use( urlencoded({ extended: true }) )
app.use( json() )

// web pages

app.get( '/', ( req, res ) => {
    res.sendFile( path.join( __dirname, './public/index.html' ) )
})

app.get( '/about', ( req, res ) => {
    res.sendFile( path.join( __dirname, './public/about.html' ) )
})

app.get( '/technical', ( req, res ) => {
    res.sendFile( path.join( __dirname, './public/technical.html' ) )
})

app.get( '/policy', ( req, res ) => {
    res.sendFile( path.join( __dirname, './public/policy.html' ) )
})

app.get( '/invalid', ( req, res ) => {
    res.sendFile( path.join( __dirname, './public/invalid.html' ) )
})

app.listen( port, () => {
    console.log( `dir.gg listening at localhost:${ port }` )
})