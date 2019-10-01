const Joi = require('@hapi/joi');
const UserModel = require('../models/users');

class UserController {
    async getAll(req, res) {
        try {
            const cursor = await UserModel.findAll();
            const result = [];
            while (cursor.hasNext()) {
                const { name, username, mobile, email, active } = await cursor.next();
                result.push({ username, name, mobile, email, active });
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
        const { userId } = req.params;
        try {
            const result = await UserModel.document(userId);
            const { id, username, name, mobile, email, active, clockedIn } = result;
            res.json({ id, username, name, mobile, email, active, clockedIn });
        } catch (err) {
            res.status(500);
            res.json({
                errorMessage: 'Something went wrong!',
            });
        }
    }

    create(req, res) {
        const { name, username, mobile, email } = req.body;
        const _key = username;
        const schema = Joi.object().keys({
            _key: Joi.string().required(),
            name: Joi.string().required(),
            username: Joi.string().required(),
            mobile: Joi.string(),
            email: Joi.string().email({ minDomainSegments: 2 }).required(),
            active: Joi.boolean().required(),
        });

        const document = {
            _key,
            username,
            name,
            mobile,
            email,
            active: false,
        }

        Joi.validate(document, schema, { allowUnknown: false }, async function (err, value) {
            if (!err) {
                const result = await UserModel.save(value);
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

    async delete(req, res) {
        const { userId } = req.params;
        try {
            await UserModel.delete(userId);
            res.status(202);
            res.json({
                msg: 'Record Deleted successfully',
            })
        } catch (err) {
            res.status(400);
            res.json({
                err,
            });
        }
    }

    update(req, res) {
        const { userId } = req.params;
        const { name, mobile, email, active, clockedIn } = req.body;
        const schema = Joi.object().keys({
            name: Joi.string(),
            mobile: Joi.string(),
            email: Joi.string().email({ minDomainSegments: 2 }),
            clockedIn: Joi.boolean(),
            active: Joi.boolean(),
        });

        const document = {
            name,
            mobile,
            email,
            active,
            clockedIn,
        }

        Joi.validate(document, schema, { allowUnknown: false }, async function (err, value) {
            if (!err) {
                const result = await UserModel.update(userId, value);
                res.status(200);
                res.json({
                    result
                });
            } else {
                res.status(400);
                res.json({
                    err,
                });
            }
        });
    }
}

module.exports = new UserController();