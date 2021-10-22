<script>
  import Card from "$lib/card.svelte"
  import Sortable from '$lib/sortable.svelte'
  import { activeMetrics } from "$lib/store"

  $: items = $activeMetrics
</script>

<div class="flex-grow px-4 mt-8">
  <div class="container mx-auto">
    <Sortable {items} let:item={item}>
      <Card metric={item} />
    </Sortable>
  </div>
</div>
