<script>
  import { onMount } from "svelte"
  import { cards } from './store'
  import Map from "./map.svelte"
  import Chart from "./chart.svelte"
  import Tabular from "./tabular.svelte"
  import Toolbar from "./toolbar.svelte"
  import groups from './data/neighborhod-groups.json'
  import { download, groupYears, formatNumber } from "./common"


  export let idx

  const card = $cards[idx]
  let year
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
    const fetchData = await fetch(`https://mcmap.org/qol/data/metric/${card.metric}.json`)
    data = await fetchData.json()
    year = data.years[data.years.length - 1]
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
      const keys = Object.keys(data.m)
      let body = ""

      header.push("GEOID")
      header.push(...data.years)

      keys.forEach((key) => {
        const row = [key, ...data.m[key].map(el => formatNumber(el, 'decimal'))]
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
      let body = ""

      header.push("GEOID")
      header.push(...data.years)

      body += "Mecklenburg," + groupYears(data).map(el => formatNumber(el, 'decimal')).join(',') + "\n"
      body += "Charlotte," + groupYears(data, groups["Jurisdiction"]["Charlotte"]).map(el => formatNumber(el, 'decimal')).join(',') + "\n"
      body += "County Commission District 1," + groupYears(data, groups["County Commission"]["1"]).map(el => formatNumber(el, 'decimal')).join(',') + "\n"
      body += "County Commission District 2," + groupYears(data, groups["County Commission"]["2"]).map(el => formatNumber(el, 'decimal')).join(',') + "\n"
      body += "County Commission District 3," + groupYears(data, groups["County Commission"]["3"]).map(el => formatNumber(el, 'decimal')).join(',') + "\n"
      body += "County Commission District 4," + groupYears(data, groups["County Commission"]["4"]).map(el => formatNumber(el, 'decimal')).join(',') + "\n"
      body += "County Commission District 5," + groupYears(data, groups["County Commission"]["5"]).map(el => formatNumber(el, 'decimal')).join(',') + "\n"
      body += "County Commission District 6," + groupYears(data, groups["County Commission"]["6"]).map(el => formatNumber(el, 'decimal')).join(',') + "\n"

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
          data.years.forEach(year => {
            if (data.m[elem.id]) elem.properties[year] = formatNumber(data.m[elem.id][data.years.indexOf(year)], 'decimal')
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
    {#if mode === "c" && data}
      <Chart bind:this={chartFunctions} metric={card} {data} />
    {/if}
    {#if mode === "t" && data}
      <Tabular metric={card} {data} />
    {/if}
  </div>

  <!-- toolbar -->
  <Toolbar
    {idx}
    {mode}
    {data}
    metric={card}
    on:download={handleDownload}
    on:changeMode={handleChangeMode}
  />
</div>
