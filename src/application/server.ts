import dotenv from "dotenv";
import { CompanyRepository } from "../infrastructure/repositories/company/company-repository";
import { ExpressHandler } from "../shared/api/express/express-handler";
import { IRESTHandler } from "../shared/api/irest-handler";
import { CompanyDTO } from "../infrastructure/entities/company-dto";
import { IBaseController } from "../shared/interfaces/ibase-controller";
import { IPersistenceHandler } from "../shared/pesistence/ipersistence-handler";
import { MongoDBConfig } from "../shared/pesistence/mongodb/mondodb-config";
import { MongoDBFactory } from "../shared/pesistence/mongodb/mongodb-factory";
import { MongoDBHandler } from "../shared/pesistence/mongodb/mongodb-handler";
import { CompanyController } from "./controllers/company-controller";
import { APIModules } from "./module";
import { CompanyService } from "./services/company/company-service";

class Server {
  private restHandler: IRESTHandler;
  private persistenceHandler: IPersistenceHandler;
  private persistenceFactory: MongoDBFactory;
  private companyController: IBaseController;
  private db;
  constructor() {
    this.initiateServer();
  }

  async initiateServer() {
    dotenv.config({ path: "config/.env" });

    this.restHandler = new ExpressHandler();
    this.persistenceFactory = new MongoDBFactory();

    this.db = await new MongoDBFactory().createConnection(
      new MongoDBConfig(process.env.MONGO_DB_URL, process.env.MONGO_COLLECTION, "company")
    );

    this.persistenceHandler = new MongoDBHandler(this.db);

    this.initiateControllers();
    this.restHandler.startAPI(parseInt(process.env["PORT"]));
  }

  initiateControllers() {
    this.companyController = APIModules.resgisterModules<CompanyDTO>(
      CompanyController,
      CompanyService,
      CompanyRepository,
      this.restHandler,
      this.persistenceHandler,
      this.persistenceFactory,
      this.db,
      "company"
    );
  }
}
new Server();
