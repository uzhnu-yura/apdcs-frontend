<template>
<header class="main-header">
  <nav class="navigation">
    <ul class="nav-list">
      <li><a href="/patients">Patients</a></li>
      <li><a href="/create">Create Patient</a></li>
    </ul>
  </nav>
</header>

</template>


<style scoped>
.main-header {
  font-size: 20px;
  background-color: #333;
  padding: 20px;
  text-align: center;
}

.navigation {
  display: inline-block;
}

.nav-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: inline-block;
}

.nav-list li {
  display: inline-block;
  margin-right: 10px;
}

.nav-list li a {
  color: #e2e2e2;
  text-decoration: none;
  padding: 10px;
}

.nav-list li a:hover {
  background-color: #555;
}

</style>