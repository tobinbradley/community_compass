<script>
  import { createEventDispatcher } from 'svelte'

  export let isOpen = false
  const dispatch = createEventDispatcher()

  function handleClose() {
    dispatch('closeModal')
  }
</script>

{#if (isOpen)}
<div class='fixed top-0 bottom-0 left-0 right-0 bg-gray-700 opacity-70 flex justify-center items-center'>
</div>

  <div class="modal rounded-md p-4 shadow-lg bg-white relative z-100 overflow-y-auto bg-transparent">
    <div>
      <button class="px-2 py-4 bg-blue-700 text-white" on:click={handleClose} >Close</button>
    </div>
    <slot></slot>
  </div>

{/if}

<style>
  .modal {
    width: 500px;
    max-width: 90vw;
    max-height: 90vh;
    position: fixed;
        z-index: 2;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        filter: drop-shadow(0 0 20px #333);
  }
</style>
