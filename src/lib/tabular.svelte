<script>
  import { formatNumber, sumGroup } from "./common"
  import groups from './data/neighborhod-groups.json'

  export let metric
  export let data
</script>

<div class="px-2 py-2">
  <div class="overflow-x-auto">
    {#if (metric.label)}
    <h3 class="text-center text-sm text-gray-800">{metric.label}</h3>
    {/if}
  <table class="w-full">
    <thead class="bg-gray-50">
      <tr>
        <th />
        {#each data.years as year}
          <th>{year}</th>
        {/each}
      </tr>
    </thead>

    <tbody>
      <tr>
        <th>County</th>
        {#each data.years as year, id}
          <td>{formatNumber(sumGroup(data, id), metric.format || null)}</td>
        {/each}
      </tr>
      <tr>
        <th>Charlotte</th>
        {#each data.years as year, id}
          <td>{formatNumber(sumGroup(data, id, groups["Jurisdiction"]["Charlotte"]), metric.format || null)}</td>
        {/each}
      </tr>
      <tr>
        <th>Commission District 1</th>
        {#each data.years as year, id}
          <td>{formatNumber(sumGroup(data, id, groups["County Commission"]["1"]), metric.format || null)}</td>
        {/each}
      </tr><tr>
        <th>Commission District 2</th>
        {#each data.years as year, id}
          <td>{formatNumber(sumGroup(data, id, groups["County Commission"]["2"]), metric.format || null)}</td>
        {/each}
      </tr><tr>
        <th>Commission District 3</th>
        {#each data.years as year, id}
          <td>{formatNumber(sumGroup(data, id, groups["County Commission"]["3"]), metric.format || null)}</td>
        {/each}
      </tr><tr>
        <th>Commission District 4</th>
        {#each data.years as year, id}
          <td>{formatNumber(sumGroup(data, id, groups["County Commission"]["4"]), metric.format || null)}</td>
        {/each}
      </tr><tr>
        <th>Commission District 5</th>
        {#each data.years as year, id}
          <td>{formatNumber(sumGroup(data, id, groups["County Commission"]["5"]), metric.format || null)}</td>
        {/each}
      </tr><tr>
        <th>Commission District 6</th>
        {#each data.years as year, id}
          <td>{formatNumber(sumGroup(data, id, groups["County Commission"]["6"]), metric.format || null)}</td>
        {/each}
      </tr>
    </tbody>
  </table>
</div>

</div>

<style>
  thead,
  th {
    @apply bg-gray-100;
  }
  td,
  th {
    @apply px-2 py-1 text-xs;
  }
  tr {
    @apply border-b-2 border-gray-300;
  }
  tbody td, thead th {
    @apply text-right;
  }
  tbody th {
    @apply text-left;
  }
</style>
