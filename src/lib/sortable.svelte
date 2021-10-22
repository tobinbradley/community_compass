<script>
  import Sortable from "sortablejs"
  import { onMount } from "svelte"

  export let items = []
  let targetEl
  let sortable

  onMount(() => {
    sortable = Sortable.create(
      targetEl,
      {
        animation: 400,
        easing: "cubic-bezier(1, 0, 0, 1)"
      }
    )
  })
</script>

<div
  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  bind:this={targetEl}
>
  {#each items as item}
    <slot {item} />
  {/each}
</div>
