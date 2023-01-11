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
                o.id AS "orderId", o.quantity, o."createdAt", o."totalPrice",
                o."clientId", cl.name AS "clientName", cl.address, cl.phone,
                o."cakeId", ca.name AS "cakeName", ca.price, ca.image, ca.description
                FROM orders o
                JOIN clients cl ON o."clientId" = cl.id
                JOIN cakes ca ON ca.id = o."cakeId";`
        );

        for(let i = 0; i < orders.rows.length; i++){
            const item ={
                client:{
                    id: orders.rows[i].clientId,
                    name: orders.rows[i].clientName,
                    address: orders.rows[i].address,
                    phone: orders.rows[i].phone
                },
                cake:{
                    id: orders.rows[i].cakeId,
                    name: orders.rows[i].cakeName,
                    price: orders.rows[i].price,
                    description: orders.rows[i].description,
                    image: orders.rows[i].image
                },
                orderId: orders.rows[i].orderId,
                createdAt: orders.rows[i].createdAt,
                quantity: orders.rows[i].quantity,
                totalPrice: orders.rows[i].totalPrice
            }

            resultado[i] = item;
        }

        

        if(resultado.length === 0){
            res.send(resultado).status(404);
            return;
        };

        res.send(orders).status(200);
        return;
    }catch (error){
        res.send(error).status(500);
        return;
    }
}