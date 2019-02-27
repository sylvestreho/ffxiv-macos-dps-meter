let Tail = require('tail').Tail
let tail

const state = {
  dps: 0,
  dpsMax: 10000,
  dpsPercentage: 0,
  logs: ''
}

const mutations = {
  DPS_UPDATE (state, dps) {
    state.dps = dps
    state.dpsPercentage = Math.floor(dps / state.dpsMax * 100)
  },
  LOG_RESET (state) {
    state.logs = ''
  },
  LOG_UPDATE (state, line) {
    state.logs = line + '<br/>' + state.logs
  }
}

const actions = {
  updateDps ({ commit }) {
    commit('DPS_UPDATE', 0)
    commit('LOG_RESET')
    let filename = '/Users/sylvestre/Projects/ffxiv-mac-os-dpsmeter/static/00000000.log'
    let fs = require('fs')

    if (!fs.existsSync(filename)) fs.writeFileSync(filename, '')

    if (typeof (tail) !== 'undefined') {
      tail.unwatch()
    }
    tail = new Tail(filename)
    const dpsTimeout = 15 // after X seconds dps is recalculated

    let currentTimestamp
    let lastTimestamp = Math.floor(Date.now() / 1000)
    let timeElapsed = 1
    let dpsTimebase = 1
    let stackedDamage = 0
    let dps = 0

    tail.on('line', function (data) {
      let re = /subit (\d+) points/
      let matches = data.match(re)
      if (!matches) {
        return false
      }
      console.log(matches[1])
      let damage = parseInt(matches[1])
      commit('LOG_UPDATE', damage)
      currentTimestamp = Math.floor(Date.now() / 1000)
      timeElapsed = currentTimestamp - lastTimestamp
      // timeout
      if (timeElapsed > dpsTimeout || stackedDamage === 0) {
        timeElapsed = 1
        dpsTimebase = 0
        stackedDamage = 0
      }
      stackedDamage += damage
      dpsTimebase += timeElapsed
      dps = Math.floor(stackedDamage / dpsTimebase)
      commit('DPS_UPDATE', dps)
      lastTimestamp = currentTimestamp
    })
    tail.watch()
  }
}

export default {
  state,
  mutations,
  actions
}
