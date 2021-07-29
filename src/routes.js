const express = require('express');

const routes = express.Router();

const Users = require('./controllers/users.controller')
const Equips = require('./controllers/equips.controller')

routes.get('/*',Users.index);
routes.get('/*', Equips.index);

// Routes de Users
routes.post('/api/users',Users.create);
routes.get('/api/users',Users.index);
routes.get('/api/users.details/:_id',Users.details);
routes.delete('/api/users/:_id',Users.delete);
routes.put('/api/users',Users.update);
routes.post('/api/users/login',Users.login);
routes.get('/api/users/checktoken',Users.checkToken);
routes.get('/api/users/destroytoken',Users.destroyToken);

// Routes de Equipamentos
routes.post('/api/equips',Equips.create);
routes.get('/api/equips',Equips.index);
routes.get('/api/equips.details/:_id',Equips.details);
routes.delete('/api/equips/:_id',Equips.delete);
routes.put('/api/equips',Equips.update);

module.exports = routes;
