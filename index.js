import express from 'express';
import moment from 'moment';
import lodash from 'lodash';
import chalk from 'chalk';
import axios from 'axios';

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Ejecutando el servidor en http://localhost:${port}`)
})

