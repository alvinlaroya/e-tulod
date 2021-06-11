<template>
  <v-app class="grey lighten-4">
    <template>
      <v-main class="app">
      <!--   <Navbar /> -->
        <router-view></router-view>
        <router-view class="view two" name="navbar"></router-view>
        <router-view class="view three" name="sidebar"></router-view>
        <!-- <notifications group="foo" position="bottom left" width="400" /> -->
      </v-main>
    </template>
  </v-app>
</template>
