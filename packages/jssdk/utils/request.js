const request = (url, callback) => {
  const req = new XMLHttpRequest()

  req.open('GET', url, true)

  req.onreadystatechange = function() {
    if (req.readyState === 4) {
      if (req.status === 200 || req.status === 304) {
        callback(req.responseText)
      } else if (req.status === 404) {
        throw new Error(`Not Found: ${url}`)
      } else {
        throw new Error(`status: ${req.status}\nstatusText: ${req.statusText}\nurl: ${url}`)
      }
    }
  }

  return req.send(null)
}

export default request