import store from './utils/store'
import request from './utils/request'

const STORE_KEY = 'WEBPATCH'

class Wetpatch {
  constructor(fileMap) {
    this.fileMap = fileMap
    this.storeMap = {}

    this.init()
  }

  init() {
    this.checkStore()
  }

  checkStore() {
    const storeMap = store.get(STORE_KEY)
    if (!storeMap) {
      store.set(STORE_KEY, "{}")
      return
    }

    this.storeMap = JSON.parse(storeMap)
  }

  createFileRequest(filename) {
    const script = document.createElement('script')
    script.src = filename
    document.body.append(script)
  }
}

export default Wetpatch