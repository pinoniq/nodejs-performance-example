const bcrypt = require('bcrypt');

const delay = require('./helpers/delay');

module.exports = (app) => {
    /**
     * Nothing much to do here. This endpoint acts more as a baseline.
     *
     * $ autocannon -c 50 -d 10 http://localhost:6000
     */
    app.get('/', (req, res) => {
        res.json({
            message: 'Much speed, such awesome',
        });
    });

    /**
     * bcrypt is an asynchronous function and thus uses the event loop.
     * this means that we can run in on multiple threads.
     * Tweaking these threads is done using the UV_THREADPOOL_SIZE environment variable
     * @see ecosystem.config.js
     *
     * $ autocannon -c 50 -d 10 http://localhost:6000/bcrypt
     */
    app.get('/bcrypt', async (req, res) => {
        const hash = await bcrypt.hash('this is a very secure password', 10);
        res.json({
            hash,
            'UV_THREADPOOL_SIZE': process.env.UV_THREADPOOL_SIZE,
        });
    });

    /**
     * Pure async function using the event-loop
     *
     * $ autocannon -c 50 -d 10 http://localhost:6000/delay/async
     */
    app.get('/delay/async', async (req, res) => {
        const result = await delay.async(500);

        res.json(result);
    });

    /**
     * Busy weight using the node process
     *
     * $ autocannon -c 50 -d 10 http://localhost:6000/delay/blocking
     */
    app.get('/delay/blocking', async (req, res) => {
        const result = await delay.blocking(500);

        res.json(result);
    });
};