import { DB } from "../database/db.js";

export async function createClients(req, res){
    const client = req.body;

    try{
        await DB.query(
            'INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3);',
            [client.name, client.address, client.phone]
        ); 
        res.sendStatus(201);
        return;
    }catch (error){
        res.send(error).status(500);
        return;
    }
}