<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/profiles">Profiles</router-link>
    </div>
    <router-view/>
    <div id="push"></div>
    <div id="footer">
      <p><a href="https://github.com/juanyjuan4/cp4.git" target="_blank">Github Source</a></p>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background-color: #83C880;
}

#nav a {
  font-weight: bold;
  color: #343434;
}

#nav a.router-link-exact-active {
  color: #fff;
}

#footer {
  display: flex;
  justify-content: center;
  background-color: #83C880;
  padding: 50px 0;
  align-items: center;
  flex-direction: column;
}

#footer a {
  color: #343434;
}

#footer,
#push {
  height: 50px;
}
</style>
