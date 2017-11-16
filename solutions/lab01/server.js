import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Hello from './hello.js';
import Transmit from 'react-transmit-client-server';

function handleRender(req, res) {

    Transmit.renderToString(Hello).then(({reactString, reactData}) => {
        fs.readFile('./index.html', 'utf8', function (err, data) {
            if (err) throw err;

            const document = data.replace(/app-here/, `<div id="app">${reactString}</div>`);
            const output = Transmit.injectIntoMarkup(document, reactData, ['/build/index.js']);

            res.send(document);
        })
    });

}

const app = express();

// Serve built files with static files middleware
app.use('/build', express.static(path.join(__dirname, 'build')));

// Serve requests with our handleRender function
app.get('*', handleRender);

// Start server
app.listen(3000);