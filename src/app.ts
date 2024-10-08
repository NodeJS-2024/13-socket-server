import { createServer } from 'http';
import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import { WssService } from './presentation/services/wss.service';

(async() => {
  main();
})();

function main() {

  const server = new Server({
    port: envs.PORT,
    //routes: AppRoutes.routes,
  });

  const httpServer = createServer(server.app); // misma configuracion que es server
  WssService.initWss({ server: httpServer }); // path: '/ws/connect'

  server.setRoutes(AppRoutes.routes); // Inicializamos despues de iniciar el Websocket

  // server.start();
  httpServer.listen(envs.PORT, () => {
    console.log(`Server running on port ${ envs.PORT }`);
  });

}