<script>
  import { onMount } from 'svelte'

  export let metric
  let data

  onMount(async () => {
    // get data
    const fetchData = await fetch('data/community-group.json')
    data = await fetchData.json()
  })
</script>

<div>
  <table>
    <thead>
      <tr>
        <th>Year</th>
        <th>County</th>
        <th>City</th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th>{metric.title}</th>
      </tr>
    </thead>
    {#if (data) }


    <tbody>
      <!-- {#each data["cc1"] as el}
        <tr>
          <td>{el[2]}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      {/each} -->
    </tbody>
    {/if}
</div>
