import express, { Router } from "express";
import path from "path";

interface Options {
  public_path?: string;
}

export class ExpressServer {
  public readonly app = express();
  private readonly publicPath: string;

  constructor(options: Options) {
    const { public_path = "public" } = options;
    this.publicPath = public_path;
    this.configure();
  }

  private configure() {
    //* Middlewares
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //* SPA
    this.app.get(/^\/(?!api).*/, (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
    });
  }

  public setRoutes(router: Router) {
    this.app.use(router);
  }
}
