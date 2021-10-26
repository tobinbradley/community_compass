<script>
  import Time from "$lib/time.svelte"
  import "leaflet/dist/leaflet.css"
  import { onMount } from "svelte"
  import { browser } from "$app/env"
  import { interpolateYlGnBu as interpolate } from 'd3-scale-chromatic'

  export let card
  export let data
  export let geography
  let mapComponent
  let map
  let geojson

  // get data for min/max for colors
  let mapData = []
  Object.values(data).forEach(valArray => {
    mapData.push(...valArray.filter(val => val !== null).map(val => val.replace(/[^\d.-]/g, '')
    ))
  })
  let dataStats = {"min" : Math.min(...mapData), "max": Math.max(...mapData)}

  onMount(async () => {
    if (browser) {
      const L = await import("leaflet")
      const bounds = [
        [35.0016, -81.0581],
        [35.5149, -80.5504],
      ]
      map = L.map(mapComponent, {
        attributionControl: false,
        zoomControl: false,
        preferCanvas: true,
        zoomSnap: 0.1
      })

      // disable interactivity
      map.dragging.disable()
      map.touchZoom.disable()
      map.doubleClickZoom.disable()
      map.scrollWheelZoom.disable()
      map.boxZoom.disable()
      map.keyboard.disable()
      if (map.tap) map.tap.disable()

      geojson = L.geoJSON(geography, {style: style, onEachFeature: onEachFeature}).addTo(map)

      map.fitBounds(geojson.getBounds())

    }
  })


  function getColor(d) {
    let val = data[d][1]
    if (!val) {
      return "rgba(0,0,0,0)"
    } else {
      val = Number(val.replace(/[^\d.-]/g, ''))
      val = val - dataStats.min
      val = ((val * 100) / dataStats.max) / 100
      return interpolate(val)
    }
  }

  function style(feature) {
    return {
        fillColor: getColor(feature.id),
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    }
  }

  function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
  }

  function resetHighlight(e) {
    geojson.resetStyle(e.target);
  }

  function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    });
  }
</script>

<div class="flex flex-col h-full px-2">
  <div class="flex-grow mapBg" bind:this={mapComponent} />
  <div>
    <Time years={card.years} />
  </div>
</div>

<style>
  .mapBg {
    @apply bg-white;
  }
</style>
