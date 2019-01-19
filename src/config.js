const Config = {
  host: '//104.168.134.52',
  port: 8000,
  getURL: (service) => {
    return `${Config.host}:${Config.port}/${service}`
  }
}

export default Config