import { DB } from "../database/db.js";
import { clientsSchema } from "../models/clientsModel.js";

export async function clientsValidation (req, res, next) {
    const client = req.body;
    const validation = clientsSchema.validate(client, { abortEarly: false });

    if(validation.error){
        const errors = validation.error.details.map((d) => d.message);
        res.status(400).send(errors);
        return;
    }

    next();
}

export async function clientValidation (req, res, next) {
    const { id } = req.params;

    const clientExist = await DB.query(
        'SELECT * FROM clients WHERE id = $1;',
        [id]
    );

    if(clientExist.rows.length === 0){
        res.send({message: "Usuário não identificado"}).status(404);
        return;
    };
    
    next();
}