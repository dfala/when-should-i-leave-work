var RenderController = require('./RenderController');

module.exports = function (app) {
  app.get('/', Pages.index);
  // app.get('/query/:queryId', RenderController.serveData);
};
