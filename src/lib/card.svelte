<script>
  import Toolbar from '$lib/toolbar.svelte'

  export let metric;


</script>

<div class="bg-white shadow-lg rounded-lg flex flex-col" style="height: 500px">
  <!-- Title -->
  <div class="p-2">
    <h2 class="text-bold text-xl text-center">{metric.title}</h2>
  </div>

  <!-- content area -->
  <div class="flex-grow" />

  <!-- toolbar -->
  <Toolbar metric={metric} />
</div>
