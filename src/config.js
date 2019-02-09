const Config = {
  host: '//lvmaozi.info',
  port: 8000,
  // port: 49509,
  getURL: (service) => {
    return `${Config.host}:${Config.port}/${service}`
  }
}

export default Config