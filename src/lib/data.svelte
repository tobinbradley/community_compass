<script>
  import { cards, metrics, maxId } from "$lib/store"

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
    $cards.push(newElem)
    $cards = $cards
  }
</script>

{#if (isOpen)}
<div class="fixed top-0 left-0 right-0 bottom-0 bg-gray-400 opacity-60" on:click={handleOpenToggle}></div>
{/if}

<button
  class="bg-pink-600 p-4 mr-2 right-0 fixed top-10 shadow-lg hover:shadow hover:bg-pink-700 transition-all rounded-full inline-block"
  on:click={handleOpenToggle}
>
  <svg class="w-6 h-6 text-white fill-current"
    ><use xlink:href="#icon-plus" /></svg
  >
</button>

<aside
  class="transform top-0 right-0 w-64 px-2 py-4 bg-white fixed h-full drop-shadow-xl shadow-2xl overflow-auto ease-in-out transition-all duration-300 z-100 {isOpen
    ? 'translate-x-0'
    : 'translate-x-full'}"
>
  <!-- list -->
  <div>
    <div class="mb-2">
      <button class="rounded-full bg-blue-800 text-white p-2" on:click={() => isOpen = false}><svg class="w-4 h-4 text-white fill-current"
        ><use xlink:href="#icon-cancel" /></svg
      ></button>
    </div>
    <div class="mb-2 mt-4 flex">
      <div class="flex items-center pr-2">
        <button class="rounded-full bg-blue-800 text-white p-1" on:click={() => isOpen = false}><svg class="w-4 h-4 text-white fill-current"
          ><use xlink:href="#icon-cancel" /></svg
        ></button>
      </div>
      <div class="flex-grow flex items-center">
        <input bind:this={filterInput} type="text" class="w-full ring-2" placeholder="filter..." bind:value={filter}>
      </div>
      
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

