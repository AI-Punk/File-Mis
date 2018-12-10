const Config = {
  host: '//localhost',
  port: 8080,
  getURL: (service) => {
    return `${Config.host}:${Config.port}/${service}`
  }
}

export default Config