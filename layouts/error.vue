<template>
  <div>
    <h1>{{ error.statusCode }}</h1>
    <h2>{{ error.message }} </h2>
  </div>
</template>

<script>
export default {
  layout:'default',
  props:['error'],
}
</script>
