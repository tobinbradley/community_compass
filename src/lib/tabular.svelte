<script>
  import { formatNumber } from "./common"

  export let metric
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
        {#each metric.years as year}
          <th>{year}</th>
        {/each}
      </tr>
    </thead>

    <tbody>
      <tr>
        <th>County</th>
        {#each metric.years as year, id}
          <td>{formatNumber(metric.summary.mecklenburg[id], metric.format || null)}</td>
        {/each}
      </tr>
      <tr>
        <th>Charlotte</th>
        {#each metric.years as year, id}
          <td>{formatNumber(metric.summary.charlotte[id], metric.format || null)}</td>
        {/each}
      </tr>
      <tr>
        <th>Commission District 1</th>
        {#each metric.years as year, id}
          <td>{formatNumber(metric.summary.cc1[id], metric.format || null)}</td>
        {/each}
      </tr><tr>
        <th>Commission District 2</th>
        {#each metric.years as year, id}
          <td>{formatNumber(metric.summary.cc2[id], metric.format || null)}</td>
        {/each}
      </tr><tr>
        <th>Commission District 3</th>
        {#each metric.years as year, id}
          <td>{formatNumber(metric.summary.cc3[id], metric.format || null)}</td>
        {/each}
      </tr><tr>
        <th>Commission District 4</th>
        {#each metric.years as year, id}
          <td>{formatNumber(metric.summary.cc4[id], metric.format || null)}</td>
        {/each}
      </tr><tr>
        <th>Commission District 5</th>
        {#each metric.years as year, id}
          <td>{formatNumber(metric.summary.cc5[id], metric.format || null)}</td>
        {/each}
      </tr><tr>
        <th>Commission District 6</th>
        {#each metric.years as year, id}
          <td>{formatNumber(metric.summary.cc6[id], metric.format || null)}</td>
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
