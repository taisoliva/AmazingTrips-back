import { createStateDB, createCountryDB, createCityDB, getAllCities } from "../repositories/cities.repository.js"

export async function createState(req, res){
    try{
        await createStateDB(req.body)
        res.sendStatus(201)
    }catch(err){
        res.status(500).send(err.message)
    }
}

export async function createCountry(req, res){
    try{
        await createCountryDB(req.body)
        res.sendStatus(201)
    } catch(err){
        res.status(500).send(err.message)
    }
}

export async function createCity(req, res){
    try{
        await createCityDB(req.body)
        res.sendStatus(201)
    } catch(err){
        res.status(500).send(err.message)
    }
}

export async function searchAllCities(req,res){
    try{
        const cities = await getAllCities()
        res.send(cities.rows)
    }catch(err){
        return res.status(500).send(err.message)
    }
}