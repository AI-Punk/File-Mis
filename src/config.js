const Config = {
  host: '//ooer.space',
  port: 8000,
  getURL: (service) => {
    return `${Config.host}:${Config.port}/${service}`
  }
}

export default Config