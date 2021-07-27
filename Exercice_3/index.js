import express from 'express';
import bodyParser from 'body-parser';

import session from 'express-session'; // permet de gérer les sessions avec Express
import Keycloak from 'keycloak-connect'; //permet de gérer la connection Keycloack avec Node.js
const app = express();
const port = 1200;
app.use(bodyParser.json());

const memoryStore = new session.MemoryStore();
app.use(
    session({
        secret: 'secretKey',
        resave: false,
        saveUninitialized: true,
        store: memoryStore
    })
);

const keycloak = new Keycloak({
    store: memoryStore
});
app.use(
    keycloak.middleware({
        logout: '/logout',
        admin: '/'
    })
);
app.get('/home', function(req, res) {
    console.log('Hello world !');
});
app.get('/api/unsecured', function(req, res) {
    res.json({ message: 'This is an unsecured endpoint payload' });
});
app.get('/api/user', keycloak.protect('realm:user'), function(req, res) {
    res.json({ message: 'This is an USER endpoint payload' });
});
app.get('/api/admin', keycloak.protect('realm:admin'), function(req, res) {
    res.json({ message: 'This is an ADMIN endpoint payload' });
});
app.listen(port, err => {
    if (err) {
        console.error(err);
    } {
        console.log(`APP Listen to port : 1200`);
    }
});