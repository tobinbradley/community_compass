<script>
  import { cards, print } from '$lib/store'
  import { browser } from "$app/env"

  let url

  cards.subscribe(() => {
    if (browser) {
        url = window.location
    }
  })
</script>

{#if ($print)}
<div class="print:hidden bg-white py-4 px-8 shadow-lg rounded-lg mb-8 m-auto" style="width: 8.5in;">
    <h2 class="text-lg font-bold">Print</h2>
    <p class="mt-2 mb-4">
        Your cards have been optimized for printing to an 8.5"x11" page. Arrange them to tell your story, 
        then hit the "Print" button. When you are finished, hit the "Close" button to exit print mode.
    </p>
    <div class="text-center">
        <button class="text-white bg-blue-600 shadow hover:shadow-lg py-2 px-4 rounded transition-shadow duration-300" onclick="window.print()">
          <svg class="w-4 h-4 fill-current inline">
            <use xlink:href="#icon-printer" />
          </svg>
          Print</button>
        <button class="text-white bg-pink-600 shadow hover:shadow-lg py-2 px-4 rounded transition-shadow duration-300" on:click={() => $print = false}>Close</button>
    </div>
</div>

{/if}

<div
  class="printSplash flex flex-col justify-center content-center text-center hidden m-auto print:block"
>
  <div>
    <img
      src="img/logo.svg"
      alt="logo"
      class="h-full w-auto m-auto"
    />
  </div>
  <h1 class="text-5xl pb-3 font-bold text-blue-900">Community Compass</h1>
  <h2 class="text-2xl font-bold text-blue-900">Mecklenburg County GIS</h2>
  <p>
    <a href={url} class="underline text-blue-800">{url}</a>
  </p>
</div>

<style>
  .printSplash {
    height: 10in;
    width: 8in;
    page-break-after: always;
  }
</style>
