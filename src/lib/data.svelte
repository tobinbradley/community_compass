<script>
import { activeMetrics, maxId, metrics } from '$lib/store'

let isOpen = false

function handleOpenToggle() {
    isOpen = !isOpen
}

function handleAddMetric(metric) {
    let newElem = Object.assign({}, metric)
    newElem.id = $maxId + 1
    $activeMetrics.push(newElem)
    $activeMetrics = $activeMetrics
}

</script>
<style>
@keyframes spin {
    0% { transform: rotate(45deg); }
    100% { transform: rotate(-315deg); }
    
}
.open svg {
    animation: spin 400ms ease-out;
    animation-iteration-count: 1;
    transform: rotate(45deg);
}
</style>


<aside
 class="transform top-0 right-0 w-64 p-4 bg-white fixed h-full drop-shadow-xl shadow-2xl overflow-auto ease-in-out transition-all duration-300 z-30 {isOpen ? 'translate-x-0' : 'translate-x-full'}"
>
 <!-- list -->
 <div>
    {#each $metrics as metric }
    <div>
    <button class="bg-blue-700 text-white p-2 mx-2 rounded-full" on:click={handleAddMetric(metric)}>
        <svg class="w-3 h-3 text-white fill-current"><use xlink:href="#icon-plus"></use></svg>    
    </button>
    {metric.title}
    </div>
    {/each}
</div>
</aside>



<div class="absolute top-20 shadow-2xl pl-1 py-1 bg-white border-t-2 border-b-2 border-l-2 z-30 border-pink-600 rounded-l-md hover:opacity-100 ease-in-out transition-all duration-300 
  {isOpen ? 'right-64 open' : 'right-0 opacity-70'}" on:click={handleOpenToggle}>
    <button class=" bg-pink-600 p-2 rounded-md">
        <svg class="w-7 h-7 text-white fill-current"><use xlink:href="#icon-plus"></use></svg>
    </button>
</div>

<svg aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
    <symbol id="icon-plus" viewBox="0 0 32 32">
    <path d="M31 12h-11v-11c0-0.552-0.448-1-1-1h-6c-0.552 0-1 0.448-1 1v11h-11c-0.552 0-1 0.448-1 1v6c0 0.552 0.448 1 1 1h11v11c0 0.552 0.448 1 1 1h6c0.552 0 1-0.448 1-1v-11h11c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1z"></path>
    </symbol>
    </defs>
</svg>
    