<script>
  import { onMount } from "svelte"
  import { cards } from '$lib/store'
  import Map from "$lib/map.svelte"
  import Chart from "$lib/chart.svelte"
  import Tabular from "$lib/tabular.svelte"
  import Toolbar from "$lib/toolbar.svelte"
  import { download } from "./common"


  export let idx

  const card = $cards[idx]
  let year = card.years[card.years.length - 1]
  let geography
  let data
  let mapFunctions
  let chartFunctions

  $: mode = $cards[idx].mode

  onMount(async () => {
    // get geography
    const fetchGeograpny = await fetch(card.geography || "data/npa.geojson.json")
    geography = await fetchGeograpny.json()
    // get data
    const fetchData = await fetch(`data/metric/m${card.metric}.json`)
    data = await fetchData.json()
  })

  function handleChangeMode(event) {
    //mode = event.detail.mode
    $cards[idx].mode = event.detail.mode
    $cards = $cards
  }

  function handleYear(event) {
    year = event.detail.year
  }

  function handleDownload(event) {
    //csv
    if (event.detail.type === "csv") {
      const header = []
      const keys = Object.keys(data)
      let body = ""

      header.push("GEOID")
      header.push(...card.years)

      keys.forEach((key) => {
        const row = [key, ...data[key]]
        body += row.join(",") + "\n"
      })

      download(
        header.join(",") + "\n" + body,
        "data:text/csv;charset=utf-8;",
        `${card.title}.csv`
      )
    }

    // Summary CSV
    if (event.detail.type === "summary") {
      const header = []
      const keys = Object.keys(card.summary)
      let body = ""

      header.push("GEOID")
      header.push(...card.years)

      keys.forEach((key) => {
        const row = [key.replace('cc', 'county commission district '), ...card.summary[key]]
        body += row.join(",") + "\n"
      })

      download(
        header.join(",") + "\n" + body,
        "data:text/csv;charset=utf-8;",
        `${card.title} Summary.csv`
      )
    }

    // geojson
    if (event.detail.type === "geojson") {
        const outGeoJSON = JSON.parse(JSON.stringify(geography))

        outGeoJSON.features.forEach(elem => {
          elem.properties = {}
          card.years.forEach(year => {
            elem.properties[year] = data[elem.id][card.years.indexOf(year)]
          })
        })

        download(JSON.stringify(outGeoJSON), 'data:text/json;charset=utf-8;', `${card.title}.geojson`)
    }

    // map image
    if (event.detail.type === "map") {
      const img = mapFunctions.exportImage()
      download(img, null, `${card.title}.png`)
    }

    if (event.detail.type === "chart") {
      chartFunctions.exportImage()
    }
  }
</script>

<div
  class="bg-white shadow-lg print:shadow-none rounded-lg flex flex-col z-0"
  style="height: 540px; page-break-inside: avoid;"
>
  <!-- Title -->
  <div class="py-2 relative draghandle z-0" style="cursor: grab">
    <h2 class="text-bold text-center">{card.title}, {year}</h2>
  </div>

  <!-- content area -->
  <div class="flex-grow">
    {#if mode === "m" && geography && data}
      <Map bind:this={mapFunctions} {card} {data} {geography} {year} on:changeYear={handleYear} />
    {/if}
    {#if mode === "c"}
      <Chart bind:this={chartFunctions} metric={card} />
    {/if}
    {#if mode === "t"}
      <Tabular metric={card} />
    {/if}
  </div>

  <!-- toolbar -->
  <Toolbar
    {idx}
    {mode}
    metric={card}
    on:download={handleDownload}
    on:changeMode={handleChangeMode}
  />
</div>
