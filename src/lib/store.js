import { writable, readable, derived } from 'svelte/store'
import dataConfig from '$lib/data/community-config.json'
import npaGeography from '$lib/data/npa.geojson.json'
import data from '$lib/data/community-data.json'

function assignId(metric, idx) {
  let newElem = Object.assign({}, metric)
  newElem.id = idx
  return newElem
}

export let activeMetrics = writable([
    assignId(dataConfig[1], 1),
    assignId(dataConfig[2], 2),
    assignId(dataConfig[3], 3)
])

export let geography = readable({
  npaGeography: npaGeography
})

export let metricData = readable(data)

export let maxId = derived(activeMetrics, $activeMetrics => {
    return Math.max(...$activeMetrics.map(el => el.id))
})

export let metrics = readable(dataConfig)
