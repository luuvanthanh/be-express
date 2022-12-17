import { Request, Response } from "express"
import Book from './user.model';
import mongoose from 'mongoose';
import { UserService } from "./user-service"

export class UserController{
    resourceService: any
    userService: UserService
    constructor(){
        this.userService = new UserService()
    }

    async index(req: Request, res: Response){
        const book = new Book({
            _id: new mongoose.Types.ObjectId(),
            author: 'tho bo',
            title: '111111'
        });
    
        return book
            .save()
            .then((book) => res.status(201).json({ book }))
            .catch((error) => res.status(500).json({ error }));

        // res.send('okkk')
    }


    async getOne(req: Request, res: Response){
        const { id } = req.params
        const data = await this.userService.getOne(id)
        res.send(data)
    }
}
