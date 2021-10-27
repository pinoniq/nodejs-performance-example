
module.exports = (app) => {
    // $ autocannon -c 50 -d 10 http://localhost:6000
    app.get('/', (req, res) => {
        res.json({
            message: 'Much speed, such awesome',
        });
    })
};