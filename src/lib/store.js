import { writable, readable, derived } from 'svelte/store'
import dataConfig from '$lib/data/config.json'

// assign ID for draggable grid
function assignId(metric, idx) {
  let newElem = Object.assign({}, metric)
  newElem.id = idx
  return newElem
}

// initial cards
export let cards = writable([
    assignId(dataConfig[1], 1),
    assignId(dataConfig[2], 2),
    assignId(dataConfig[3], 3)
])

// get max card ID to assign the next one
export let maxId = derived(cards, $cards => {
  return Math.max(...$cards.map(el => el.id))
})

// metric configuration
export let metrics = readable(dataConfig)

// print styling toggle
export let print = writable(false)

export let modal = writable({
  isOpen: false,
  content: null
})

// print.subscribe(value => {
//   console.log(value)
// })
