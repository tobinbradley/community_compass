<script>
  import { onMount } from "svelte"
  import { Chart } from "frappe-charts/dist/frappe-charts.min.esm"
  import { formatNumber, groupYears } from "./common"
  import groups from './data/neighborhod-groups.json'

  export let metric
  export let data
  export function exportImage() {
    trendChart.export()
  }

  let targetEl
  let trendChart
  let ccDistrict

  const chartData = {
    labels: data.years,
    datasets: [
      {
        name: "Mecklenburg",
        chartType: "line",
        values: groupYears(data),
      },
      {
        name: "Charlotte",
        chartType: "line",
        values: groupYears(data, groups["Jurisdiction"]["Charlotte"]),
      },
      {
        name: "District 1",
        chartType: "line",
        values: groupYears(data, groups["County Commission"]["1"]),
      },
    ],
  }

  onMount(() => {
    trendChart = new Chart(targetEl, {
      title: `${metric.title}${ metric.label ? ` (${metric.label})` : '' }`,
      data: chartData,
      type: "line", // or 'bar', 'line', 'scatter', 'pie', 'percentage'
      height: 380,
      colors: ["#7cd6fd", "#743ee2", "#bada55"],
      lineOptions: {
        regionFill: 1, // default: 0
      },
      tooltipOptions: {
          formatTooltipY: d => formatNumber(d, metric.format || null)
      }
    })
  })

  function handleDistrict() {
    chartData.datasets.pop()
    chartData.datasets.push({
      name: `District ${ccDistrict}`,
      chartType: "line",
      values:  groupYears(data, groups["County Commission"][ccDistrict]),
    })
    trendChart.update(chartData)
  }
</script>

<div>
  <div bind:this={targetEl} />

  <div class="text-center">

    Commission District
    <select
      bind:value={ccDistrict} on:change={handleDistrict}
      class="border-b-2 border-blue-200 bg-white outline-none"
    >
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
      <option>6</option>
    </select>
  </div>
</div>
