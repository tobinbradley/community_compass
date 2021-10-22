<script>
  import { activeMetrics } from "$lib/store"
  import Map from '$lib/map.svelte'
  import Chart from '$lib/chart.svelte'
  import Tabular from '$lib/tabular.svelte'

  export let metric
  export let mode = 'm'
  let isOpen = false

  function handleOpen() {
    isOpen = !isOpen
  }

  function handleModeChange(m) {
    mode = m
  }

  function handleRemoveMetric() {
    const id = $activeMetrics.findIndex((x) => x.id === metric.id)
    $activeMetrics.splice(id, 1)
    $activeMetrics = $activeMetrics
  }

  function downloadCSV() {}
  function downloadGeoJSON() {}


</script>

<div class="bg-white shadow-lg rounded-lg flex flex-col" style="height: 500px">
  <!-- Title -->
  <div class="p-2">
    <h2 class="text-bold text-center">{metric.title}</h2>
  </div>

  <!-- content area -->
  <div class="flex-grow">
    {#if mode === 'm'}
      <Map metric={metric} />
    {/if}
    {#if mode === 'c'}
      <Chart metric={metric} />
    {/if}
    {#if mode === 't'}
      <Tabular metric={metric} />
    {/if}
  </div>

  <!-- toolbar -->
  <div class="flex flex-row relative justify-between bg-gray-400 rounded-b-lg">
    <div>
      <button
        class="bg-gray-400 hover:bg-gray-500 transition-colors py-2 px-3 rounded-bl-lg {mode === 'm' ? 'bg-gray-500' : ''}"
        title="Map"
        on:click={() => handleModeChange('m')}
      >
        <svg class="w-5 h-5 text-white fill-current"
          ><use xlink:href="#icon-map" /></svg
        >
      </button>
      <button
        class="bg-gray-400 hover:bg-gray-500 transition-colors py-2 px-3 rounded-none {mode === 'c' ? 'bg-gray-500' : ''}"
        title="Chart"
        on:click={() => handleModeChange('c')}
      >
        <svg class="w-5 h-5 text-white fill-current"
          ><use xlink:href="#icon-stats-dots" /></svg
        >
      </button>
      <button
        class="bg-gray-400 hover:bg-gray-500 transition-colors py-2 px-3 rounded-none {mode === 't' ? 'bg-gray-500' : ''}"
        title="Table"
        on:click={() => handleModeChange('t')}
      >
        <svg class="w-5 h-5 text-white fill-current">
          <use xlink:href="#icon-table2" />
        </svg>
      </button>

      <div class="inline-block relative">
        <button
          class="bg-gray-400 hover:bg-gray-500 transition-colors py-2 px-3 rounded-none"
          title="Menu"
          on:click={handleOpen}
        >
          <svg class="w-5 h-5 text-white fill-current"
            ><use xlink:href="#icon-menu" /></svg
          >
        </button>

        <div
          class="absolute right-0 bottom-11 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none {isOpen
            ? ''
            : 'hidden'}"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabindex="-1"
        >
          <div class="py-1" role="none">
            <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
            <button>
              class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-300 transition-colors whitespace-nowrap"
              role="menuitem"
              tabindex="-1"
              id="menu-item-0">Download GeoJSON
            </button>
            <button>
              class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-300 transition-colors whitespace-nowrap"
              role="menuitem"
              tabindex="-1"
              id="menu-item-1">Download CSV
            </button>
            <button>
              class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-300 transition-colors whitespace-nowrap"
              role="menuitem"
              tabindex="-1"
              id="menu-item-2">View Metadata
            </button>
          </div>
        </div>

      </div>
    </div>
    <div>
      <button
        class="bg-gray-400 hover:bg-red-500 transition-colors py-2 px-3 rounded-br-lg"
        title="Close"
        on:click={handleRemoveMetric}
      >
        <svg class="w-5 h-5 text-white fill-current"
          ><use xlink:href="#icon-cross" /></svg
        >
      </button>
    </div>
  </div>
</div>


<svg
  aria-hidden="true"
  style="position: absolute; width: 0; height: 0; overflow: hidden;"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
>
  <defs>
    <symbol id="icon-map" viewBox="0 0 32 32">
      <path d="M0 6l10-4v24l-10 4z" />
      <path d="M12 1l10 6v23l-10-5z" />
      <path d="M24 7l8-6v24l-8 6z" />
    </symbol>
    <symbol id="icon-stats-dots" viewBox="0 0 32 32">
      <path
        d="M4 28h28v4h-32v-32h4zM9 26c-1.657 0-3-1.343-3-3s1.343-3 3-3c0.088 0 0.176 0.005 0.262 0.012l3.225-5.375c-0.307-0.471-0.487-1.033-0.487-1.638 0-1.657 1.343-3 3-3s3 1.343 3 3c0 0.604-0.179 1.167-0.487 1.638l3.225 5.375c0.086-0.007 0.174-0.012 0.262-0.012 0.067 0 0.133 0.003 0.198 0.007l5.324-9.316c-0.329-0.482-0.522-1.064-0.522-1.691 0-1.657 1.343-3 3-3s3 1.343 3 3c0 1.657-1.343 3-3 3-0.067 0-0.133-0.003-0.198-0.007l-5.324 9.316c0.329 0.481 0.522 1.064 0.522 1.691 0 1.657-1.343 3-3 3s-3-1.343-3-3c0-0.604 0.179-1.167 0.487-1.638l-3.225-5.375c-0.086 0.007-0.174 0.012-0.262 0.012s-0.176-0.005-0.262-0.012l-3.225 5.375c0.307 0.471 0.487 1.033 0.487 1.637 0 1.657-1.343 3-3 3z"
      />
    </symbol>
    <symbol id="icon-menu" viewBox="0 0 32 32">
      <path d="M2 6h28v6h-28zM2 14h28v6h-28zM2 22h28v6h-28z" />
    </symbol>
    <symbol id="icon-cross" viewBox="0 0 32 32">
      <path
        d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"
      />
    </symbol>
    <symbol id="icon-table2" viewBox="0 0 32 32">
      <path
        d="M0 2v28h32v-28h-32zM12 20v-6h8v6h-8zM20 22v6h-8v-6h8zM20 6v6h-8v-6h8zM10 6v6h-8v-6h8zM2 14h8v6h-8v-6zM22 14h8v6h-8v-6zM22 12v-6h8v6h-8zM2 22h8v6h-8v-6zM22 28v-6h8v6h-8z"
      />
    </symbol>
  </defs>
</svg>
