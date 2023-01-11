import joi from "joi";

export const cakesSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    image: joi.string().uri().required(),
    description: joi.string()
})