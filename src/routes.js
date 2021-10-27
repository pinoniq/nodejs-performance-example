const bcrypt = require('bcrypt');

const delay = require('./helpers/delay');
const db = require('./helpers/db');

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

    /**
     * Database debugging
     *
     * $ autocannon -c 50 -d 10 http://localhost:6000/api/busy
     * $ 0x -P 'autocannon -c 50 -d 10 http://localhost:$PORT/api/busy' index.js
     */
    app.get('/api/busy', async (req, res) => {
        const stuff = await db.findStuff();

        res.json(stuff);
    });

    /**
     * Parallel database debugging
     *
     * $ autocannon -c 50 -d 10 http://localhost:6000/api/parallel
     * $ 0x -P 'autocannon -c 50 -d 10 http://localhost:$PORT/api/parallel' index.js
     */
    app.get('/api/parallel', async (req, res) => {
        const stuff = await db.findStuffFaster();
        const stuff1 = await db.findStuffFaster();
        const stuff2 = await db.findStuffFaster();
        const stuff3 = await db.findStuffFaster();
        const stuff4 = await db.findStuffFaster();

        res.json([stuff, stuff1, stuff2, stuff3, stuff4]); //*/

        /*
        const stuff = db.findStuffFaster();
        const stuff1 = db.findStuffFaster();
        const stuff2 = db.findStuffFaster();
        const stuff3 = db.findStuffFaster();
        const stuff4 = db.findStuffFaster();

        const allMyStuff = await Promise.all([stuff, stuff1, stuff2, stuff3, stuff4]);
        res.json(allMyStuff); //*/

    });
};