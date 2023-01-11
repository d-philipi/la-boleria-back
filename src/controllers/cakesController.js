import { DB } from "../database/db.js";

export async function creatCakes(req, res){
    const cake = req.body;

    try{
        await DB.query(
            'INSERT INTO cakes (name, price, image, description) VALUES ($1, $2, $3, $4);',
            [cake.name, cake.price, cake.image, cake.description]
        ); 
        res.sendStatus(201);
        return;
    }catch (error){
        res.send(error).status(500);
        return;
    }
}