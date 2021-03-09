<template>
  <v-card>
    <v-app-bar>
      <v-app-bar-nav-icon />

      <v-toolbar-title>myWabak - current tab: {{ tab }}</v-toolbar-title>

      <template #extension>
        <v-tabs
          v-model="tab"
          grow
          align-with-title
        >
          <v-tabs-slider color="blue" />

          <v-tab
            v-for="tabitem in tabItems"
            :key="tabitem"
          >
            {{ tabitem }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="tabitem in tabItems"
        :key="tabitem"
      >
        <!-- ============================================= -->
        <!-- HERE IS WHERE U PLACE THE CONTENT OF EACH TAB -->
        <!-- ============================================= -->

        <v-container
          fluid
          fill-height
        >
          <v-row>
            <v-col cols="12">
              <!-- CASES -->
              <v-card
                class="mx-auto"
                min-height="800px"
              >
                <v-list
                  v-if="tabitem ==='tab1'"
                  flat
                  subheader
                  three-line
                >
                  <v-subheader>New Cases</v-subheader>

                  <v-list-item-group
                    v-model="casesSelected"
                    multiple
                    active-class=""
                  >
                    <v-list-item
                      v-for="item in cases"
                      :key="item.title"
                    >
                      <template #default="{ active }">
                        <v-list-item-content>
                          <v-list-item-title>{{ item.title }}</v-list-item-title>
                          <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-checkbox :input-value="active" />
                        </v-list-item-action>
                      </template>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>

export default {
  components: {
    //
  },

  data () {
    return {
      tab: null,
      tabItems: ['tab1', 'tab2', 'tab3'],
      text: 'Lorem ipsum',
      casesSelected: [],
      cases: [
        { title: 'Case 1', subtitle: 'Jengka 1' },
        { title: 'Case 2', subtitle: 'Jengka 2' },
        { title: 'Case 3', subtitle: 'Jengka 3' }
      ]
    }
  }
}
</script>
