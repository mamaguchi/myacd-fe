<template>
  <v-card
    class="mx-auto"
    min-height="800px"
  >
    <v-app-bar>
      <v-app-bar-nav-icon />

      <v-toolbar-title>myWabak - Case</v-toolbar-title>

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
          <!-- POSITIVE CASES -->
          <v-row
            v-if="tabitem === 'Positive Cases'"
            justify="center"
            class="mt-10 mx-4"
          >
            <v-col
              cols="12"
              md="6"
              sm="6"
              class="mx-auto"
            >
              <v-data-table
                v-if="posCases.length"
                dense
                style="cursor:pointer"
                :headers="pcHeaders"
                :items="posCases"
                item-key="ident"
                :page.sync="page"
                :items-per-page="itemsPerPage"
                multi-sort
                hide-default-footer
                class="elevation-3 white"
                @page-count="pageCount = $event"
                @click:row="tblRowClicked"
              >
                <!-- TABLE HEADER CONFIGURATION -->
                <template #[`header.name`]="{ header }">
                  <span class="mb-n6 white--text font-weight-black">{{ header.text }}</span>
                </template>
                <template #[`header.ident`]="{ header }">
                  <span class="white--text font-weight-medium">{{ header.text }}</span>
                </template>

                <!-- TOOLBAR -->
                <template #top>
                  <v-toolbar flat style="cursor:default">
                    <v-spacer />

                    <v-btn
                      small
                      color="primary"
                      dark
                      @click="exportXlsx"
                    >
                      <v-icon class="ml-n2">
                        mdi-plus
                      </v-icon>
                      Export
                    </v-btn>
                  </v-toolbar>
                </template>
              </v-data-table>
            </v-col>

            <v-col cols="12" class="mx-auto">
              <v-pagination
                v-if="posCases.length"
                v-model="page"
                :length="pageCount"
              />
            </v-col>
          </v-row>

          <!-- CLOSE CONTACTS -->
          <v-row
            v-if="tabitem === 'Close Contacts'"
            justify="center"
            class="mt-10 mx-4"
          >
            <v-col
              cols="12"
              md="6"
              sm="6"
              class="mx-auto"
            >
              <v-data-table
                v-if="cc.length"
                dense
                style="cursor:pointer"
                :headers="ccHeaders"
                :items="cc"
                item-key="ident"
                :page.sync="page"
                :items-per-page="itemsPerPage"
                multi-sort
                hide-default-footer
                class="elevation-3 white"
                @page-count="pageCount = $event"
                @click:row="tblRowClicked"
              >
                <!-- TABLE HEADER CONFIGURATION -->
                <template #[`header.name`]="{ header }">
                  <span class="mb-n6 white--text font-weight-black">{{ header.text }}</span>
                </template>
                <template #[`header.ident`]="{ header }">
                  <span class="white--text font-weight-medium">{{ header.text }}</span>
                </template>

                <!-- TOOLBAR -->
                <template #top>
                  <v-toolbar flat style="cursor:default">
                    <v-spacer />

                    <!-- HSO DIALOG -->
                    <v-dialog
                      v-model="hsoDialog"
                      max-width="700px"
                      @keydown.enter="saveHSO"
                      @click:outside="closeHSODialog"
                    >
                      <template #activator="{ on, attrs }">
                        <v-btn
                          small
                          color="green"
                          dark
                          class="mr-2"
                          v-bind="attrs"
                          v-on="on"
                          @click="createHSO"
                        >
                          <v-icon>
                            mdi-plus
                          </v-icon>
                          HSO BARU
                        </v-btn>
                      </template>

                      <v-card>
                        <v-card-title>
                          <span class="headline">HSO Baru</span>
                        </v-card-title>

                        <v-card-text>
                          <v-container>
                            <v-row justify="left">
                              <!-- HSO DETAILS -->
                              <v-col
                                cols="12"
                                md="4"
                              >
                                <v-text-field
                                  v-model="hsoDuration"
                                  label="Tempoh Kuarantin"
                                />
                              </v-col>
                              <v-col
                                cols="12"
                                md="4"
                              >
                                <v-text-field
                                  v-model="hsoBeginDt"
                                  label="Tarikh Bermula Kuarantin"
                                />
                              </v-col>
                              <v-col
                                cols="12"
                                md="4"
                              >
                                <v-text-field
                                  v-model="hsoEndDt"
                                  label="Tarikh Akhir Kuarantin"
                                />
                              </v-col>
                              <v-col
                                cols="12"
                                md="12"
                              >
                                <v-text-field
                                  v-model="hsoAddress"
                                  label="Alamat Kuarantin"
                                />
                              </v-col>
                              <v-col
                                cols="12"
                                md="4"
                              >
                                <v-text-field
                                  v-model="hsoState"
                                  label="Negeri Kuarantin"
                                />
                              </v-col>
                              <v-col
                                cols="12"
                                md="4"
                              >
                                <v-text-field
                                  v-model="hsoDistrict"
                                  label="Daerah Kuarantin"
                                />
                              </v-col>
                              <v-col
                                cols="12"
                                md="4"
                              >
                                <v-text-field
                                  v-model="hsoLocality"
                                  label="Localiti Kuarantin"
                                />
                              </v-col>
                              <v-col
                                cols="12"
                                md="4"
                              >
                                <v-text-field
                                  v-model="hsoTelWaris"
                                  label="Telefon Waris"
                                />
                              </v-col>

                              <!-- DIVIDER -->
                              <v-col
                                cols="12"
                                md="12"
                                sm="12"
                                class="mx-auto"
                              >
                                <v-divider />
                              </v-col>

                              <!-- CLOSE CONTACTS FILTER -->
                              <v-col
                                cols="12"
                                md="12"
                              >
                                <v-text-field
                                  v-model="ccHSOFilter"
                                  label="Filter"
                                  outlined
                                  class="mt-4"
                                />
                              </v-col>

                              <!-- SELECTED CLOSE CONTACTS -->
                              <div v-if="selectedCCForHSO.length !== 0">
                                <v-list-item
                                  v-for="item in selectedCCForHSO"
                                  :key="item.title"
                                  three-line
                                >
                                  <v-list-item-content>
                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                    <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
                                  </v-list-item-content>

                                  <v-list-item-action>
                                    <v-checkbox value="true" />
                                  </v-list-item-action>
                                </v-list-item>
                              </div>

                              <!-- CLOSE CONTACTS LIST -->
                              <v-col
                                cols="12"
                                md="12"
                                sm="12"
                                class="mx-auto"
                              >
                                <v-virtual-scroll
                                  :items="cc"
                                  :item-height="40"
                                  height="300"
                                >
                                  <template #default="{ item }">
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                                        <v-list-item-subtitle>{{ item.ident }}</v-list-item-subtitle>
                                      </v-list-item-content>

                                      <v-list-item-action>
                                        <v-checkbox :input-value="active" />
                                      </v-list-item-action>
                                    </v-list-item>
                                  </template>
                                </v-virtual-scroll>
                              </v-col>

                              <!-- DIVIDER -->
                              <v-col
                                cols="12"
                                md="12"
                                sm="12"
                                class="mx-auto"
                              >
                                <v-divider />
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>

                        <v-card-actions class="mt-n7 mr-4">
                          <v-spacer />
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="closeHSODialog"
                            @keydown.esc="closeHSODialog"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="saveHSO"
                          >
                            Save
                          </v-btn>
                          <v-btn
                            color="yellow darken-3"
                            text
                            :disabled="editedIndex===-1"
                          >
                            Delete
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>

                    <!-- EDIT DIALOG -->
                    <v-dialog
                      v-model="editDialog"
                      max-width="700px"
                      @keydown.enter="saveCC"
                      @click:outside="closeCCEditDialog"
                    >
                      <template #activator="{ on, attrs }">
                        <v-btn
                          small
                          color="amber"
                          dark
                          v-bind="attrs"
                          class="mr-2"
                          v-on="on"
                          @click="addCC"
                        >
                          <v-icon class="ml-n2">
                            mdi-plus
                          </v-icon>
                          Add Contact
                        </v-btn>
                      </template>

                      <v-card>
                        <v-card-title>
                          <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                          <v-container>
                            <!-- SEARCH EXISTING PEOPLE -->
                            <v-row justify="center">
                              <v-col
                                cols="12"
                                md="8"
                                sm="8"
                                class="mx-auto"
                              >
                                <v-text-field
                                  v-model="searchEP"
                                  prepend-inner-icon="mdi-magnify"
                                  outlined
                                  flat
                                  class="rounded-pill"
                                  placeholder="Masukkan IC/Passport"
                                  @keydown.enter="doSearchEP"
                                  @keydown.esc="searchEP=''"
                                >
                                  <template #append>
                                    <v-icon
                                      v-show="searchEP"
                                      class="mr-1 mt-n2"
                                      @click="searchEP=''"
                                    >
                                      mdi-close
                                    </v-icon>
                                    <v-fade-transition leave-absolute>
                                      <div
                                        v-if="searchingEP"
                                        style="height:40px"
                                        class="mt-n2 ml-1"
                                      >
                                        <v-divider
                                          vertical
                                        />
                                        <v-progress-circular
                                          class="mt-n6 ml-6 mr-8"
                                          size="24"
                                          color="info"
                                          indeterminate
                                        />
                                      </div>
                                      <div
                                        v-else
                                        style="height:40px"
                                        class="mt-n2 ml-1"
                                      >
                                        <v-divider
                                          vertical
                                        />
                                        <div
                                          class="mt-n7 ml-4 mr-2 search_onhover_highlight"
                                          style="cursor:pointer"
                                          @click="doSearchEP"
                                        >
                                          SEARCH
                                        </div>
                                      </div>
                                    </v-fade-transition>
                                  </template>
                                </v-text-field>
                              </v-col>
                            </v-row>

                            <!-- SEARCH RESULT -->
                            <v-row>
                              <v-col
                                cols="12"
                                md="8"
                                sm="8"
                                class="mx-auto"
                              >
                                <v-data-table
                                  v-if="searchEPRes.length"
                                  dense
                                  style="cursor:pointer"
                                  :headers="epHeaders"
                                  :items="searchEPRes"
                                  item-key="ident"
                                  :page.sync="epPage"
                                  :items-per-page="epItemsPerPage"
                                  multi-sort
                                  hide-default-footer
                                  class="elevation-3 white"
                                >
                                  <!-- TABLE HEADER CONFIGURATION -->
                                  <template #[`header.name`]="{ header }">
                                    <span class="mb-n6 white--text font-weight-black">{{ header.text }}</span>
                                  </template>
                                  <template #[`header.ident`]="{ header }">
                                    <span class="white--text font-weight-medium">{{ header.text }}</span>
                                  </template>
                                </v-data-table>
                              </v-col>
                            </v-row>

                            <!-- FORM: CREATE NEW PEOPLE -->
                            <v-form @submit.prevent="submit">
                              <v-row>
                                <v-col
                                  cols="12"
                                  md="6"
                                >
                                  <v-text-field
                                    id="profileName"
                                    v-model="editedProfile.name"
                                    label="Name"
                                    :rules="profileNameRules"
                                    :error-messages="requiredProfErrMsg.name"
                                    @change="requiredProfErrMsg.name=''"
                                  />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="6"
                                >
                                  <v-text-field
                                    id="profileIdent"
                                    v-model="editedProfile.ident"
                                    label="IC/Passport"
                                    :rules="profileIdentRules"
                                    :error-messages="requiredProfErrMsg.ident"
                                    @change="requiredProfErrMsg.ident=''"
                                  />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="4"
                                >
                                  <v-menu
                                    id="profileDob"
                                    ref="dobMenu"
                                    v-model="dobMenu"
                                    :close-on-content-click="false"
                                    :return-value.sync="editedProfile.dob"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                  >
                                    <template #activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="editedProfile.dob"
                                        label="Date Of Birth"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        :error-messages="requiredProfErrMsg.dob"
                                        v-on="on"
                                      />
                                    </template>
                                    <v-date-picker
                                      v-model="editedProfile.dob"
                                      no-title
                                      scrollable
                                      @change="requiredProfErrMsg.dob=''"
                                    >
                                      <v-spacer />
                                      <v-btn
                                        text
                                        color="primary"
                                        @click="dobMenu = false"
                                      >
                                        Cancel
                                      </v-btn>
                                      <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.dobMenu.save(editedProfile.dob)"
                                      >
                                        OK
                                      </v-btn>
                                    </v-date-picker>
                                  </v-menu>
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="4"
                                >
                                  <v-select
                                    id="profileGender"
                                    v-model="editedProfile.gender"
                                    :items="gender"
                                    label="Gender"
                                    :error-messages="requiredProfErrMsg.gender"
                                    @change="requiredProfErrMsg.gender=''"
                                  />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="4"
                                >
                                  <v-select
                                    id="profileRace"
                                    v-model="editedProfile.race"
                                    :items="race"
                                    label="Race"
                                    :error-messages="requiredProfErrMsg.race"
                                    @change="requiredProfErrMsg.race=''"
                                  />
                                </v-col>

                                <v-col
                                  cols="12"
                                >
                                  <div v-show="false" />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="4"
                                >
                                  <v-select
                                    id="profileNationality"
                                    v-model="editedProfile.nationality"
                                    :items="nationality"
                                    label="Nationality"
                                    :error-messages="requiredProfErrMsg.nationality"
                                    @change="requiredProfErrMsg.nationality=''"
                                  />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="4"
                                >
                                  <v-select
                                    id="profileEduLvl"
                                    v-model="editedProfile.eduLvl"
                                    :items="eduLvl"
                                    label="Education Level"
                                  />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="4"
                                >
                                  <v-text-field
                                    id="profileOccupation"
                                    v-model="editedProfile.occupation"
                                    label="Occupation"
                                    :rules="profileOccupationRules"
                                    :error-messages="requiredProfErrMsg.occupation"
                                    @change="requiredProfErrMsg.occupation=''"
                                  />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="4"
                                >
                                  <v-file-input
                                    v-model="profilePic"
                                    style="cursor:pointer"
                                    show-size
                                    accept="image/png, image/jpeg, image/bmp"
                                    prepend-icon="mdi-camera"
                                    label="Profile Picture"
                                    @change="processProfilePic"
                                  />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="4"
                                >
                                  <v-text-field
                                    id="profileTel"
                                    v-model="editedProfile.tel"
                                    label="Telephone"
                                    :rules="profileTelRules"
                                    :error-messages="requiredProfErrMsg.tel"
                                    @change="requiredProfErrMsg.tel=''"
                                  />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="4"
                                >
                                  <div v-show="false" />
                                </v-col>

                                <v-col
                                  cols="12"
                                >
                                  <div v-show="false" />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="8"
                                >
                                  <v-text-field
                                    id="profileAddress"
                                    v-model="editedProfile.address"
                                    label="Address"
                                    :error-messages="requiredProfErrMsg.address"
                                    @change="requiredProfErrMsg.address=''"
                                  />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="4"
                                >
                                  <v-text-field
                                    id="profilePostalCode"
                                    v-model="editedProfile.postalCode"
                                    label="Postal Code"
                                    :error-messages="requiredProfErrMsg.postalCode"
                                    @change="requiredProfErrMsg.postalCode=''"
                                  />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="4"
                                >
                                  <v-text-field
                                    id="profileLocality"
                                    v-model="editedProfile.locality"
                                    label="Locality/Taman"
                                    :error-messages="requiredProfErrMsg.locality"
                                    @change="requiredProfErrMsg.locality=''"
                                  />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="4"
                                >
                                  <v-text-field
                                    id="profileDistrict"
                                    v-model="editedProfile.district"
                                    label="District"
                                    :error-messages="requiredProfErrMsg.district"
                                    @change="requiredProfErrMsg.district=''"
                                  />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="4"
                                >
                                  <v-select
                                    id="profileState"
                                    v-model="editedProfile.state"
                                    :items="state"
                                    label="State"
                                    :error-messages="requiredProfErrMsg.state"
                                    @change="requiredProfErrMsg.state=''"
                                  />
                                </v-col>

                                <v-col
                                  cols="12"
                                >
                                  <div v-show="false" />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="4"
                                >
                                  <v-select
                                    id="profileSupportVac"
                                    v-model="editedProfile.supportVac"
                                    :items="supportVac"
                                    item-text="name"
                                    item-value="value"
                                    label="Support Vaccine"
                                    :rules="supportVacRule"
                                    :error-messages="requiredProfErrMsg.supportVac"
                                    @change="requiredProfErrMsg.supportVac=''"
                                  />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="8"
                                >
                                  <div v-show="false" />
                                </v-col>
                              </v-row>
                            </v-form>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer />
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="closeCCEditDialog"
                            @keydown.esc="closeCCEditDialog"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="saveCC"
                          >
                            Save
                          </v-btn>
                          <v-btn
                            color="yellow darken-3"
                            text
                            :disabled="editedIndex===-1"
                            @click="deleteItem"
                          >
                            Delete
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>

                    <!-- DELETE DIALOG -->
                    <v-dialog v-model="removeDialog" max-width="500px">
                      <v-card>
                        <v-card-title class="headline">
                          Are you sure you want to remove this person from close contact list?
                        </v-card-title>
                        <v-card-actions>
                          <v-spacer />
                          <v-btn color="blue darken-1" text @click="closeDelete">
                            Cancel
                          </v-btn>
                          <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                            OK
                          </v-btn>
                          <v-spacer />
                        </v-card-actions>
                      </v-card>
                    </v-dialog>

                    <!-- EXPORT -->
                    <v-btn
                      small
                      color="primary"
                      dark
                      @click="exportXlsx"
                    >
                      <v-icon>
                        mdi-plus
                      </v-icon>
                      Export
                    </v-btn>
                  </v-toolbar>
                </template>
              </v-data-table>
            </v-col>

            <v-col cols="12" class="mx-auto">
              <v-pagination
                v-if="cc.length"
                v-model="page"
                :length="pageCount"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
export default {

  data () {
    return {
      // GENERAL
      tab: null,
      tabItems: ['Overview', 'Positive Cases', 'Close Contacts'],
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,

      // TAB: POSITIVE CASES
      pcHeaders: [
        { text: 'Name', value: 'name', align: 'start', sortable: true, class: 'success', width: '160px' },
        { text: 'IC/Passport', value: 'ident', sortable: true, class: 'success', width: '100px' }
      ],
      posCases: [
        { name: 'patient1', ident: '123' },
        { name: 'patient2', ident: '456' }
      ],

      // TAB: CLOSE CONTACTS
      ccHeaders: [
        { text: 'Name', value: 'name', align: 'start', sortable: true, class: 'success', width: '160px' },
        { text: 'IC/Passport', value: 'ident', sortable: true, class: 'success', width: '100px' }
      ],
      cc: [
        { name: 'patient3', ident: '12345' },
        { name: 'patient4', ident: '67890' }
      ],
      ccEditedIndex: -1,
      editDialog: false,
      removeDialog: false,
      dobMenu: false,
      profilePic: null,
      editedProfile: {
        role: '',
        ident: '',
        name: '',
        gender: '',
        dob: '',
        nationality: '',
        race: '',
        tel: '',
        address: '',
        postalCode: '',
        state: '',
        district: '',
        locality: '',
        eduLvl: '',
        occupation: '',
        comorbids: []
      },
      defaultProfile: {
        role: '',
        ident: '',
        name: '',
        gender: '',
        dob: '',
        nationality: '',
        race: '',
        tel: '',
        address: '',
        postalCode: '',
        state: '',
        district: '',
        locality: '',
        eduLvl: '',
        occupation: '',
        comorbids: []
      },
      requiredProfErrMsg: {
        name: '',
        gender: '',
        // dob: '',
        race: '',
        ident: '',
        nationality: '',
        occupation: '',
        tel: '',
        address: '',
        locality: '',
        district: '',
        postalCode: '',
        state: '',
        supportVac: ''
      },
      searchEP: '',
      searchingEP: false,
      epPage: 1,
      epItemsPerPage: 5,
      searchEPRes: [],
      epHeaders: [
        { text: 'Name', value: 'name', align: 'start', sortable: true, class: 'success', width: '160px' },
        { text: 'IC/Passport', value: 'ident', sortable: true, class: 'success', width: '100px' }
      ],
      // HSO
      hsoDialog: false,
      hsoDuration: '',
      hsoBeginDt: '',
      hsoEndDt: '',
      hsoAddress: '',
      hsoState: '',
      hsoDistrict: '',
      hsoLocality: '',
      hsoTelWaris: '',
      ccHSOFilter: '',
      selectedCCForHSO: []
    }
  },

  computed: {
    formTitle () {
      return this.ccEditedIndex === -1 ? 'New Close Contact' : 'Edit Close Contact'
    }
  },

  methods: {
    tblRowClicked () {
      //
    },

    exportXlsx () {
      //
    },

    addCC () {
      //
    },

    saveCC () {
      //
    },

    closeCCEditDialog () {
      //
    },

    processProfilePic () {
      if (!this.profilePic) { return }

      const _this = this

      const reader = new FileReader()
      reader.readAsDataURL(this.profilePic)

      reader.onload = function (readerEvt) {
        const imgElement = document.createElement('img')
        imgElement.src = readerEvt.target.result // result is the base64-encoded image

        imgElement.onload = function (e) {
          const canvas = document.createElement('canvas')
          // const MAX_WIDTH = 400 // produces base64 string len: ~252866
          const MAX_WIDTH = 100 // produces base64 string len: ~26486
          // const MAX_WIDTH = 50 // produces base64 string len: ~8038

          const scaleSize = MAX_WIDTH / e.target.width
          canvas.width = MAX_WIDTH
          canvas.height = e.target.height * scaleSize

          const ctx = canvas.getContext('2d')

          ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height)

          const picResizedEncoded = ctx.canvas.toDataURL(e.target, 'image/png')
          _this.profile.profilePicData = picResizedEncoded

          // you can send picResizedEncoded to the server
          document.querySelector('#output').src = picResizedEncoded
        }
      }
    },

    doSearchEP () {
      //
    },

    createHSO () {
      //
    },

    saveHSO () {
      //
    },

    closeHSODialog () {
      //
    }

  }
}
</script>
