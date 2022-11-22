import express from "express";
import __dirname from "./utils.js";
import handlebars from 'express-handlebars';
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/productsRouter.js"
import Contenedor from "./container/products.js";

const app = express();
const server = app.listen(8080, ()=>console.log('Listening PORT 8080')); 

app.use(express.static(__dirname + '/public')); 


app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars'); 

app.use(express.json());
app.use('/', viewsRouter); 
app.use('/api/products', productsRouter)

