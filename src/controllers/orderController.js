import { DB } from "../database/db.js";

export async function createOrders(req, res){
    const order = req.body;

    try{
        await DB.query(
            'INSERT INTO orders ("clientId", "cakeId", quantity, "totalPrice") VALUES ($1, $2, $3, $4);',
            [order.clientId, order.cakeId, order.quantity, order.totalPrice]
        ); 
        res.sendStatus(201);
        return;
    }catch (error){
        res.send(error).status(500);
        return;
    }
}