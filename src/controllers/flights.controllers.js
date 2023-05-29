import { createCompanyDB, createFlightDB, getFlight, getFlights, getPrice } from "../repositories/flights.repository.js"

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

export async function allFlights(req, res){
    try{
        const flights = await getFlights(res)
        res.status(200).send(flights.rows)
    } catch(err){
        res.status(500).send(err.message)
    }
}

export async function rangePrice(req,res){

    const {id} = req.params
    try{
        const price = await getPrice(id)
        res.status(200).send(price.rows[0])
    }catch(err){
        res.status(500).send(err.message)
    }
}

export async function Flight(req,res){
    const {id} = req.params
    try{
        const flight = await getFlight(id)
        res.status(200).send(flight.rows[0])
    }catch(err){
        res.status(500).send(err.message)
    }
}
