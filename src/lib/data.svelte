<script>
  import { activeMetrics, maxId, metrics } from "$lib/store"

  let isOpen = false
  let filterInput
  let filter = ''

  function handleFilter() {
    if (filter.trim().length === 0) {
      return $metrics
    } else {
      return $metrics.filter(el => el.title.toUpperCase().indexOf(filter.trim().toUpperCase()) !== -1)
    }
  }

  function handleOpenToggle() {
    isOpen = !isOpen
    if (isOpen) {
      filterInput.focus()
      filter = ''
    }
  }

  function handleAddMetric(metric) {
    let newElem = Object.assign({}, metric)
    newElem.id = $maxId + 1
    $activeMetrics.push(newElem)
    $activeMetrics = $activeMetrics
  }
</script>

<aside
  class="transform top-0 right-0 w-64 px-2 py-4 bg-white fixed h-full drop-shadow-xl shadow-2xl overflow-auto ease-in-out transition-all duration-300 z-30 {isOpen
    ? 'translate-x-0'
    : 'translate-x-full'}"
>
  <!-- list -->
  <div>
    <div class="mb-2 mt-4">
      <input bind:this={filterInput} type="text" class="w-full ring-2" placeholder="filter..." bind:value={filter}>
    </div>
    {#each handleFilter(filter) as metric}
      <div
        class="flex items-center pt-1 hover:bg-gray-300 cursor-pointer"
        on:click={handleAddMetric(metric)}
      >
        <div>
          <button class=" fill-current text-gray-600 p-2 mx-2 rounded-full">
            <svg class="w-3 h-3 text-gray-600 fill-current">
              <use xlink:href="#icon-plus" />
            </svg>
          </button>
        </div>
        <div>
          {metric.title}
        </div>
      </div>
    {/each}
  </div>
</aside>

<button
  class="bg-pink-600 p-4 mr-2 absolute top-20 shadow z-30 rounded-full hover:opacity-100 ease-in-out transition-all duration-300
    {isOpen ? 'right-64 open' : 'right-0 opacity-70'}"
  on:click={handleOpenToggle}
>
  <svg class="w-6 h-6 text-white fill-current"
    ><use xlink:href="#icon-plus" /></svg
  >
</button>

<svg
  aria-hidden="true"
  style="position: absolute; width: 0; height: 0; overflow: hidden;"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
>
  <defs>
    <symbol id="icon-plus" viewBox="0 0 32 32">
      <path
        d="M31 12h-11v-11c0-0.552-0.448-1-1-1h-6c-0.552 0-1 0.448-1 1v11h-11c-0.552 0-1 0.448-1 1v6c0 0.552 0.448 1 1 1h11v11c0 0.552 0.448 1 1 1h6c0.552 0 1-0.448 1-1v-11h11c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1z"
      />
    </symbol>
  </defs>
</svg>

<style>
  @keyframes spin {
    0% {
      transform: rotate(45deg);
    }
    100% {
      transform: rotate(-315deg);
    }
  }
  .open svg {
    animation: spin 400ms ease-out;
    animation-iteration-count: 1;
    transform: rotate(45deg);
  }
</style>
