import { createCompanyDB, createFlightDB } from "../repositories/flights.repository.js"

export async function createCompany(req, res){
    try{
       await createCompanyDB(req.body)
       res.sendStatus(201)
    } catch(err){
        res.status(500).send(err.message)
    }
}

export async function createFlight(req, res){
    try{
        await createFlightDB(req.body, res)
        res.sendStatus(201)
    }catch(err){
        res.status(500).send(err.message)
    }
}