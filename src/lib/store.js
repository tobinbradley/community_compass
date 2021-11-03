import { writable, readable, derived } from 'svelte/store'
import dataConfig from '$lib/data/config.json'
import { browser } from "$app/env"

// assign ID for draggable grid
function assignId(metric, idx) {
  let newElem = Object.assign({}, metric)
  newElem.id = idx
  return newElem
}

// initial cards
let startCards = []
if (browser) {
  const args = window.location.hash.replace('#', '').split(',')
  if (args[0].length > 0 && !args.some(isNaN)) {
    startCards = []
    args.forEach((arg, idx) => {
      let metric = dataConfig.filter(el => el.metric == arg)
      if (metric.length === 1) {
        startCards.push(assignId(metric[0], idx + 1))
      }
    })
  } else {
    startCards = [
      assignId(dataConfig.filter(el => el.metric == 39)[0], 1),
      assignId(dataConfig.filter(el => el.metric == 54)[0], 2),
      assignId(dataConfig.filter(el => el.metric == 20)[0], 3)
    ]
  }
}

// initial cards
export let cards = writable(startCards)

// get max card ID to assign the next one
export let maxId = derived(cards, $cards => {
  return Math.max(...$cards.map(el => el.id))
})

// set window hash
cards.subscribe(value => {
  if (browser) {
    history.replaceState(null, null, `#${value.map(el => el.metric).join(',')}`)
  }
})

// metric configuration
export let metrics = readable(dataConfig)

// print styling toggle
export let print = writable(false)

// toggle Help
export let help = writable(false)

// print.subscribe(value => {
//   console.log(value)
// })
