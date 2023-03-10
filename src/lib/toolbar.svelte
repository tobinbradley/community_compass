<script>
  import { cards } from "./store"
  import { createEventDispatcher } from "svelte"

  const dispatch = createEventDispatcher()

  export let idx
  export let mode = "m"
  export let metric
  export let data

  let isOpen = false

  function handleOpen() {
    isOpen = !isOpen
  }

  function handleModeChange(m) {
    dispatch("changeMode", {
      mode: m
    })
  }

  function handleDownload(m) {
    isOpen = false

    dispatch("download", {
      type: m
    })
  }

  function handleRemoveMetric() {
    $cards.splice(idx, 1)
    $cards = $cards
  }

  function downloadCSV() {}
  function downloadGeoJSON() {}
</script>

<div
  class="flex flex-row relative justify-between rounded-b-lg draghandle print:hidden"
  style="cursor: grab"
>
  <div>
    <button title="Map" aria-label="Map" class="btn rounded-bl-lg {mode === 'm' ? 'active' : ''}" on:click={() => handleModeChange("m")}>
      <svg class="w-4 h-4 fill-current"
        ><use xlink:href="#icon-map" /></svg
      >
    </button>
    {#if data && data.years.length > 1}
      <button title="Chart" aria-label="Chart" class="btn {mode === 'c' ? 'active' : ''}" on:click={() => handleModeChange("c")}>
        <svg class="w-4 h-4 fill-current"
          ><use xlink:href="#icon-stats-dots" /></svg
        >
      </button>
    {/if}
    <button title="Table" aria-label="Table" class="btn {mode === 't' ? 'active' : ''}" on:click={() => handleModeChange("t")}>
      <svg class="w-4 h-4 fill-current">
        <use xlink:href="#icon-table2" />
      </svg>
    </button>

    <div class="inline-block relative">
      <button class="btn"
        title="Menu"
        aria-label="Open Menu"
        on:click={handleOpen}
        on:blur={() => setTimeout(() => isOpen = false, 300)}
      >
        <svg class="w-4 h-4 fill-current"
          ><use xlink:href="#icon-menu" /></svg
        >
      </button>

      <div
        class="absolute menu left-0 bottom-10 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none {isOpen
          ? ''
          : 'hidden'}"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div class="py-1" role="none">
          <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
          <button role="menuitem" tabindex="-1" id="menu-item-0" on:click={() => handleDownload('geojson')}
            >Download GeoJSON
          </button>
          <button role="menuitem" tabindex="-1" id="menu-item-1" on:click={() => handleDownload('csv')}
            >Download CSV
          </button>
          <button role="menuitem" tabindex="-1" id="menu-item-1" on:click={() => handleDownload('summary')}
            >Download Summary CSV
          </button>
          {#if (mode === "m")}
          <button role="menuitem" tabindex="-1" id="menu-item-2" on:click={() => handleDownload('map')}
            >Download Map
          </button>
          {/if}
          {#if (mode === "c")}
          <button role="menuitem" tabindex="-1" id="menu-item-2" on:click={() => handleDownload('chart')}
            >Download Chart
          </button>
          {/if}
          <a target="_blank" href={`https://mcmap.org/qol/data/meta/m${metric.metric}.html`}
            on:click={() => isOpen = false}>View Metadata
          </a>
        </div>
      </div>
    </div>
  </div>
  <div>
    <button
      class="transition-all duration-300 ease-in-out py-2 px-3 hover:bg-red-500 hover:text-white rounded-br-lg"
      title="Close"
      aria-label="Close"
      on:click={handleRemoveMetric}
    >
      <svg class="w-4 h-4 fill-current"
        ><use xlink:href="#icon-cancel" /></svg
      >
    </button>
  </div>
</div>

<style>
  .btn {
    @apply hover:ring-2 hover:ring-blue-500 transition-all duration-300 ease-in-out py-2 px-3;
  }
  .btn.active {
    @apply bg-blue-500 text-white;
  }
  .menu button,
  .menu a {
    @apply text-gray-700 block px-4 py-2 text-sm hover:bg-gray-300 transition-colors whitespace-nowrap w-full text-left;
  }
</style>
