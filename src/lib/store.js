import { writable, readable, derived } from 'svelte/store'
import dataConfig from './data/config.json'

dataConfig.sort((a, b) => a.title > b.title ? 1 : -1 )

// assign ID for draggable grid
function assignId(metric, idx, mode = 'm') {
  let newElem = Object.assign({}, metric)
  newElem.id = idx
  newElem.mode = mode
  return newElem
}

// initial cards
let startCards = []

  const args = window.location.hash.replace('#', '').split(',')
  if (args[0].length > 0) {
    startCards = []
    args.forEach((arg, idx) => {
      let argArray = arg.split('|')
      let metric = dataConfig.filter(el => el.metric == argArray[0])
      if (metric.length === 1) {
        if (argArray.length === 1) {
          startCards.push(assignId(metric[0], idx + 1))
        } else {
          startCards.push(assignId(metric[0], idx + 1, argArray[1]))
        }
      }
    })
  } else {
    startCards = [
      assignId(dataConfig.filter(el => el.metric == 'm39')[0], 1),
      assignId(dataConfig.filter(el => el.metric == 'm54')[0], 2),
      assignId(dataConfig.filter(el => el.metric == 'm20')[0], 3)
    ]
  }

// initial cards
export let cards = writable(startCards)

// get max card ID to assign the next one
export let maxId = derived(cards, $cards => {
  return Math.max(...$cards.map(el => el.id))
})

// set window hash
cards.subscribe(value => {
    history.replaceState(null, null, `#${value.map(el => `${el.metric}|${el.mode}`).join(',')}`)
})

// metric configuration
export let metrics = readable(dataConfig)

// print styling toggle
export let print = writable(false)

// toggle Help
export let help = writable(false)

// toast
export let toastMessage = writable({
  message: "",
  messageType: "success",
  loadDelay: 1000,
  dismissDelay: 5000,
  reloadButton: false
})

// print.subscribe(value => {
//   console.log(value)
// })
