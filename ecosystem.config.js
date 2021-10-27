module.exports = {
  apps : [{
    name   : "app",
    script : "./index.js",
    env: {
      'UV_THREADPOOL_SIZE': 4,
    }
  }]
}
