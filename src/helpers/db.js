const delay = require('./delay');

module.exports = {
    findStuff: async () => {
        await delay.blocking(50);

        return {
            id: 1337,
            cool: 'stuff',
        };
    },

    findStuffFaster: async () => {
        await delay.async(50);

        return {
            id: 1337,
            cool: 'stuff',
        };
    }
}