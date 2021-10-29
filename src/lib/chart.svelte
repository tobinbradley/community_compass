<script>
  import { onMount } from "svelte"
  import { Chart } from "frappe-charts/dist/frappe-charts.min.esm"
  import { formatNumber } from "./common"

  export let metric
  export function exportImage() {
    return trendChart.export()
  }

  let targetEl
  let trendChart
  let ccDistrict

  const data = {
    labels: metric.years,
    datasets: [
      {
        name: "Mecklenburg",
        chartType: "line",
        values: metric.summary.mecklenburg,
      },
      {
        name: "Charlotte",
        chartType: "line",
        values: metric.summary.charlotte,
      },
      {
        name: "District 1",
        chartType: "line",
        values: metric.summary.cc1,
      },
    ],
  }

  onMount(() => {
    trendChart = new Chart(targetEl, {
      title: `${metric.title}${ metric.label ? ` (${metric.label})` : '' }`,
      data: data,
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
    data.datasets.pop()
    data.datasets.push({
      name: `District ${ccDistrict}`,
      chartType: "line",
      values: metric.summary[`cc${ccDistrict}`],
    })
    trendChart.update(data)
  }
</script>

<div>
  <div bind:this={targetEl} />

  <div class="text-center">

    Commission District
    <select
      bind:value={ccDistrict} on:change={handleDistrict}
      class="border-b-2 border-blue-200 outline-none"
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
