<script>
  import Card from "$lib/card.svelte";
  import { dndzone } from "svelte-dnd-action";
  import { activeMetrics } from "$lib/store";

  $: items = $activeMetrics;

  function handleSort(e) {
    $activeMetrics = e.detail.items;
    $activeMetrics = $activeMetrics;
  }
</script>

<div class="flex-grow px-4 mt-8">
  <div class="container mx-auto">
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      use:dndzone={{ items }}
      on:consider={handleSort}
      on:finalize={handleSort}
    >
      {#each items as item (item.id)}
        <div>
          <Card metric={item} />
        </div>
      {/each}
    </div>
  </div>
</div>
