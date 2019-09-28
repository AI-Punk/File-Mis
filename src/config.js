const Config = {
  host: '//lvmaozi.info',
//   host: '//localhost',
  port: 8001,
  // port: 8080,
  getURL: (service) => {
    return `${Config.host}:${Config.port}/${service}`
  }
}

export default Config
