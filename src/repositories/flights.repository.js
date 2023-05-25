import {db} from "../database/database.js"

export async function createCompanyDB(body){
    const {name} = body
    const result = await db.query(`INSERT INTO companies (name)
                                    VALUES ($1)`, [name])
    return result
}

export async function createFlightDB(body, res){
    const {departureDate, arrivalDate, price } = body
    const result = await db.query(`INSERT INTO flights ("departureCityId", 
                                                        "destinationCityId", 
                                                        "companyId",
                                                        "departureDate",
                                                        "arrivalDate",
                                                        "price" )
                                        VALUES ($1, $2, $3, $4, $5, $6)`, 
                                        [res.locals.cidades[0].id, res.locals.cidades[1].id, res.locals.companies.id, departureDate, arrivalDate, price])
    return result
}