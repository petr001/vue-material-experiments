<template>
  <div class="main-nav-container">
    <transition name="nav" appear>
      <nav class="main-nav" v-if="!isSplash">
        <main-nav-content />
      </nav>
    </transition>

    <md-drawer md-fixed :md-visible.sync="menuVisible" @md-closed="hideMenu">
      <md-toolbar class="md-transparent" md-elevation="0">
        <logo-vue-material class="md-icon" animated :blending="false" />
        <span class="md-title">Vue material</span>
      </md-toolbar>

      <div class="main-nav-drawer-content">
        <main-nav-content />
      </div>
    </md-drawer>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import * as types from 'store/mutation-types'
  import MainNavContent from './MainNavContent'

  export default {
    name: 'MainNav',
    components: {
      MainNavContent
    },
    computed: {
      ...mapState({
        isSplash: 'splashPage',
        menuVisible: 'menuVisible'
      })
    },
    methods: {
      ...mapMutations({
        hideMenu: types.HIDE_MENU
      })
    },
    created () {
      this.$router.afterEach((to, from, next) => {
        this.hideMenu()
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "~vue-material/components/MdAnimation/variables";
  @import "~vue-material/components/MdLayout/mixins";

  .main-nav {
    width: 230px;
    padding: 24px 16px 96px 16px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    overflow: auto;
    position: fixed;
    top: 64px;
    bottom: 0;
    left: 0;
    z-index: 2;
    transition: .3s $md-transition-default-timing;
    transition-property: top;

    @include md-layout-small {
      top: 48px;
    }

    @include md-layout-xsmall {
      display: none;
    }
  }

  .nav-leave-active {
    display: none;
  }

  .nav-enter-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
    transition: .4s $md-transition-default-timing;
    transition-property: opacity, transform;
    will-change: opacity, transform;
  }

  .nav-enter-to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  .md-drawer {
    display: none;

    @include md-layout-xsmall {
      display: block;
    }
  }

  .logo-vue-material {
    width: 32px;
    height: 32px;
    margin: 0 0 0 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main-nav-drawer-content {
    padding: 16px;
  }
</style>
