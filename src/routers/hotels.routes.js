import {Router} from "express";
import { allCommodities, allHotels, photos } from "../controllers/hotels.controller.js";

const hotelsRouter = Router()

hotelsRouter.get("/hotels", allHotels)
hotelsRouter.get("/hotels/:id",allCommodities)
hotelsRouter.get("/photos/:id",photos)


export default hotelsRouter