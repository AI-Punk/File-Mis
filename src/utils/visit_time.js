// 封装了一些关于访问时间的函数
export let setTime = (leftTime) => {
    let timeObj = getItem("time") || {}
    // 1.8E6
    // if (timeObj.leftTime != undefined) {
    //     leftTime = timeObj.leftTime >= 0 ? timeObj.leftTime : leftTime ||  600000 
    // }
    timeObj["leftTime"] = leftTime || timeObj.leftTime || 600000
    timeObj["entryTimeStamp"] = Date.now()
    setItem("time", timeObj)
    startInterVal()
    window.onunload = close
}

let startInterVal = () => {
    let leftTime = getItem("time").leftTime
    leftTime = leftTime >= 0 ? leftTime : 0
    let timer = setInterval(() => {
        let timeObj = getItem("time") || {}
        // timeObj["leftTime"] = 0
        // setItem("time", timeObj)
        window.location.assign("/#/entry")
        clearInterval(timer)
        localStorage.removeItem("time")
    }, leftTime)
}
// 关闭浏览器事件
let close = () => {
    let timeObj = getItem("time") || {}
    let startTime = timeObj.entryTimeStamp
    let interval = Date.now() - startTime
    let leftTime = timeObj.leftTime - interval
    timeObj["leftTime"] = leftTime
    setItem("time", timeObj)
}

let getItem = (item) => {
    return JSON.parse(localStorage.getItem(item))
}
let setItem = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val))
}
