const swaggerUi = require('swagger-ui-express');

export default function swaggerInit(router, route, swaggerDocument) {
  return router.use(route, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
