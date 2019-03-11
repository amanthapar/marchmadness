const routes = require('next-routes')();

routes.add('/about', '/about');
routes.add('/contests/new', '/contests/new');
routes.add('/contests/:address', '/contests/singleContest');
routes.add('/contests/:address/players', '/contests/players/index');

module.exports = routes;
