<script>
  import { cards } from "$lib/store"
  import { onMount } from "svelte"
  import Map from "$lib/map.svelte"
  import Chart from "$lib/chart.svelte"
  import Tabular from "$lib/tabular.svelte"
  import Toolbar from "$lib/toolbar.svelte"
  import { download } from "./common"

  export let card
  export let idx

  let mode = "m"
  let year = card.years[card.years.length - 1]
  let geography
  let data
  let mapFunctions
  let chartFunctions

  onMount(async () => {
    // get geography
    const fetchGeograpny = await fetch("data/npa.geojson.json")
    geography = await fetchGeograpny.json()
    // get data
    const fetchData = await fetch(`data/metric/m${card.metric}.json`)
    data = await fetchData.json()
  })

  function handleChangeMode(event) {
    mode = event.detail.mode
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
      const img = chartFunctions.exportImage()
      download(img, null, `${card.title}.svg`)
    }
  }
</script>

<div
  class="bg-white shadow-lg rounded-lg flex flex-col z-0"
  style="height: 550px;"
>
  <!-- Title -->
  <div class="pt-2 relative draghandle z-0" style="cursor: grab">
    <h2 class="text-bold text-center">{card.title}</h2>
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
