const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

class swaggerWeb {

    constructor(express, bodyParser, config) {
        this.express = express;
        this.config = config;
        this.bodyParser = bodyParser;
    }

    start() {
        const app = this.express();
        app.set('port', this.config.port);
        app.use(this.bodyParser.json());
        app.use(this.bodyParser.urlencoded({extended: true}));
        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', this.config.allow_origin);
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader("Access-Control-Allow-Headers", "*");
            res.setHeader('Access-Control-Allow-Credentials', true);
            next();
        });

        this.serverRoot(app);
        this.serverGetDocs(app);
        app.listen(app.get('port'), function () {
            console.log('swagger running on port', app.get('port'))
        });
    }

    serverGetDocs(app) {
        const options = {
            swaggerDefinition: {
                info: {
                    title: 'Blog API',
                    version: '1.0.0',
                    "termsOfService": "http://example.com/terms/",
                    description: 'Blog backend',
                    "contact": {
                        "name": "API Support",
                        "url": "http://www.example.com/support",
                        "email": "support@example.com"
                    },
                    "license": {
                        "name": "Apache 2.0",
                        "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
                    },
                },
                host: this.config.host,
                basePath: '/',
                securityDefinitions: {
                    TOKEN: {
                        type: 'apiKey',
                        description: 'TOKEN authorization of an API - 5d0bddfbe007ae037c3f83ae',
                        name: 'Authorization',
                        in: 'header',
                    },
                },
            },
            apis: this.config.files
        }
        app.use(this.config.url, swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
    }


    serverRoot(app) {
        /**
         * @swagger
         * /:
         *    get:
         *      description: Healtcheck
         *      responses:
         *       200:
         *         description: "{data: 'hello backend world'}"
         */
        app.get('/swagger/', (req, res) => {
            res.send({data: 'hello swagger world ->' + this.config.url});
        });
    }
}

module.exports = swaggerWeb;
