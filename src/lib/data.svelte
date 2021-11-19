<script>
  import { cards, metrics, maxId } from "$lib/store"

  let isOpen = false
  let filterInput
  let filter = ""

  function handleFilter() {
    if (filter.trim().length === 0) {
      return $metrics
    } else {
      return $metrics.filter(
        (el) =>
          el.title.toUpperCase().indexOf(filter.trim().toUpperCase()) !== -1
      )
    }
  }

  function handleOpenToggle() {
    isOpen = !isOpen
    if (isOpen) {
      filterInput.focus()
      filter = ""
    }
  }

  function handleAddMetric(metric) {
    let newElem = Object.assign({}, metric)
    newElem.id = $maxId + 1
    newElem.mode = 'm'
    $cards.push(newElem)
    $cards = $cards
  }
</script>

{#if isOpen}
  <div
    class="fixed top-0 left-0 right-0 bottom-0 bg-gray-400 opacity-60"
    on:click={handleOpenToggle}
  />
{/if}

<button
  aria-label="Add Data"
  title="Add Data"
  class="bg-pink-600 hover:bg-pink-700 p-4 mr-2 absolute top-20 shadow z-30 print:hidden rounded-full hover:opacity-100 ease-in-out transition-all duration-300 right-0
  {isOpen ? 'top-2 right-64 open' : ''}"
  on:click={handleOpenToggle}
>
  <svg class="w-6 h-6 text-white fill-current"
    ><use xlink:href="#icon-plus" /></svg
  >
</button>

<aside
  class="transform top-0 right-0 w-64 px-2 py-4 bg-white print:hidden fixed h-full shadow-2xl overflow-auto ease-in-out transition-all duration-300 z-100 {isOpen
    ? 'translate-x-0'
    : 'translate-x-full'}"
>
  <!-- list -->
  <div>
    <div class="flex-grow flex items-center mt-4 mb-2">
      <input
        bind:this={filterInput}
        type="text"
        class="w-full ring-1 ring-gray-500 outline-none focus:ring-blue-500 p-1"
        placeholder="filter..."
        bind:value={filter}
      />
    </div>

    {#each handleFilter(filter) as metric}
      <div
        class="flex items-center py-1 hover:bg-gray-300 cursor-pointer"
        on:click={handleAddMetric(metric)}
      >
        <div class="fill-current text-gray-600 ml-1 mr-2">
          <svg class="w-3 h-3">
            <use xlink:href="#icon-plus" />
          </svg>
        </div>
        <div>
          {metric.title}
        </div>
      </div>
    {/each}
  </div>
</aside>

<style>
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-590deg);
    }
  }
  .open svg {
    animation: spin 1000ms ease-out;
    animation-iteration-count: 1;
    transform: rotate(45deg);
  }
</style>
