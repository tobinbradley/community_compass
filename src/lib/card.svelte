<script>
  import { cards } from "$lib/store"
  import { onMount } from "svelte"
  import Map from "$lib/map.svelte"
  import Chart from "$lib/chart.svelte"
  import Tabular from "$lib/tabular.svelte"
  import Toolbar from '$lib/toolbar.svelte'

  export let card
  export let idx

  let mode = 'm'
  let year = card.years[card.years.length - 1]
  let geography
  let data

  onMount(async () => {
    // get geography
    const fetchGeograpny = await fetch('data/npa.geojson.json')
    geography = await fetchGeograpny.json()
    // get data
    const fetchData = await fetch(`data/metric/m${card.metric}.json`)
    data = await fetchData.json()
  })

  function handleChangeMode(event ) {
    mode = event.detail.mode
  }

  function handleYear(event) {
    year = event.detail.year
  }

</script>

<div
  class="bg-white shadow-lg rounded-lg flex flex-col z-0"
  style="min-height: 500px;"
>
  <!-- Title -->
  <div class="pt-2 draghandle" style="cursor: grab">
    <h2 class="text-bold text-center">{card.title}</h2>
  </div>

  <!-- content area -->
  <div class="flex-grow">
    {#if mode === "m" && geography && data}
    <Map {card} {data} {geography} {year}  on:changeYear={handleYear} />
    {/if}
  {#if mode === "c"}
    <Chart metric={card} />
  {/if}
  {#if mode === "t"}
    <Tabular metric={card} />
  {/if}
  </div>

  <!-- toolbar -->
  <Toolbar {idx} {mode} metric={card} on:changeMode={handleChangeMode} />
</div>
