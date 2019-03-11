const routes = require('next-routes')();

routes.add('/about', '/about');
routes.add('/contests/new', '/contests/new');
routes.add('/contests/:address', '/contests/singleContest');
routes.add('/contests/:address/players', '/contests/players/index');
// // routes.add('/campaigns/:address/requests/new', '/campaigns/requests/new');

module.exports = routes;
