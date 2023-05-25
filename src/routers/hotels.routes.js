import {Router} from "express";

const hotelsRouter = Router()

hotelsRouter.post("/hotels")
hotelsRouter.post("/photos")
hotelsRouter.post("/commodities")
hotelsRouter.get("/hotels")
hotelsRouter.get("/hotels/:id")

export default hotelsRouter