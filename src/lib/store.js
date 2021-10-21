import { writable, readable, derived } from 'svelte/store'

export let activeMetrics = writable([
    {id: 1, title: "item1"},
    {id: 2, title: "item2"},
    {id: 3, title: "item3"}
])

export let maxId = derived(activeMetrics, $activeMetrics => {
    return Math.max(...$activeMetrics.map(el => el.id))
})

export let metrics = readable([
    {
        "metric": "m1",
        "title": "Population"
    },
    {
        "metric": "m2",
        "title": "Population"
    },
    {
        "metric": "m3",
        "title": "Population"
    },
    {
        "metric": "m4",
        "title": "Population"
    },
    {
        "metric": "m5",
        "title": "Population"
    },
    {
        "metric": "m6",
        "title": "Population"
    }
])