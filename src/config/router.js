const controllers = require('../controllers');
const constants = require('../constants');
const { auth, devices, stores, users, setup } = controllers;
const { router } = constants;

module.exports = {
    setup: [
        {
            method: router.POST,
            path: '/',
            headers: {},
            controller: setup.setup,
        },
        {
            method: router.DELETE,
            path: '/',
            headers: {},
            controller: setup.reset,
        },
    ],
    auth: [
        {
            method: router.POST,
            path: '/login',
            headers: {},
            controller: auth.login,
        },
        {
            method: router.POST,
            path: '/signup',
            headers: {},
            controller: auth.signup,
        },
        {
            method: router.GET,
            path: '/forgot-password',
            headers: {},
            controller: auth.forgotPassword,
        },
        {
            method: router.POST,
            path: '/reset-password',
            headers: {},
            controller: auth.resetPassword,
        }
    ],
    devices: [
        {
            method: router.GET,
            path: '/',
            headers: {},
            controller: devices.getAll,
        },
        {
            method: router.POST,
            path: '/',
            headers: {},
            controller: devices.create,
        },
        {
            method: router.GET,
            path: '/:deviceId',
            headers: {},
            controller: devices.get,
        },
        {
            method: router.PUT,
            path: '/:deviceId',
            headers: {},
            controller: devices.update,
        },
        {
            method: router.DELETE,
            path: '/:deviceId',
            headers: {},
            controller: devices.delete,
        }
    ],
    users: [
        {
            method: router.GET,
            path: '/',
            headers: {},
            controller: users.getAll,
        },
        {
            method: router.POST,
            path: '/',
            headers: {},
            controller: users.create,
        },
        {
            method: router.PUT,
            path: '/:userId',
            headers: {},
            controller: users.update,
        },
        {
            method: router.GET,
            path: '/:userId',
            headers: {},
            controller: users.get,
        },
        {
            method: router.DELETE,
            path: '/:userId',
            headers: {},
            controller: users.delete,
        },
    ],
    stores: [
        {
            method: router.GET,
            path: '/',
            headers: {},
            controller: stores.getAll,
        },
        {
            method: router.POST,
            path: '/',
            headers: {},
            controller: stores.create,
        },
        {
            method: router.GET,
            path: '/:storeId',
            headers: {},
            controller: stores.get,
        },
        {
            method: router.PUT,
            path: '/:storeId',
            headers: {},
            controller: stores.update,
        },
    ]
}