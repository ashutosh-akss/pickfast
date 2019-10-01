const routeConfig = require('../config/router');
const cors = require('cors');

class Router {
    constructor(app) {
        if (!app) {
            throw new Error('Router must be initialised with Express app');
        }
        this.app = app;
        this.app.use(cors());
    }

    setupMiddlwares() {

    }

    addMiddlewares() {

    }

    setupRoutes() {
        Object.keys(routeConfig).forEach(routerGroup => {
            routeConfig[routerGroup].forEach(route => {
                const pathUrl = `/${routerGroup}${route.path}`;
                this.app[route.method](pathUrl, route.controller);
            });
        });
    }
}

module.exports = Router;