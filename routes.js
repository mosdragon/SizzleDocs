function setup(app, routers) {
  app.get('/docs/:number', routers.documents.sizzle);
  app.get('/docs/:number/show', routers.documents.show);
  app.get('/docs/:number/edit', routers.documents.edit);
  app.get('/registration', routers.users.register);

  app.post('/create', routers.users.create);
  app.get('/welcome', routers.users.welcome);
  app.get('/account/:user', routers.users.account);

  app.post('/login', routers.users.login);

  app.get('/login', routers.users.entry);

  app.put('/docs/:number/modified', routers.documents.modified);
}

module.exports = setup;
