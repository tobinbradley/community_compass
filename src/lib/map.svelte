<script>
  import Time from '$lib/time.svelte'

  export let metric

</script>

<div>
  I'm a map!
  <Time metric={metric} />
</div>
