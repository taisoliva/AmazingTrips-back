import joiBase from "joi"
import joiDate from "@joi/date"

const joi = joiBase.extend(joiDate)

export const companySchema = joi.object({
    name:joi.string().required()
})

export const flightSchema = joi.object({
    cidade1: joi.string().required(),
    cidade2: joi.string().required(),
    company: joi.string().required(),
    departureDate:joi.date().format('YYYY-MM-DD HH:mm').required(),
    arrivalDate:joi.date().format('YYYY-MM-DD HH:mm').required(),
    price:joi.number().required()
})