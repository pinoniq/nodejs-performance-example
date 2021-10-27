const asyncDelay = async (delay) => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            delay,
        });
    }, delay);
});

const blockingDelay = async (delay) => new Promise((resolve, reject) => {
    const start = Date.now();

    while(true) {
        if (Date.now() - start >= delay) {
            break;
        }
    }

    return resolve({
        delay,
    });
});

module.exports = {
    blocking: blockingDelay,
    async: asyncDelay,
}