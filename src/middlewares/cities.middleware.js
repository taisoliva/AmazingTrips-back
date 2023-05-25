
import { searchStateDB, searchCountryDB, searchCityDB, joinStateCountry } from "../repositories/cities.repository.js"

export async function validateCreateState(req, res, next){
    try{
        const state = await searchStateDB(req.body)
        if(state.rowCount !== 0) return res.status(409).send({message: "Estado já cadastrado!"})
        next()   
    } catch(err){
        if(err.code === '23505' && err.constraint === 'states_name_key') return res.status(409).send({message: "Estado já cadastrado!"})
        res.status(500).send(err.message)
    }
}

export async function validateCreateCountry(req, res, next){
    try{
        const state = await searchCountryDB(req.body)
        if(state.rowCount !== 0) return res.status(409).send({message: "País já cadastrado!"})
        next()   
    } catch(err){
        if(err.code === '23505' && err.constraint === 'country_name_key') return res.status(409).send({message: "Estado já cadastrado!"})
        res.status(500).send(err.message)
    }
}

export async function validateStateCountry(req, res, next){
    try{
        const check = await joinStateCountry(req.body)
        if(!check.rows[0]) return res.status(404).send({message: "País ou cidade não cadastrados!"})
        next()
    } catch(err){
        return res.status(500).send(err.message)
    }
}

export async function validateCreateCity(req, res, next){
    try{
        const city = await searchCityDB(req.body)
        if(city.rowCount !== 0 ) return res.status(409).send({message: "Cidade já cadastrada!"})
        next()

    } catch(err){
        if(err.code === '23505' && err.constraint === 'cities_name_key') return res.status(409).send({message: "Estado já cadastrado!"})
        res.status(500).send(err.message)
    }
}
