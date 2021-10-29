<script>
  import Time from "$lib/time.svelte"
  import "leaflet/dist/leaflet.css"
  import { onMount } from "svelte"
  import { browser } from "$app/env"
  import { interpolateYlGnBu as interpolate } from 'd3-scale-chromatic'
  import { createEventDispatcher } from 'svelte'

  export let card
  export let data
  export let geography
  export let year
  export function exportImage() {
    return mapComponent.querySelector('canvas').toDataURL()
  }

  let mapComponent
  let map
  let geojson
  const dispatch = createEventDispatcher()

  // get data for min/max for colors
  let mapData = []
  Object.values(data).forEach(valArray => {
    mapData.push(...valArray.filter(val => val !== null))
  })
  let dataStats = {"min" : Math.min(...mapData), "max": Math.max(...mapData)}

  onMount(async () => {
    if (browser) {
      const L = await import("leaflet")

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

      map.on("resize", () => {
        map.fitBounds(geojson.getBounds())
      })

    }
  })


  function getColor(d) {
    let val = data[d][card.years.indexOf(year)]
    if (!val) {
      return "rgb(245,245,245)"
    } else {
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
    layer.bindPopup('hi!', {closeButton: false, autoPan: false, className: 'mapPopup'});
    layer.on({
        mouseover: () => layer.openPopup(),
        mouseout: () => layer.closePopup()
    });
  }

  function handleYear(event) {
    dispatch('changeYear', {
			year: event.detail.year
		})
    //geojson.onEachFeature((feature) => style(feature))
    geojson.eachLayer(featureInstanceLayer => {
      featureInstanceLayer.setStyle(style(featureInstanceLayer.feature))
    })
  }
</script>

<div class="flex flex-col h-full px-2 relative  z-1">
  <div class="flex-grow mapBg" bind:this={mapComponent} />
  <div>
    <Time years={card.years} {year} on:changeYear={handleYear} />
  </div>
</div>

<style>
  .mapBg {
    @apply bg-white;
  }



  :global(.leaflet-popup-content) {
	margin: 3px 3px;
	line-height: 1;
	}
.leaflet-popup-content p {
	margin: 18px 0;
	}


</style>
