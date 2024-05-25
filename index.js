import express from "express";
import { engine } from "express-handlebars";
import path from "path";

import moment from "moment";
import lodash from "lodash";
import chalk from "chalk";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 3000;

const __dirname = import.meta.dirname;

// public directory
app.use(express.static(path.join(__dirname, "/public")));
app.use(
  "/css",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "/node_modules/jquery/dist"))
);

// Middlewares body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// handlebars
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("home");
});

let usuarios = [];
app.get("/desafio", async (req, res) => {
  let mensaje = "";

  try {
    mensaje = "Se ha registrado  un nuevo usuario de exitosamente";

    // Consulta la API que trae el usuario a ingresar
    const API_URL = "https://randomuser.me/api/";
    const info = await axios.get(API_URL);
    const data = info.data;

    //Crea una UID unico para cada usuario
    const uid = uuidv4();

    // Crea una fecha
    moment.locale("es");
    const timestamp = moment().format("LLL");

    const usuario = {
      uid,
      firstName: data.results[0].name.first,
      lastName: data.results[0].name.last,
      gender: data.results[0].gender,
      timestamp,
    };

    usuarios.push(usuario);


    // Separar usuarios por género utilizando lodash
    const usuariosPorGenero = lodash.groupBy(usuarios, "gender");
    const mujeres = usuariosPorGenero["female"] || [];
    const hombres = usuariosPorGenero["male"] || [];

    console.log(mujeres);
    console.log(hombres);


    res.render("desafio", { mensaje, mujeres, hombres, usuarios });
  } catch (error) {
    mensaje = "No fue posible registrar al nuevo usuario";

    console.log(error);
    res.render("desafio", { mensaje, error });
  }
});

app.post("/eliminar",  (req, res) => {
  usuarios = [];
  res.redirect('/desafio'); 
});

// 404 para cualquier otra ruta
app.get("*", (_, res) => {
  return res.status(404).render("404", { title: "No se encuentra la página" });
});

app.listen(port, () => {
  console.log(`Ejecutando el servidor en http://localhost:${port}`);
});
