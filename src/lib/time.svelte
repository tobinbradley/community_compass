<script>
import Card from "./card.svelte";
import CardControls from "./card_controls.svelte";
import Chart from "./chart.svelte";

export let years = [2000, 2010, 2015, 2020]

function handleChange() {    
  let closest = getClosest(years, this.value);
  this.value = document.querySelector("#rangevalue").value = closest; 
}

function getClosest(arr, val) {
	return arr.reduce(function (prev, curr) {
    return (Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev);
  });
}
</script>

<input id="yearslider" class="range blue" type="range" :min={Math.min(...years)} :value={Math.max(...years)} :max={Math.max(...years)} step="1" list="ticks">
<datalist id="ticks" on:change={handleChange}>
    {#each years as year}
    <option>{year}</option>
    {/each}
</datalist>
<output id="rangevalue">2000</output>