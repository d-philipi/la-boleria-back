import { DB } from "../database/db.js";
import { ordersSchema } from "../models/orderModel.js";

export async function ordersValidation (req, res, next) {
    const order = req.body;
    const validation = ordersSchema.validate(order, { abortEarly: false });

    if(validation.error){
        const errors = validation.error.details.map((d) => d.message);
        res.status(400).send(errors);
        return;
    }

    const clientExist = await DB.query(
        'SELECT * FROM clients WHERE clients.id = $1;',
        [order.clientId]
    );

    if(clientExist.rows.length === 0){
        res.send({message: "Cliente não identificado"}).status(404);
        return;
    };

    const cakeExist = await DB.query(
        'SELECT * FROM cakes WHERE cakes.id = $1;',
        [order.cakeId]
    );

    if(cakeExist.rows.length === 0){
        res.send({message: "Esse bolo não está disponível"}).status(404);
        return;
    };
    
    next();
}