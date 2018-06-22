<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Found </h2>
    <ul>
    </ul>
  </div>
</template>

<script>
export default {
    name: 'HomePage',
    data () {
        return {
            msg: 'Welcome to the Home page'
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
