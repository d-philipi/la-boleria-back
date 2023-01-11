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

export async function findOrder(req, res){
    const { id } = req.params;

    try{
        const order = await DB.query(
            `SELECT
            orders.id AS "orderId", *
            FROM orders
            WHERE orders.id = $1;`,
            [id]
        );

        const client = await DB.query(
            `SELECT
            clients.*
            FROM orders
            JOIN clients ON orders."clientId" = clients.id
            WHERE orders.id = $1;`,
            [id]       
        );
        const cake = await DB.query(
            `SELECT
            cakes.*
            FROM orders
            JOIN cakes ON orders."cakeId" = cakes.id
            WHERE orders.id = $1;`,
            [id]       
        );

        const item = {
            client: client.rows[0],
            cake: cake.rows[0],
            orderId: order.rows[0].orderId,
            createdAt: order.rows[0].createdAt,
            quantity: order.rows[0].quantity,
            totalPrice: order.rows[0].totalPrice
        }

        if(item.length === 0){
            res.send(item.rows).status(404);
            return;
        }

        res.send(item).status(200);
        return;
    }catch (error){
        res.send(error).status(500);
        return;
    }
}

export async function findOrders(req, res){

    try{
        let resultado = [];

        const orders = await DB.query(
            `SELECT 
            orders.id AS "order.Id", orders.quantity, orders."createdAt", orders."totalPrice",
            orders."clientId", client.name as "clientName", client.adress, client.phone,
            orders."cakeId", cake.name  ,  
            FROM orders;`
        );

        

        /*if(orders.rows.length === 0){
            res.send(orders.rows).status(404);
            return;
        };*/

        res.send(resultado).status(200);
        return;
    }catch (error){
        res.send(error).status(500);
        return;
    }
}