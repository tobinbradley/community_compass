<script>
  import { cards } from "$lib/store"
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher()

  export let idx
  export let mode = "m"

  let isOpen = false

  function handleOpen() {
    isOpen = !isOpen
  }

  function handleModeChange(m) {
    dispatch('changeMode', {
			mode: m
		})
  }

  function handleRemoveMetric() {
    $cards.splice(idx, 1)
    $cards = $cards
  }

  function downloadCSV() {}
  function downloadGeoJSON() {}
</script>

<div class="flex flex-row relative justify-between bg-gray-400 rounded-b-lg draghandle"
    style="cursor: grab"
  >
    <div>
      <button
        class="bg-gray-400 hover:bg-gray-500 transition-colors py-2 px-3 rounded-bl-lg {mode ===
        'm'
          ? 'bg-gray-500'
          : ''}"
        title="Map"
        on:click={() => handleModeChange("m")}
      >
        <svg class="w-5 h-5 text-white fill-current"
          ><use xlink:href="#icon-map" /></svg
        >
      </button>
      <button
        class="bg-gray-400 hover:bg-gray-500 transition-colors py-2 px-3 rounded-none {mode ===
        'c'
          ? 'bg-gray-500'
          : ''}"
        title="Chart"
        on:click={() => handleModeChange("c")}
      >
        <svg class="w-5 h-5 text-white fill-current"
          ><use xlink:href="#icon-stats-dots" /></svg
        >
      </button>
      <button
        class="bg-gray-400 hover:bg-gray-500 transition-colors py-2 px-3 rounded-none {mode ===
        't'
          ? 'bg-gray-500'
          : ''}"
        title="Table"
        on:click={() => handleModeChange("t")}
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
            <button
              class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-300
              transition-colors whitespace-nowrap" role="menuitem" tabindex="-1"
              id="menu-item-0">Download GeoJSON
          </button>
            <button class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-300
              transition-colors whitespace-nowrap" role="menuitem" tabindex="-1"
              id="menu-item-1">Download CSV
            </button>
            <button
              class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-300
              transition-colors whitespace-nowrap" role="menuitem" tabindex="-1"
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
