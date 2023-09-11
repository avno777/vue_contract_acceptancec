<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header class="h-20 w-screen pr-0 bg-slate-200">
    <div class="wrapper w-full">
      <div class="w-full">
        <ul class="flex w-full pl-12 justify-around font-bold">
          <li>
            <RouterLink to="/" class="font-bold text-xl">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/contracts" class="font-semibold text-xl"
              >Contracts</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/acceptances" class="font-semibold text-xl"
              >Acceptance</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
