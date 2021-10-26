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

</script>

<div
  class="bg-white shadow-lg rounded-lg flex flex-col z-0"
  style="height: 500px;"
>
  <!-- Title -->
  <div class="p-2 draghandle" style="cursor: grab">
    <h2 class="text-bold text-center">{card.title}</h2>
  </div>

  <!-- content area -->
  <div class="flex-grow">
    {#if mode === "m" && geography && data}
    <Map {card} {data} {geography} />
  {/if}
  {#if mode === "c"}
    <Chart {card} />
  {/if}
  {#if mode === "t"}
    <Tabular {card} />
  {/if}
  </div>

  <!-- toolbar -->
  <Toolbar {idx} {mode} on:changeMode={handleChangeMode} />
</div>
