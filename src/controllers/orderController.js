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

        if(client.rows.length === 0){
            res.send(client.rows).status(404);
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
    const { date } = req.query;

    try{
        const orders = await DB.query(
            `SELECT 
            clients.* AS client, cakes.* AS cake,
            orders.id AS "orderId", "createdAt",
            quantity, "totalPrice"
            FROM orders
            JOIN clients ON clients.id = orders."clientId"
            JOIN cakes ON cakes.id = orders."cakeId";`
        );
        /*const abc = 2023;
        const filter = `%${date}%`;

        const orders = await DB.query(
            `SELECT
            "createdAt"
            FROM orders
            WHERE "createdAt" ILIKE '%20%';`
        );*/

        if(orders.rows.length === 0){
            res.send(orders.rows).status(404);
            return;
        }

        res.send(orders.rows).status(200);
        return;
    }catch (error){
        res.send(error).status(500);
        return;
    }
}