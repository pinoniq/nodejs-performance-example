
module.exports = (app) => {
    app.get('/', (req, res) => {
        res.json({
            message: 'Much speed, such awesome',
        });
    })
};