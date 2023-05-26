import { db } from "../database/database.js"
import dayjs from "dayjs";

export async function createStateDB(body) {
    const { name, sigla } = body
    await db.query(
        `INSERT INTO states (name, sigla) 
                VALUES ($1,$2);`, [name, sigla]
    );
}

export async function searchStateDB(body) {
    const { name } = body
    const result = await db.query("SELECT * FROM states WHERE name=$1", [name]);
    return result
}

export async function createCountryDB(body) {
    const { name, sigla } = body
    await db.query(`
        INSERT INTO country (name, sigla) VALUES ($1,$2)
    `, [name, sigla])
}

export async function searchCountryDB(body) {
    const { name } = body
    const result = await db.query("SELECT * FROM country WHERE name=$1", [name]);
    return result
}

export async function createCityDB(body) {
    const { name, stateId, countryId } = body
    await db.query(` INSERT INTO cities (name, "stateId", "countryId")
                        VALUES ($1, $2, $3)`, [name, stateId, countryId])
}

export async function searchCityDB(body) {

    const { name, stateId, countryId } = body
    const result = await db.query(`SELECT * FROM cities WHERE name = $1`, [name])
    return result
}

export async function joinStateCountry(body) {

    const { name, stateId, countryId } = body
    const result = await db.query(`SELECT * FROM states 
	                                JOIN country on country.id = $1
	                                WHERE states.id = $2;`, [countryId, stateId])
    return result
}

export async function getAllCities(){

    const result = await db.query(`
            SELECT cities.id, cities.name, states.name AS "stateName",states.sigla AS "stateSigla", 
            country.name AS "countryName", country.sigla AS "countrySigla"
            FROM cities
            JOIN states ON cities."stateId" = states.id
            JOIN country ON cities."countryId" = country.id;
    `)

    return result
}

