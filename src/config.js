const Config = {
  host: '//localhost',
  port: 8001,
  getURL: (service) => {
    return `${Config.host}:${Config.port}/${service}`
  }
}

export default Config