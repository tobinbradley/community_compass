<script>
import Card from '$lib/card.svelte'
import { dndzone } from 'svelte-dnd-action'

let items = [
        {id: 1, name: "item1"},
        {id: 2, name: "item2"},
        {id: 3, name: "item3"},
        {id: 4, name: "item4"}
    ];
const flipDurationMs = 300;

// $: isTransitioning = !!items.find(i => i.isByeBye || i.isHi);

function handleSort(e) {
		items = e.detail.items;
	}

    function handleDndConsider(e) {
		items = e.detail.items;
	}
	function handleDndFinalize(e) {
		items = e.detail.items;
	}
</script>




<div class="flex-grow px-4 mt-8">
    <div class="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" use:dndzone="{{items}}" on:consider={handleSort} on:finalize={handleSort}>
            {#each items as item(item.id)}
            <Card name={item.name} />
            {/each}  
        </div>
    </div>
</div>

