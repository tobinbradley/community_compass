<script>
  export let metric

  const max = Math.max(...metric.years)
  const min = Math.min(...metric.years)
  let year = max

  function handleChange() {
    year = getClosest(metric.years, year)
    // gotta bubble up year somehow
  }

  function getClosest(arr, val) {
    return arr.reduce(function (prev, curr) {
      return Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev
    })
  }
</script>

{#if metric.years.length > 1 }
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
  {#each metric.years as year}
    <option>{year}</option>
  {/each}
</datalist>
{/if}

<span>{year}</span>
