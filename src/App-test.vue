<template>
  <div>
    <h1>Hello Vue!</h1>
    <p>This is a test to see if Vue is working.</p>
    <p>Current time: {{ new Date().toLocaleString() }}</p>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>