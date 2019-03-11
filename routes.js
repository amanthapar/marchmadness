const routes = require('next-routes')();

routes.add('/contests/about', '/contests/about');
routes.add('/contests/new', '/contests/new');
routes.add('/contests/:address', '/contests/singleContest');
// routes.add('/contests/:address/requests', '/contests/requests/index');
// // routes.add('/campaigns/:address/requests/new', '/campaigns/requests/new');

module.exports = routes;
