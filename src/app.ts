import { createServer } from "http";
import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { ExpressServer } from "./presentation/server";
import { WssService } from "./presentation/services/wss.service";

(async () => main())();

function main() {
  const server = new ExpressServer({});
  const httpServer = createServer(server.app);
  WssService.initWss({ server: httpServer });

  server.setRoutes(AppRoutes.routes);

  httpServer.listen(envs.PORT, () =>
    console.log(`Server on port: ${envs.PORT}`)
  );
}
