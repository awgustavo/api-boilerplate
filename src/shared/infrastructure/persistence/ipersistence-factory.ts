export interface IPersistenceFactory<Config, DBConn> {
  createConnection(config: Config): Promise<DBConn>;
}
