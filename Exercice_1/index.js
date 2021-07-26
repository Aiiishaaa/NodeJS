import express from 'express';
import monogoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from ' ./src/routes/crmRoutes';

const app = express(); // création de l'objet représentant notre application express
const port = 3000;

// connexion mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb', {
    useNewUrlParser: true
});

//  installer bodyparser : convertir le JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.get('/', function(req, res) { // création de la route sous le verbe get
    res.send(' Hello world  ! ') // envoi de hello world à l'utilisateur
})

app.listen(port, () => { // ecoute du serveur sur le port 3000
    console.log('Le serveur fonctionne sur le port ', port)
})