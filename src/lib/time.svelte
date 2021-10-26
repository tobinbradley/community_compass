<script>
  export let years

  const max = Math.max(...years)
  const min = Math.min(...years)

  let year = max

  function handleChange() {
    year = getClosest(years, year)
  }

  function getClosest(arr, val) {
    return arr.reduce(function (prev, curr) {
      return Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev
    })
  }
</script>


{#if years.length > 1 }
<input
  type="range"
  {min}
  bind:value={year}
  {max}
  step="1"
  list="ticks"
  on:input={handleChange}
/>
<datalist id="ticks">
  {#each years as year}
    <option>{year}</option>
  {/each}
</datalist>
{/if}

<span>{year}</span>
