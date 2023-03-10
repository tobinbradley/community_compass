<script>
  import Time from "./time.svelte"
  import "leaflet/dist/leaflet.css"
  import { onMount } from "svelte"
  import { interpolateYlGnBu as interpolate } from "d3-scale-chromatic"
  import { createEventDispatcher } from "svelte"
  import { formatNumber } from './common'
  import { print } from "./store";

  export let card
  export let data
  export let geography
  export let year
  export function exportImage() {
    return mapComponent.querySelector("canvas").toDataURL()
  }

  let mapComponent
  let map
  let info
  let geojson
  const dispatch = createEventDispatcher()

  $: {
    if (($print || !$print) && map) {
      setTimeout(function(){ map.invalidateSize()}, 400)
    }
  }

  // get data for min/max for colors
  let mapData = []
  Object.values(data.m).forEach((valArray) => {
    mapData.push(...valArray.filter((val) => val !== null))
  })
  let dataStats = { min: Math.min(...mapData), max: Math.max(...mapData) }

  onMount(async () => {
      const L = await import("leaflet")

      map = L.map(mapComponent, {
        attributionControl: false,
        zoomControl: false,
        preferCanvas: true,
        zoomSnap: 0.1,
      })

      // disable interactivity
      map.dragging.disable()
      map.touchZoom.disable()
      map.doubleClickZoom.disable()
      map.scrollWheelZoom.disable()
      map.boxZoom.disable()
      map.keyboard.disable()
      if (map.tap) map.tap.disable()

      geojson = L.geoJSON(geography, {
        style: style,
        onEachFeature: onEachFeature,
      }).addTo(map)

      map.fitBounds(geojson.getBounds())

      map.on("resize", () => {
        map.fitBounds(geojson.getBounds())
      })

      info = L.control({position: 'bottomright'})

      info.onAdd = function (map) {
        this._div = L.DomUtil.create("div", "info") // create a div with a class "info"
        this.update()
        return this._div
      }

      // method that we will use to update the control based on feature properties passed
      info.update = function (val) {
        if (val || val == 0) {
          this._div.innerHTML = `
          ${formatNumber(val, card.format)}
          ${card.label ? ' ' + card.label : ''}`
        } else {
          this._div.innerHTML = ''
        }
      }

      info.addTo(map)

  })

  function getColor(d) {
    if (data.m[d]) {
      let val = data.m[d][data.years.indexOf(year)] || null
      if (!val && val !== 0) {
        return "rgb(245,245,245)"
      } else {
        val = val - dataStats.min
        val = (val * 100) / dataStats.max / 100
        return interpolate(val)
      }
    }
    return "rgb(245,245,245)"
  }

  function style(feature) {
    return {
      fillColor: getColor(feature.id),
      weight: 1,
      opacity: 1,
      color: "white",
      fillOpacity: 0.7,
    }
  }

  function highlightFeature(e) {
    let layer = e.target
    if (data.m[layer.feature.id][data.years.indexOf(year)] || data.m[layer.feature.id][data.years.indexOf(year)] == 0) {
      layer.setStyle({
        weight: 2,
        color: "#EF4444",
        fillOpacity: 0.7
      })
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront()
      }
      info.update(data.m[layer.feature.id][data.years.indexOf(year)])
    }
  }

  function resetHighlight(e) {
    geojson.resetStyle(e.target)
    info.update()
  }

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight
    })
  }

  function handleYear(event) {
    dispatch("changeYear", {
      year: event.detail.year,
    })
    geojson.eachLayer((featureInstanceLayer) => {
      featureInstanceLayer.setStyle(style(featureInstanceLayer.feature))
    })
  }
</script>

<div class="flex flex-col h-full px-2 relative z-0">
  <div class="flex-grow mapBg" bind:this={mapComponent} />
  <div>
    <Time years={data.years} {year} on:changeYear={handleYear} />
  </div>
</div>

<style>
  .mapBg {
    @apply bg-white;
  }
</style>
