import { getCommodities, getHotels, getPhotos } from "../repositories/hotels.repository.js"


export async function allHotels(req,res){
    try{
        const hotels = await getHotels()
        res.status(200).send(hotels.rows)
    }catch(err){
        res.status(500).send(err.message)
    }

}

export async function allCommodities(req,res){

    const {id} = req.params
    try{
        const result = await getCommodities(id)
        res.status(200).send(result.rows)
    } catch(err){
        res.status(500).send(err.message)
    }
}

export async function photos(req, res){
    const {id} = req.params
    try{
        const result = await getPhotos(id)
        res.status(200).send(result.rows)
    }catch(err){
        res.status(500).send(err.message)
    }
}