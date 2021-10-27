<script>
  import { onMount } from 'svelte'
  import { Chart } from 'frappe-charts/dist/frappe-charts.min.esm'

  export let metric

  let targetEl
  
  const data = {
    labels: ["2001", "2002", "2003", "2004",
        "2005", "2006", "2007", "2008", "2009"
    ],
    datasets: [
        {
            name: "Mecklenburg", chartType: "line",
            values: [25, 40, 30, 19, 8, 52, 17, -4]
        },
        {
            name: "Charlotte", chartType: "line",
            values: [25, 50, -10, 15, 18, 32, 27, 14]
        },
        {
            name: "District 1", chartType: "line",
            values: [25, 40, 30, 35, 8, 52, 17, -4]
        }
    ]
}

onMount(() => {
  const chart = new Chart(targetEl, {  // or a DOM element,
                                            // new Chart() in case of ES6 module with above usage

    data: data,
    type: 'line', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
    height: 380,
    colors: ['#7cd6fd', '#743ee2'],
    lineOptions: {
    regionFill: 1 // default: 0
},
axisOptions: {
  //default:false
        xAxisMode: "span",
        yAxisMode: "span"
    },

})
  
})
  

</script>

<div>
  <div bind:this={targetEl}></div>

  <div class="text-center">
    <label for="cars">County Commission District </label>

<select name="cars" id="cars" class="border-b-2 border-blue-200 outline-none">
  <option>1</option>
  <option>2</option>
  <option>3</option>
  <option>4</option>
  <option>5</option>
  <option>6</option>
</select>
  </div>

</div>
