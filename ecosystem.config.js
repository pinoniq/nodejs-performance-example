module.exports = {
  apps : [{
    name   : "app",
    script : "./index.js",
    instances: 1,
    exec_mode: 'cluster',
    env: {
      'UV_THREADPOOL_SIZE': 4,
    }
  }]
}
