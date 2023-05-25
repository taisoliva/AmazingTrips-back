import { db } from "../database/database.js"

export async function validateCreateCompany(req, res, next) {

    const { name } = req.body
    try {
        const company = await db.query(`SELECT * FROM companies WHERE name=$1`, [name])
        if (company.rowCount !== 0) return res.status(409).send({ message: "Companhia aérea já criada" })
        next()
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function validateFlight(req, res, next) {

    const { cidade1, cidade2, company, departureDate, arrivalDate, price } = req.body

    try {
        const cidades = await db.query(`SELECT * FROM cities WHERE name=$1 OR name=$2
                                        ORDER BY CASE WHEN name=$1 
                                        THEN 0 WHEN name=$2 THEN 1 END;`, [cidade1, cidade2])
        if (cidades.rowCount !== 2) {
            if (cidade1 === cidade2) return res.status(409).send({ message: "Cidade de origem e destino iguais" })
            return res.status(404).send({ message: "Uma das cidades não foi encontrada!" })
        }

        const companies = await db.query(`SELECT * FROM companies WHERE name=$1`, [company])
        if(companies.rowCount === 0) return res.status(404).send({message: "Companhia aérea não encontrada"})

        if(departureDate.split(" ")[1] === arrivalDate.split(" ")[1]) return res.status(404).send({message: "Horário de partida e chegada estão iguais"})
        res.locals.cidades = cidades.rows
        res.locals.companies = companies.rows[0]
        next()
    } catch (err) {
        return res.status(500).send(err.message)
    }


}
