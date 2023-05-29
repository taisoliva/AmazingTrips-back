import { db } from "../database/database.js"
import dayjs from "dayjs"

export async function createCompanyDB(body) {
    const { name } = body
    const result = await db.query(`INSERT INTO companies (name)
                                    VALUES ($1)`, [name])
    return result
}

export async function createFlightDB(body, res) {
    const { departureDate, arrivalDate, price } = body
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

export async function getFlights() {

    const result = await db.query(`
        SELECT  flights.id, origem.name AS "Origem", destino.name AS "Destino",
		companies.name AS "company", flights."departureDate", 
		flights."arrivalDate", flights.price
		FROM flights
		JOIN cities AS origem ON flights."departureCityId" = origem.id
		JOIN cities AS destino ON flights."destinationCityId" = destino.id
		JOIN companies ON flights."companyId" = companies.id;
        `)

    setInterval(() => {
        removeItems()
    }, 60000)
    return result

}

async function removeItems() {
    await db.query(`DELETE FROM flights WHERE "departureDate" < NOW()`)
}

export async function getPrice(id) {
    const result = await db.query(`
    SELECT MIN(price) AS menor_valor, MAX(price) AS maior_valor FROM flights 
		JOIN cities ON cities.id = flights."destinationCityId" 
		WHERE cities.name = $1;
    `, [id])
    return result
}

export async function getFlight(id) {
    const result = await db.query(`
    SELECT  origem.name AS "Origem", destino.name AS "Destino",
    companies.name AS "company", flights."departureDate", 
    flights."arrivalDate", flights.price
    FROM flights
    JOIN cities AS origem ON flights."departureCityId" = origem.id
    JOIN cities AS destino ON flights."destinationCityId" = destino.id
    JOIN companies ON flights."companyId" = companies.id
    WHERE flights.id = $1;
    `, [id])

    return result
}