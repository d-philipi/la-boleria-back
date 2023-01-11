import { DB } from "../database/db.js";
import { cakesSchema } from "../models/cakesModel.js";

export async function cakesValidation (req, res, next) {
    const cake = req.body;
    const validation = cakesSchema.validate(cake, { abortEarly: false });
    

    if(validation.error){
        const errors = validation.error.details.map((d) => d.message);
        res.status(400).send(errors);
        return;
    }

    const cakeExist = await DB.query(
        'SELECT * FROM cakes WHERE cakes.name = $1;',
    [cake.name]);

    if (cakeExist.rows.length > 0){
        res.sendStatus(409);
        return;
    };

    next();
}