import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { statesSchema, citySchema } from "../schemas/cities.schemas.js";
import { createState, createCountry, createCity, searchAllCities } from "../controllers/cities.controllers.js";
import { validateCreateState, validateCreateCountry, validateCreateCity, validateStateCountry} from "../middlewares/cities.middleware.js";

const citiesRouter = Router()

citiesRouter.post("/state", validateSchema(statesSchema), validateCreateState ,createState)
citiesRouter.post("/country", validateSchema(statesSchema), validateCreateCountry ,createCountry)
citiesRouter.post("/city", validateSchema(citySchema),validateStateCountry,validateCreateCity, createCity)
citiesRouter.get("/locals", searchAllCities)

export default citiesRouter