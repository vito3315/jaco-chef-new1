const express = require( 'express' );
const fs = require( 'fs' );
const path = require( 'path' );
const React = require( 'react' );
const ReactDOMServer = require( 'react-dom/server' );
const { StaticRouter } = require( 'react-router-dom' );
const {Helmet} = require("react-helmet");

const app = express();
const { App } = require( '../src/components/app' );

/*app.enable('trust proxy')

app.use( (request, response, next) => {
    if (!request.secure) {
       return response.redirect("https://" + request.headers.host + request.url);
    }

    next();
})*/

app.get( /\.(js|css|map|ico|png|svg)$/, express.static( path.resolve( __dirname, '../dist' ) ) );

app.use( '*', async ( req, res ) => {

    let indexHTML = fs.readFileSync( path.resolve( __dirname, '../dist/index.html' ), {
        encoding: 'utf8',
    } );
    
    let appHTML = ReactDOMServer.renderToPipeableStream(
        <StaticRouter location={ req.originalUrl }>
            <App />
        </StaticRouter>
    );

    const helmet = Helmet.renderStatic();
    
    indexHTML = indexHTML.replace(
        '<!-- title -->',
        `${helmet.title.toString()}`
    );
    
    indexHTML = indexHTML.replace( 
        '<div id="app"></div>', 
        `<div id="app">
            ${ appHTML }
        </div>` );

    res.contentType( 'text/html' );
    res.status( 200 );

    return res.send( indexHTML );
} );

app.listen( '3000', () => {
    console.log( 'Express server started at http://localhost:3000' );
} );