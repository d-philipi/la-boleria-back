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

export async function findClient(req, res){
    const { id } = req.params;

    try{
        const result = await DB.query(
            `SELECT
            orders.id AS "orderId", orders.quantity,
            orders."createdAt", orders."totalPrice",
            cakes.name AS "cakeName"
            FROM orders
            JOIN cakes ON cakes.id = orders."cakeId"
            WHERE orders."clientId" = $1;`,
            [ id ]
        );

        res.send(result.rows).status(201);
        return;
    }catch (error){
        res.send(error).status(500);
        return;
    }
}