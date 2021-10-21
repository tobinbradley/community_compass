<script>
import Card from '$lib/card.svelte'
import { dndzone } from 'svelte-dnd-action'
import { activeMetrics } from '$lib/store'

//$: items = $activeMetrics

let items = [
        {id: 1, name: "item1"},
        {id: 2, name: "item2"},
        {id: 3, name: "item3"},
        {id: 4, name: "item4"}
    ];

function handleSort(e) {
    console.log(e)
    items = e.detail.items
    //$activeMetrics = e.detail.items;
    //$activeMetrics = $activeMetrics
}


</script>


<div class="flex-grow px-4 mt-8">
    <div class="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" use:dndzone="{{items}}" on:consider={handleSort} on:finalize={handleSort}>
            {#each items as item(item.id)}
            <Card metric={item} />
            {/each}  
        </div>
    </div>
</div>

