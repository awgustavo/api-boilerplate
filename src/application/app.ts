// import express, { Router } from "express";

// export class AppRoutes {
//   private app;

//   constructor() {
//     this.app = express();

//     this.app.get("/health-check", (req, res) => {
//       res.json({ "app-staus": "running" });
//     });
//   }

//   public addRoutes(routes: Router) {
//     this.app.use("/api", routes);
//   }

//   public startAPI(port: number) {
//     this.app.listen(port, () => {
//       console.log(`API is running. Port: ${port}`);
//     });
//   }
// }
