import Vue from 'vue'

const components = {
  BaseCard: () => import('../../components/base/Card.vue' /* webpackChunkName: "components/base-card" */).then(c => c.default || c),
  BaseItem: () => import('../../components/base/Item.vue' /* webpackChunkName: "components/base-item" */).then(c => c.default || c),
  BaseItemGroup: () => import('../../components/base/ItemGroup.vue' /* webpackChunkName: "components/base-item-group" */).then(c => c.default || c),
  BaseItemSubGroup: () => import('../../components/base/ItemSubGroup.vue' /* webpackChunkName: "components/base-item-sub-group" */).then(c => c.default || c),
  BaseMaterialAlert: () => import('../../components/base/MaterialAlert.vue' /* webpackChunkName: "components/base-material-alert" */).then(c => c.default || c),
  BaseMaterialCard: () => import('../../components/base/MaterialCard.vue' /* webpackChunkName: "components/base-material-card" */).then(c => c.default || c),
  BaseMaterialChartCard: () => import('../../components/base/MaterialChartCard.vue' /* webpackChunkName: "components/base-material-chart-card" */).then(c => c.default || c),
  BaseMaterialSnackbar: () => import('../../components/base/MaterialSnackbar.vue' /* webpackChunkName: "components/base-material-snackbar" */).then(c => c.default || c),
  BaseMaterialStatsCard: () => import('../../components/base/MaterialStatsCard.vue' /* webpackChunkName: "components/base-material-stats-card" */).then(c => c.default || c),
  BaseMaterialTabs: () => import('../../components/base/MaterialTabs.vue' /* webpackChunkName: "components/base-material-tabs" */).then(c => c.default || c),
  BaseMaterialTestimony: () => import('../../components/base/MaterialTestimony.vue' /* webpackChunkName: "components/base-material-testimony" */).then(c => c.default || c),
  BaseSubheading: () => import('../../components/base/Subheading.vue' /* webpackChunkName: "components/base-subheading" */).then(c => c.default || c),
  BaseVComponent: () => import('../../components/base/VComponent.vue' /* webpackChunkName: "components/base-vcomponent" */).then(c => c.default || c),
  CoreAppBar: () => import('../../components/core/AppBar.vue' /* webpackChunkName: "components/core-app-bar" */).then(c => c.default || c),
  CoreDrawer: () => import('../../components/core/Drawer.vue' /* webpackChunkName: "components/core-drawer" */).then(c => c.default || c),
  CoreFooter: () => import('../../components/core/Footer.vue' /* webpackChunkName: "components/core-footer" */).then(c => c.default || c),
  CoreView: () => import('../../components/core/View.vue' /* webpackChunkName: "components/core-view" */).then(c => c.default || c)
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
