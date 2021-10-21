<script>
import { activeMetrics } from '$lib/store'

export let metric

function handleRemoveMetric() {
    const id = $activeMetrics.findIndex( x => x.id === metric.id )
    $activeMetrics.splice(id, 1)
    $activeMetrics = $activeMetrics
}
</script>


    <div class="bg-white shadow-lg rounded-lg tracking-wide" style="height: 500px" >
        <h2>{metric.title} {JSON.stringify(metric)}</h2>

        <div class="inline-flex">
            <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                <svg class="w-5 h-5 text-white fill-current"><use xlink:href="#icon-map"></use></svg>
            </button>
            <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-none">
                <svg class="w-5 h-5 text-white fill-current"><use xlink:href="#icon-stats-dots"></use></svg>
            </button>
            <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-none">
                <svg class="w-5 h-5 text-white fill-current"><use xlink:href="#icon-table2"></use></svg>
            </button>
            <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-none" on:click={handleRemoveMetric}>
                <svg class="w-5 h-5 text-white fill-current"><use xlink:href="#icon-cross"></use></svg>
            </button>
            <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                <svg class="w-5 h-5 text-white fill-current"><use xlink:href="#icon-menu"></use></svg>
            </button>
          </div>
               
    </div>



<svg aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
    <symbol id="icon-map" viewBox="0 0 32 32">
    <path d="M0 6l10-4v24l-10 4z"></path>
    <path d="M12 1l10 6v23l-10-5z"></path>
    <path d="M24 7l8-6v24l-8 6z"></path>
    </symbol>
    <symbol id="icon-stats-dots" viewBox="0 0 32 32">
    <path d="M4 28h28v4h-32v-32h4zM9 26c-1.657 0-3-1.343-3-3s1.343-3 3-3c0.088 0 0.176 0.005 0.262 0.012l3.225-5.375c-0.307-0.471-0.487-1.033-0.487-1.638 0-1.657 1.343-3 3-3s3 1.343 3 3c0 0.604-0.179 1.167-0.487 1.638l3.225 5.375c0.086-0.007 0.174-0.012 0.262-0.012 0.067 0 0.133 0.003 0.198 0.007l5.324-9.316c-0.329-0.482-0.522-1.064-0.522-1.691 0-1.657 1.343-3 3-3s3 1.343 3 3c0 1.657-1.343 3-3 3-0.067 0-0.133-0.003-0.198-0.007l-5.324 9.316c0.329 0.481 0.522 1.064 0.522 1.691 0 1.657-1.343 3-3 3s-3-1.343-3-3c0-0.604 0.179-1.167 0.487-1.638l-3.225-5.375c-0.086 0.007-0.174 0.012-0.262 0.012s-0.176-0.005-0.262-0.012l-3.225 5.375c0.307 0.471 0.487 1.033 0.487 1.637 0 1.657-1.343 3-3 3z"></path>
    </symbol>
    <symbol id="icon-menu" viewBox="0 0 32 32">
    <path d="M2 6h28v6h-28zM2 14h28v6h-28zM2 22h28v6h-28z"></path>
    </symbol>
    <symbol id="icon-cross" viewBox="0 0 32 32">
    <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
    </symbol>
    <symbol id="icon-table2" viewBox="0 0 32 32">
    <path d="M0 2v28h32v-28h-32zM12 20v-6h8v6h-8zM20 22v6h-8v-6h8zM20 6v6h-8v-6h8zM10 6v6h-8v-6h8zM2 14h8v6h-8v-6zM22 14h8v6h-8v-6zM22 12v-6h8v6h-8zM2 22h8v6h-8v-6zM22 28v-6h8v6h-8z"></path>
    </symbol>
    </defs>
</svg>
        