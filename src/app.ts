import express from "express";
import { DataSource } from "typeorm";
import { Router } from "./routes/router";
import { UserEntity } from "./modules/user/user.entity";
import mongoose from 'mongoose';
import { config } from "./config/config";
import Logging from "./libs/logging";
const app = express();
app.use(express.json());
const port = 3000;



export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "tho",
    synchronize: true,
    // logging: true,
    entities: [UserEntity],
    subscribers: [],
    migrations: [],
})

try{
    AppDataSource.initialize().then(() => {
        Logging.info('DB Connected!')
    }).catch((err) => console.log("ConnectDB error!"))

    mongoose
    .connect(`mongodb://root:111111@localhost:27017/?authMechanism=DEFAULT`, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('Mongo connected successfully.');
        StartServer();
    })
    const StartServer = () => {
        app.listen(port, () => {
            new Router(app)
        })


    };
}catch(err){
    console.log('DB connect err!')
}






