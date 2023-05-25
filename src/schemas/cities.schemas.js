import joiBase from "joi"
import joiDate from "@joi/date"

const joi = joiBase.extend(joiDate)

export const statesSchema = joi.object(
    {
        name: joi.string().required(),
        sigla: joi.string().required()
    }
)

export const citySchema = joi.object({
    name:joi.string().required(),
    stateId: joi.number().integer().required(),
    countryId: joi.number().integer().required()
})