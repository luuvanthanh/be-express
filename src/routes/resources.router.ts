
import express from "express";
import { ResourcesController } from "../modules/resources/resources-controller";
const router = express.Router();

export class Resources{
    constructor(app: any){
        const controller = new ResourcesController()
        router.get('/', controller.index)
        app.use('/resources', router)
    }
}