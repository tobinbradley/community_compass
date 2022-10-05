<script>
  import { print, help } from "./store"
</script>

<div class="bg-white shadow-xl print:hidden">
  <div class="container mx-auto px-4 md:px-0">
    <div class="flex mx-auto items-center justify-between">
      <div class="flex flex-row items-center justify-between lg:justify-start">
        <a
          href="./"
          class="text-xl font-bold tracking-tighter text-blue-500 transition duration-500 ease-in-out transform tracking-relaxed px-3"
        >
          Community Compass
        </a>
      </div>
      <nav class="flex-grow  flex justify-end flex-row">
        <ul class="list-none space-y-0 items-center inline-flex">
          <li>
            <button
            on:click={() => $print = !$print}
              class="
        px-2
        lg:px-6
        py-6
        text-sm
        m-0
        border-b-2 border-transparent
        hover:border-blue-400
        leading-[22px]
        md:px-3
        text-gray-500
        hover:text-blue-500 transition-colors duration-300 ease-in-out
      "
            >
              Print
          </button>
          </li>
          <li>
            <button
            on:click={() => $help = true}
              class="
          px-2
          lg:px-6
          py-6
          text-sm
          border-b-2 border-transparent
          hover:border-blue-400
          leading-[22px]
          md:px-3
          text-gray-500
          hover:text-blue-500 transition-colors duration-300 ease-in-out
        "
            >
              Help
          </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</div>
