<template>
  <router-view/>
</template>

<style>
#app {
  min-height: 100vh!important;
  font-family: 'Fira Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #3498db;
  background: url(https://i.pinimg.com/originals/fc/de/94/fcde946d572f8968cde14b688527021b.png);
  background-size: cover;
  background-attachment: fixed;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
