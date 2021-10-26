<script>
  import Card from "$lib/card.svelte"
  import { cards } from "$lib/store"
  import Sortable from "sortablejs"
  import { onMount } from "svelte"
  import { arrayMoveImmutable } from 'array-move'

  let targetEl

  onMount(() => {
    Sortable.create(targetEl, {
      animation: 400,
      easing: "cubic-bezier(1, 0, 0, 1)",
      handle: ".draghandle",
      onUpdate: ev => {
        $cards = arrayMoveImmutable($cards, ev.oldIndex, ev.newIndex)
        $cards = $cards
      }
    })

  })

</script>

<div class="flex-grow px-4 mt-8">
  <div class="container mx-auto">
    <div
      class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      bind:this={targetEl}
    >
      {#each $cards as card, idx (card.id)}
        <Card {card} {idx} />
      {/each}
    </div>
  </div>
</div>
