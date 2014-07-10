var setup = function(app, routers) {
  var userRoutes = routers.users;
  var docRoutes = routers.docs;

  app.get('/account/:user', userRoutes.account);
  app.get('/docs/:number', docRoutes.sizzle);
  app.get('/docs/:number/edit', docRoutes.edit);
  app.get('/docs/:number/show', docRoutes.show);
  app.get('/login', userRoutes.entry);
  app.get('/registration', userRoutes.register);
  app.get('/welcome', userRoutes.welcome);
  app.post('/create', userRoutes.create);
  app.post('/login', userRoutes.login);
  app.put('/docs/:number/modified', docRoutes.modified);
}

module.exports = function(app, routes){
  setup(app, routes);
}
