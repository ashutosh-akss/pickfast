const Joi = require('@hapi/joi');
const StoreModel = require('../models/stores');

class StoreController {
    async getAll(req, res) {
        try {
            const cursor = await StoreModel.findAll();
            const result = [];
            while (cursor.hasNext()) {
                const { id, name, address, city, country, zip, geo_location } = await cursor.next();
                result.push({ id, name, address, city, country, zip, geo_location });
            }
            res.json(result)
        } catch (err) {
            res.status(400);
            res.json({
                errorMessage: 'Record not found',
                err
            })
        }
    }

    async get(req, res) {
        const { storeId } = req.params;
        try {
            const result = await StoreModel.document(storeId);
            const { id, name, address, city, country, zip, geo_location, about } = result;
            res.json({ id, name, address, city, country, zip, geo_location, about });
        } catch (err) {
            res.status(500);
            res.json({
                errorMessage: 'Something went wrong!',
            });
        }
    }

    create(req, res) {
        const { id, name, address, city, country, zip, geo_location } = req.body;
        const _key = id;
        const schema = Joi.object().keys({
            _key: Joi.string().required(),
            id: Joi.string().required(),
            name: Joi.string().required(),
            address: Joi.string().required(),
            city: Joi.string().required(),
            country: Joi.string().required(),
            zip: Joi.number(),
            geo_location: Joi.string(),
            about: Joi.string(),
            active: Joi.boolean().required(),
        });

        const document = {
            _key,
            id,
            name,
            address,
            city,
            country,
            zip,
            geo_location,
            active: false,
        }

        Joi.validate(document, schema, { allowUnknown: false }, async function (err, value) {
            if (!err) {
                const result = await StoreModel.save(value);
                res.status(200);
                res.json({
                    result
                });
            } else {
                res.status(400);
                res.json({
                    err,
                })
            }
        });
    }

    update(req, res) {
        const { storeId } = req.params;
        const { name, address, city, country, zip, geo_location, about } = req.body;
        const schema = Joi.object().keys({
            name: Joi.string(),
            address: Joi.string(),
            city: Joi.string(),
            country: Joi.string(),
            zip: Joi.number(),
            about: Joi.string(),
            geo_location: Joi.string(),
        });

        const document = {
            name,
            address,
            city,
            country,
            zip,
            about,
            geo_location,
        }

        Joi.validate(document, schema, { allowUnknown: false }, async function (err, value) {
            console.log('ABOPUT TO UPDATE : ', value)
            if (!err) {
                const result = await StoreModel.update(storeId, value);
                res.status(200);
                res.json({
                    result
                });
            } else {
                res.status(400);
                res.json({
                    err,
                })
            }
        });
    }
}

module.exports = new StoreController();