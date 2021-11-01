<script>
  import { createEventDispatcher } from "svelte"

  export let years
  export let year = Math.max(...years)

  const max = Math.max(...years)
  const min = Math.min(...years)
  const dispatch = createEventDispatcher()

  function handleChange() {
    year = getClosest(years, year)
    dispatch("changeYear", {
      year: getClosest(years, year),
    })
  }

  function getClosest(arr, val) {
    return arr.reduce(function (prev, curr) {
      return Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev
    })
  }
</script>

<div class="flex mb-2">
  <div class="flex-grow flex px-4 items-center">
    {#if years.length > 1}
      <input
        type="range"
        {min}
        bind:value={year}
        {max}
        step="1"
        on:input={handleChange}
        class="w-full print:hidden"
      />
    {/if}
  </div>
  <!-- <div class="flex items-center">{year}</div> -->
</div>
