import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path'

import moment from 'moment';
import lodash from 'lodash';
import chalk from 'chalk';
import axios from 'axios';

const app = express()
const port = 3000

const __dirname = import.meta.dirname;

// public directory
app.use(express.static(path.join(__dirname, '/public')))
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')))

// Middlewares body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// handlebars
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
  res.render('home');
})

app.get('/desafio', (req, res) => {
  res.render('desafio');
})

// 404 para cualquier otra ruta
app.get('*', (_, res) => {
    return res.status(404).render('404', { title: "No se encuentra la página" })
})


app.listen(port, () => {
  console.log(`Ejecutando el servidor en http://localhost:${port}`)
})

