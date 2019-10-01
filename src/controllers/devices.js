const Joi = require('@hapi/joi');
const DeviceModel = require('../models/devices');

class DevicesController {

    async getAll(req, res) {
        try {
            const cursor = await DeviceModel.findAll();
            const result = [];
            while (cursor.hasNext()) {
                const { id, name, type, mac, added_on, online, active } = await cursor.next();
                result.push({ id, name, type, mac, added_on, online, active });
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

    async delete(req, res) {
        res.json({
            status: 200,
        })
    }

    async get(req, res) {
        const { deviceId } = req.params;
        try {
            const result = await DeviceModel.document(deviceId);
            const { id, name, type, mac, added_on, online, active } = result;
            res.json({ id, name, type, mac, added_on, online, active });
        } catch (err) {
            res.status(500);
            res.json({
                errorMessage: 'Something went wrong!',
            });
        }
    }

    create(req, res) {
        const { mac, name, type, added_on } = req.body;
        const _key = mac;
        const schema = Joi.object().keys({
            _key: Joi.string().required(),
            mac: Joi.string().required(),
            name: Joi.string().required(),
            type: Joi.string().required(),
            added_on: Joi.date().required(),
            active: Joi.boolean().required(),
        });

        const document = {
            _key,
            mac,
            name,
            type,
            added_on,
            active: false,
        }

        Joi.validate(document, schema, { allowUnknown: false }, async function (err, value) {
            if (!err) {
                const result = await DeviceModel.save(value);
                res.status(201);
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
        const { deviceId } = req.params;
        const { name, type, active, added_on } = req.body;
        const schema = Joi.object().keys({
            name: Joi.string(),
            type: Joi.string(),
            added_on: Joi.date(),
            active: Joi.boolean(),
        });

        const document = {
            name,
            type,
            added_on,
            active,
        }

        Joi.validate(document, schema, { allowUnknown: false }, async function (err, value) {
            if (!err) {
                const result = await DeviceModel.update(deviceId, value);
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

module.exports = new DevicesController();