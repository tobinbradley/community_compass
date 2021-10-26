import { writable, readable, derived } from 'svelte/store'
import dataConfig from '$lib/data/community-config.json'


function assignId(metric, idx) {
  let newElem = Object.assign({}, metric)
  newElem.id = idx
  return newElem
}

export let cards = writable([
    assignId(dataConfig[1], 1),
    assignId(dataConfig[2], 2),
    assignId(dataConfig[3], 3)
])

export let maxId = derived(cards, $cards => {
  return Math.max(...$cards.map(el => el.id))
})

export let metrics = readable(dataConfig)

cards.subscribe(value => {
  console.log(value)
})
