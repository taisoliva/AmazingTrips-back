import { db } from "../database/database.js";

export async function getHotels() {
    const result = await db.query(`
    SELECT hotels.id, hotels.name AS "Name", hotels.description AS "Descrição",
        photos.url, hotels.price, cities.name
        FROM hotels 
        JOIN photos ON photos.id = hotels."mainPhoto"
        JOIN cities ON cities.id = hotels."cityId";
    `)

    return result
}

export async function getCommodities(id) {
    const result = await db.query(`
    SELECT commodities.id, commodities."hotelId", commodity.name 
    FROM commodities
    JOIN commodity ON commodity.id = commodities."commodityId"
    WHERE commodities."hotelId" = $1;
    `, [id])

    return result
}

export async function getPhotos(id) {
    const result = await db.query(`
    SELECT hotels.id, photos.url
	FROM hotels
	JOIN photos ON photos."hotelId" = hotels.id
	WHERE hotels.id = $1;
    `, [id])

    return result
}
