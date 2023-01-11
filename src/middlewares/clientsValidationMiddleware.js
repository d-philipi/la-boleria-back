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