import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { companySchema, flightSchema } from "../schemas/flights.schemas.js";
import { validateCreateCompany, validateFlight } from "../middlewares/flights.middleware.js";
import { createCompany, createFlight } from "../controllers/flights.controllers.js";


const flightsRouter = Router()

flightsRouter.post("/company", validateSchema(companySchema), validateCreateCompany, createCompany )
flightsRouter.post("/flights", validateSchema(flightSchema), validateFlight ,createFlight)
flightsRouter.get("/flights")

export default flightsRouter