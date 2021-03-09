<template>
  <v-card>
    <v-app-bar>
      <!-- <v-app-bar-nav-icon /> -->

      <v-toolbar-title>myWabak</v-toolbar-title>

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
        class="mb-16 pb-16"
      >
        <!-- ============================================= -->
        <!-- HERE IS WHERE U PLACE THE CONTENT OF EACH TAB -->
        <!-- ============================================= -->

        <v-container
          fluid
          fill-height
          class="mb-16 pb-16"
        >
          <!--                -->
          <!-- CREATE NEW ACD -->
          <!--                -->
          <v-row
            v-if="tabitem === 'Create ACD'"
            class="mt-4 mb-16 pb-16"
          >
            <!-- ACD NAME -->
            <v-col
              cols="12"
              md="3"
              sm="10"
              class="text-center mx-auto"
            >
              <v-text-field
                v-model="acdName"
                label="ACD Name"
              />
            </v-col>

            <!-- STATE -->
            <v-col
              cols="12"
              md="3"
              sm="10"
              class="text-center mx-auto"
            >
              <v-select
                v-model="state"
                :items="stateSelection"
                label="State"
                @input="reloadDistrict"
              />
            </v-col>

            <!-- DISTRICT -->
            <v-col
              cols="12"
              md="3"
              sm="10"
              class="text-center mx-auto"
            >
              <v-select
                v-model="district"
                :disabled="!state"
                :items="districtSelection"
                label="District"
                @input="reloadLokaliti"
              />
            </v-col>

            <!-- LOKALITI -->
            <v-col
              cols="12"
              md="3"
              sm="10"
              class="text-center mx-auto"
            >
              <v-select
                v-model="lokaliti"
                :disabled="!district"
                :items="lokalitiSelection"
                label="Lokaliti"
              />
            </v-col>

            <!-- CREATE ACD BUTTON -->
            <v-col
              cols="12"
              md="10"
              sm="10"
              class="text-center mx-auto"
            >
              <v-btn
                @click="createNewACD"
              >
                Daftar ACD Baru
              </v-btn>
            </v-col>
          </v-row>

          <!--     -->
          <!-- ACD -->
          <!--     -->
          <v-row
            v-if="tabitem === 'ACD'"
            class="mt-4 mb-16 pb-16"
          >
            <!-- TARIKH ACD -->
            <v-col
              cols="12"
              md="5"
              sm="10"
              class="text-center mx-auto"
            >
              <v-text-field
                v-model="today"
                label="Tarikh ACD"
                prepend-icon="mdi-calendar"
                readonly
                disabled
              />
            </v-col>

            <!-- CHOOSE AN ACD -->
            <v-col
              cols="12"
              md="5"
              sm="10"
              class="text-center mx-auto"
            >
              <v-select
                v-model="acd"
                :items="acdSelection"
                label="Pilih ACD"
                @input="reloadRumahAndSaringan"
              />
            </v-col>

            <!--  NEWLINE  -->
            <!--           -->
            <!-- ACD RUMAH -->
            <!--           -->
            <v-col
              v-show="acd"
              cols="12"
              md="12"
              sm="12"
            >
              <v-divider />
            </v-col>
            <v-col
              v-show="acd"
              cols="12"
              md="10"
              sm="12"
              class="text-center mx-auto"
            >
              <span
                class="text-h4 font-weight-regular"
              >
                Lawatan Rumah
              </span>
            </v-col>

            <!-- NEWLINE -->
            <!-- STATISTIK RUMAH -->
            <v-col
              v-show="acd"
              cols="12"
              md="10"
              sm="12"
              class="mx-auto"
            >
              <v-container fluid>
                <v-data-table
                  dense
                  style="cursor:pointer"
                  :headers="rumahHeaders"
                  :items="rumah"
                  item-key="id"
                  multi-sort
                  hide-default-footer
                  class="elevation-3 white"
                >
                  <!-- TABLE HEADER CONFIGURATION -->
                  <template #[`header.bilrumah`]="{ header }">
                    <span class="mb-n6 white--text font-weight-black">{{ header.text }}</span>
                  </template>
                  <template #[`header.bilrumahk`]="{ header }">
                    <span class="white--text font-weight-medium">{{ header.text }}</span>
                  </template>
                  <template #[`header.bilrumahp`]="{ header }">
                    <span class="white--text font-weight-medium">{{ header.text }}</span>
                  </template>

                  <!-- TO HIDE(CAMOUFLAGE WITH 2ND LAST COLUMN)
                ID COLUMN HEADER & BODY -->
                  <template #[`header.id`]>
                    <div v-if="false" />
                  </template>
                  <template #[`item.id`]>
                    <div v-if="false" />
                  </template>

                  <!-- TOOLBAR -->
                  <template #top>
                    <v-toolbar flat style="cursor:default">
                      <v-spacer />
                      <v-btn
                        color="green darken-1"
                        dark
                        @click="lawatanBaru"
                      >
                        Lawatan Baru
                      </v-btn>
                    </v-toolbar>
                  </template>
                </v-data-table>
              </v-container>
            </v-col>

            <!-- NEWLINE -->
            <v-col
              v-show="acd"
              cols="12"
              md="12"
              sm="12"
            >
              <div v-show="false" />
            </v-col>

            <!-- NEWLINE -->
            <!-- IS RUMAH KOSONG? -->
            <v-col
              v-if="lawatanRumahBaru"
              cols="12"
              md="10"
              sm="12"
              class="text-center mx-auto"
            >
              <span
                class="text-h5 font-weight-light"
              >
                Rumah Kosong?
              </span>
            </v-col>
            <v-col
              v-if="lawatanRumahBaru"
              cols="12"
              md="10"
              sm="12"
              class="text-center mx-auto"
            >
              <v-btn-toggle
                v-model="isRumahKosong"
                tile
                color="green darken-1"
                group
              >
                <v-btn value="ya">
                  Ya
                </v-btn>
                <v-btn value="tidak">
                  Tidak
                </v-btn>
              </v-btn-toggle>
            </v-col>
            <v-col
              v-if="lawatanRumahBaru"
              cols="12"
              md="10"
              sm="12"
              class="text-center mx-auto"
            >
              <v-btn
                @click="tambahRumah"
              >
                Submit
              </v-btn>
            </v-col>

            <!--  NEWLINE  -->
            <!--           -->
            <!-- ACD PENGHUNI -->
            <!--           -->
            <v-col
              v-show="acd"
              cols="12"
              md="12"
              sm="12"
              class="mt-4"
            >
              <v-divider />
            </v-col>
            <v-col
              v-show="acd"
              cols="12"
              md="10"
              sm="12"
              class="text-center mx-auto"
            >
              <span
                class="text-h4 font-weight-regular"
              >
                Saringan
              </span>
            </v-col>

            <!-- NEWLINE -->
            <!-- STATISTIK PENGHUNI -->
            <v-col
              v-show="acd"
              cols="12"
              md="10"
              sm="12"
              class="mx-auto"
            >
              <v-container fluid>
                <v-data-table
                  dense
                  style="cursor:pointer"
                  :headers="penghuniHeaders"
                  :items="penghuni"
                  item-key="id"
                  multi-sort
                  hide-default-footer
                  class="elevation-3 white"
                >
                  <!-- TABLE HEADER CONFIGURATION -->
                  <template #[`header.bergejala`]="{ header }">
                    <span class="white--text font-weight-medium">{{ header.text }}</span>
                  </template>
                  <template #[`header.wargaemas`]="{ header }">
                    <span class="white--text font-weight-medium">{{ header.text }}</span>
                  </template>

                  <!-- TO HIDE(CAMOUFLAGE WITH 2ND LAST COLUMN)
                ID COLUMN HEADER & BODY -->
                  <template #[`header.id`]>
                    <div v-if="false" />
                  </template>
                  <template #[`item.id`]>
                    <div v-if="false" />
                  </template>

                  <!-- TOOLBAR -->
                  <!-- <template #top>
                    <v-toolbar flat style="cursor:default">
                      <v-spacer />
                      <v-btn
                        color="green darken-1"
                        dark
                        @click="saringanBaru"
                      >
                        Saringan Baru
                      </v-btn>
                    </v-toolbar>
                  </template> -->
                </v-data-table>
              </v-container>
            </v-col>

            <!-- NEWLINE -->
            <v-col
              cols="12"
              md="12"
              sm="12"
            >
              <div v-show="false" />
            </v-col>

            <!-- SEARCH EXISTING PENGHUNI -->
            <v-col
              v-if="acd"
              cols="12"
              md="6"
              sm="10"
              class="text-center mx-auto"
            >
              <v-text-field
                v-model="searchEP"
                prepend-inner-icon="mdi-magnify"
                outlined
                flat
                class="rounded-pill"
                placeholder="Check IC/Passport"
                :hint="searchEPHint"
                @keydown.enter="doSearchEP"
                @keydown.esc="searchEP=''"
                @input="searchEPHint=''"
              >
                <template #append>
                  <v-icon
                    v-show="searchEP"
                    class="mr-1 mt-n2"
                    @click="clearSearchHistory"
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
                        CARI
                      </div>
                    </div>
                  </v-fade-transition>
                </template>
              </v-text-field>
            </v-col>

            <!-- NEWLINE -->
            <v-col
              cols="12"
              md="12"
              sm="12"
            >
              <div v-show="false" />
            </v-col>

            <!-- REGISTER NEW SARINGAN -->
            <v-col
              v-if="acd"
              cols="12"
              md="10"
              sm="10"
            >
              <v-row justify="left" class="mt-n8 ml-16 mb-n4">
                <div
                  style="cursor: pointer"
                  @click="saringanPenghuniBaru = !saringanPenghuniBaru"
                >
                  <v-icon
                    small
                    left
                  >
                    mdi-plus
                  </v-icon>
                  <span class="ml-n2 mb-n2">Daftar Baru</span>
                </div>
              </v-row>
            </v-col>

            <!-- NEWLINE -->
            <!-- DETAILS SARINGAN BARU -->
            <v-col
              v-if="saringanPenghuniBaru"
              cols="12"
              md="4"
              sm="10"
              class="text-center mx-auto"
            >
              <v-text-field
                v-model="name"
                label="Nama"
              />
            </v-col>
            <v-col
              v-if="saringanPenghuniBaru"
              cols="12"
              md="4"
              sm="10"
              class="text-center mx-auto"
            >
              <v-text-field
                v-model="ident"
                label="IC/Passport"
              />
            </v-col>
            <v-col
              v-if="saringanPenghuniBaru"
              cols="12"
              md="4"
              sm="10"
              class="text-center mx-auto"
            >
              <v-menu
                v-model="dobMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <template #activator="{ on }">
                  <v-text-field
                    label="Tarikh Lahir"
                    prepend-icon="mdi-calendar"
                    readonly
                    :value="dobVal"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="dob"
                  locale="en-in"
                  no-title
                  @input="dobMenu = false"
                />
              </v-menu>
            </v-col>
            <v-col
              v-if="saringanPenghuniBaru &&
                dob"
              cols="12"
              md="4"
              sm="10"
              class="text-center mx-auto"
            >
              <v-text-field
                v-model="age"
                label="Umur"
                readonly
              />
            </v-col>
            <v-col
              v-if="saringanPenghuniBaru"
              cols="12"
              md="4"
              sm="10"
              class="text-center mx-auto"
            >
              <v-text-field
                v-model="tel"
                label="Telefon"
              />
            </v-col>
            <v-col
              v-if="saringanPenghuniBaru"
              cols="12"
              md="4"
              sm="10"
              class="text-center mx-auto"
            >
              <v-text-field
                v-model="address"
                label="Alamat"
              />
            </v-col>
            <v-col
              v-if="saringanPenghuniBaru"
              cols="12"
              md="4"
              sm="10"
              class="text-center mx-auto"
            >
              <v-text-field
                v-model="comorbid"
                label="Comorbid (DM, HPT, Asthma, CKD)"
              />
            </v-col>
            <v-col
              v-if="saringanPenghuniBaru"
              cols="12"
              md="4"
              sm="10"
              class="text-center mx-auto"
            >
              <v-select
                v-model="kategorikes"
                :items="kategorikessaringan"
                label="Kategori Kes"
              />
            </v-col>
            <v-col
              v-if="saringanPenghuniBaru &&
                kategorikes==='Bergejala'"
              cols="12"
              md="4"
              sm="10"
              class="text-center mx-auto"
            >
              <v-text-field
                v-model="gejala"
                label="Gejala (Demam, Batuk, Selsema, Sakit Tekak)"
              />
            </v-col>
            <v-col
              v-if="saringanPenghuniBaru"
              cols="12"
              md="10"
              sm="10"
              class="text-center mx-auto mb-8"
            >
              <v-btn
                @click="tambahSaringan"
              >
                Submit
              </v-btn>
            </v-col>
          </v-row>

          <!--                       -->
          <!-- Klinik Kesihatan & IK -->
          <!--                       -->
          <v-row
            v-if="tabitem === 'Klinik Kesihatan & IK'"
            class="mt-6 mb-16 pb-16"
          >
            <!-- TARIKH ACD -->
            <v-col
              cols="12"
              md="3"
              sm="10"
              class="text-center mx-auto"
            >
              <v-menu
                v-model="acdMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <template #activator="{ on }">
                  <v-text-field
                    label="ACD Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    :value="tarikhacdVal"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="tarikhacd"
                  locale="en-in"
                  no-title
                  @input="acdMenu = false"
                />
              </v-menu>
            </v-col>

            <!-- STATE -->
            <v-col
              cols="12"
              md="3"
              sm="10"
              class="text-center mx-auto"
            >
              <v-select
                v-model="stateKKIK"
                :items="stateSelection"
                label="State"
                @input="reloadDistrict"
              />
            </v-col>

            <!-- DISTRICT -->
            <v-col
              cols="12"
              md="3"
              sm="10"
              class="text-center mx-auto"
            >
              <v-select
                v-model="districtKKIK"
                :disabled="!stateKKIK"
                :items="districtKKIKSelection"
                label="District"
                @input="reloadLokaliti"
              />
            </v-col>

            <!-- LOKALITI -->
            <v-col
              cols="12"
              md="3"
              sm="10"
              class="text-center mx-auto"
            >
              <v-select
                v-model="lokalitiKKIK"
                :disabled="!districtKKIK"
                :items="lokalitiKKIKSelection"
                label="Lokaliti"
              />
            </v-col>

            <!-- LOKALITI -->
            <!-- <v-col
              cols="12"
              md="4"
              sm="4"
              class="text-center mx-auto"
            >
              <v-select
                v-model="lokalitiKKIK"
                :items="lokalitiSelection"
                label="Lokaliti"
              />
            </v-col> -->

            <!-- SEARCH -->
            <v-col
              cols="12"
              md="10"
              sm="10"
              class="text-center mx-auto"
            >
              <v-btn
                @click="reloadSaringanKKIK"
              >
                Search
              </v-btn>
            </v-col>

            <!-- SARINGAN SEARCH RESULTS -->
            <v-col
              cols="12"
              md="12"
              sm="12"
              class="mx-auto"
            >
              <v-container fluid fill-height>
                <v-data-table
                  v-if="saringanPeoples.length!=0"
                  dense
                  style="cursor:pointer"
                  :headers="saringanPeopleHeaders"
                  :items="saringanPeoples"
                  item-key="ident"
                  :page.sync="page"
                  :items-per-page="itemsPerPage"
                  multi-sort
                  hide-default-footer
                  class="elevation-3 white"
                  @page-count="pageCount = $event"
                >
                  <!-- INLINE EDIT DIALOG -->
                  <template #[`item.name`]="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.name"
                      large
                      persistent
                      @save="saveSaringanItemPeople(
                        props.item.ident,
                        'name',
                        props.item.name)"
                    >
                      <div>{{ props.item.name }}</div>
                      <template #input>
                        <div class="mt-4 title">
                          Update Name
                        </div>
                        <v-text-field
                          v-model="props.item.name"
                          label="Edit"
                          single-line
                          autofocus
                        />
                      </template>
                    </v-edit-dialog>
                  </template>

                  <template #[`item.tel`]="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.tel"
                      large
                      persistent
                      @save="saveSaringanItemPeople(
                        props.item.ident,
                        'tel',
                        props.item.tel)"
                    >
                      <div>{{ props.item.tel }}</div>
                      <template #input>
                        <div class="mt-4 title">
                          Update Telephone
                        </div>
                        <v-text-field
                          v-model="props.item.tel"
                          label="Edit"
                          single-line
                          autofocus
                        />
                      </template>
                    </v-edit-dialog>
                  </template>

                  <template #[`item.address`]="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.address"
                      large
                      persistent
                      @save="saveSaringanItemPeople(
                        props.item.ident,
                        'address',
                        props.item.address)"
                    >
                      <div>{{ props.item.address }}</div>
                      <template #input>
                        <div class="mt-4 title">
                          Update Address
                        </div>
                        <v-text-field
                          v-model="props.item.address"
                          label="Edit"
                          single-line
                          autofocus
                        />
                      </template>
                    </v-edit-dialog>
                  </template>

                  <template #[`item.comorbid`]="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.comorbid"
                      large
                      persistent
                      @save="saveSaringanItemPeople(
                        props.item.ident,
                        'comorbid',
                        props.item.comorbid)"
                    >
                      <div>{{ props.item.comorbid }}</div>
                      <template #input>
                        <div class="mt-4 title">
                          Update Comorbid
                        </div>
                        <v-text-field
                          v-model="props.item.comorbid"
                          label="Edit"
                          single-line
                          autofocus
                        />
                      </template>
                    </v-edit-dialog>
                  </template>

                  <template #[`item.kategorikes`]="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.kategorikes"
                      large
                      persistent
                      @save="saveSaringanItemACDActivity(
                        props.item.tarikhACD,
                        props.item.ident,
                        'kategorikes',
                        props.item.kategorikes)"
                    >
                      <div>{{ props.item.kategorikes }}</div>
                      <template #input>
                        <div class="mt-4 title">
                          Update Kategori Kes
                        </div>
                        <v-select
                          v-model="props.item.kategorikes"
                          :items="kategorikessaringan"
                          label="Edit"
                        />
                      </template>
                    </v-edit-dialog>
                  </template>

                  <template #[`item.gejala`]="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.gejala"
                      large
                      persistent
                      @save="saveSaringanItemACDActivity(
                        props.item.tarikhACD,
                        props.item.ident,
                        'gejala',
                        props.item.gejala)"
                    >
                      <div>{{ props.item.gejala }}</div>
                      <template #input>
                        <div class="mt-4 title">
                          Update Gejala
                        </div>
                        <v-text-field
                          v-model="props.item.gejala"
                          label="Edit"
                          single-line
                          autofocus
                        />
                      </template>
                    </v-edit-dialog>
                  </template>

                  <template #[`item.jenissampel`]="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.jenissampel"
                      large
                      persistent
                      @save="saveSaringanItemSampel(
                        props.item.ident,
                        'jenissampel',
                        props.item.jenissampel)"
                    >
                      <div>{{ props.item.jenissampel }}</div>
                      <template #input>
                        <div class="mt-4 title">
                          Update Jenis Sampel
                        </div>
                        <v-select
                          v-model="props.item.jenissampel"
                          :items="jenisSampel"
                          label="Edit"
                        />
                      </template>
                    </v-edit-dialog>
                  </template>

                  <template #[`item.sampeltca`]="props">
                    <v-datetime-picker
                      v-model="props.item.sampeltca"
                      label="Set Date"
                      @input="saveSaringanItemSampel(
                        props.item.ident,
                        'sampeltca',
                        props.item.sampeltca)"
                    />
                  </template>

                  <template #[`item.bildipanggil`]="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.bildipanggil"
                      large
                      persistent
                      @save="saveSaringanItemSampel(
                        props.item.ident,
                        'bildipanggil',
                        props.item.bildipanggil)"
                    >
                      <div>{{ props.item.bildipanggil }}</div>
                      <template #input>
                        <div class="mt-4 title">
                          Update Berapa Kali Dipanggil
                        </div>
                        <v-text-field
                          v-model.number="props.item.bildipanggil"
                          label="Edit"
                          single-line
                          autofocus
                          append-outer-icon="mdi-arrow-up"
                          prepend-icon="mdi-arrow-down"
                          @click:append-outer="props.item.bildipanggil=props.item.bildipanggil+1"
                          @click:prepend="props.item.bildipanggil=props.item.bildipanggil-1"
                        />
                      </template>
                    </v-edit-dialog>
                  </template>

                  <template #[`item.sampeldiambil`]="props">
                    <v-checkbox
                      v-model="props.item.sampeldiambil"
                      @change="saveSaringanItemSampel(
                        props.item.ident,
                        'sampeldiambil',
                        props.item.sampeldiambil)"
                    />
                  </template>

                  <template #[`item.gelanghso`]="props">
                    <v-checkbox
                      v-model="props.item.gelanghso"
                      @change="saveSaringanItemPeople(
                        props.item.ident,
                        'gelanghso',
                        props.item.gelanghso)"
                    />
                  </template>

                  <template #[`item.annex14`]="props">
                    <v-checkbox
                      v-model="props.item.annex14"
                      @change="saveSaringanItemPeople(
                        props.item.ident,
                        'annex14',
                        props.item.annex14)"
                    />
                  </template>

                  <template #[`item.sampelres`]="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.sampelres"
                      large
                      persistent
                      @save="saveSaringanItemSampel(
                        props.item.ident,
                        'sampelres',
                        props.item.sampelres)"
                    >
                      <div>{{ props.item.sampelres }}</div>
                      <template #input>
                        <div class="mt-4 title">
                          Keputusan Sampel
                        </div>
                        <v-select
                          v-model="props.item.sampelres"
                          :items="sampelRes"
                          label="Edit"
                        />
                      </template>
                    </v-edit-dialog>
                  </template>

                  <template #[`item.pelepasan`]="props">
                    <v-checkbox
                      v-model="props.item.pelepasan"
                      @change="saveSaringanItemPeople(
                        props.item.ident,
                        'pelepasan',
                        props.item.pelepasan)"
                    />
                  </template>

                  <!-- TABLE HEADER CONFIGURATION -->
                  <template #[`header.name`]="{ header }">
                    <span class="mb-n6 white--text font-weight-black">{{ header.text }}</span>
                  </template>
                  <template #[`header.age`]="{ header }">
                    <span class="mb-n6 white--text font-weight-black">{{ header.text }}</span>
                  </template>
                  <template #[`header.ident`]="{ header }">
                    <span class="white--text font-weight-medium">{{ header.text }}</span>
                  </template>
                  <template #[`header.tel`]="{ header }">
                    <span class="white--text font-weight-medium">{{ header.text }}</span>
                  </template>
                  <template #[`header.address`]="{ header }">
                    <span class="mb-n6 white--text font-weight-black">{{ header.text }}</span>
                  </template>
                  <template #[`header.comorbid`]="{ header }">
                    <span class="mb-n6 white--text font-weight-black">{{ header.text }}</span>
                  </template>
                  <template #[`header.locality`]="{ header }">
                    <span class="white--text font-weight-medium">{{ header.text }}</span>
                  </template>
                  <template #[`header.district`]="{ header }">
                    <span class="white--text font-weight-medium">{{ header.text }}</span>
                  </template>
                  <template #[`header.state`]="{ header }">
                    <span class="mb-n6 white--text font-weight-black">{{ header.text }}</span>
                  </template>
                  <!-- <template #[`header.tarikhACD`]="{ header }">
                    <span class="white--text font-weight-medium">{{ header.text }}</span>
                  </template> -->
                  <template #[`header.kategorikes`]="{ header }">
                    <span class="white--text font-weight-medium">{{ header.text }}</span>
                  </template>
                  <template #[`header.gejala`]="{ header }">
                    <span class="mb-n6 white--text font-weight-black">{{ header.text }}</span>
                  </template>
                  <template #[`header.jenissampel`]="{ header }">
                    <span class="mb-n6 white--text font-weight-black">{{ header.text }}</span>
                  </template>
                  <template #[`header.sampeltca`]="{ header }">
                    <span class="white--text font-weight-medium">{{ header.text }}</span>
                  </template>
                  <template #[`header.bildipanggil`]="{ header }">
                    <span class="white--text font-weight-medium">{{ header.text }}</span>
                  </template>
                  <template #[`header.sampeldiambil`]="{ header }">
                    <span class="mb-n6 white--text font-weight-black">{{ header.text }}</span>
                  </template>
                  <template #[`header.gelanghso`]="{ header }">
                    <span class="white--text font-weight-medium">{{ header.text }}</span>
                  </template>
                  <template #[`header.annex14`]="{ header }">
                    <span class="white--text font-weight-medium">{{ header.text }}</span>
                  </template>
                  <template #[`header.sampelres`]="{ header }">
                    <span class="mb-n6 white--text font-weight-black">{{ header.text }}</span>
                  </template>
                  <template #[`header.pelepasan`]="{ header }">
                    <span class="white--text font-weight-medium">{{ header.text }}</span>
                  </template>

                  <!-- TOOLBAR -->
                  <!-- <template #top>
                    <v-toolbar flat style="cursor:default">
                      <v-spacer />
                      <v-btn
                        color="green darken-1"
                        dark
                        @click="exportXlsx"
                      >
                        Export
                      </v-btn>
                    </v-toolbar>
                  </template> -->
                </v-data-table>
              </v-container>
            </v-col>

            <!-- TABLE EXTERNAL PAGINATION -->
            <v-col cols="auto" class="mx-auto mb-16 pb-16">
              <v-pagination
                v-if="saringanPeoples.length!=0"
                v-model="page"
                :length="pageCount"
              />
            </v-col>

            <v-col cols="12" class="mb-16 pb-8">
              <span />
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { format } from 'date-fns'

export default {
  components: {
    //
  },

  data () {
    return {
      tab: null,
      tabItems: ['Create ACD', 'ACD', 'Klinik Kesihatan & IK'],

      // ACD
      acd: '',
      acdSelection: [],
      tarikhacdMenu: '',
      lokaliti: '',
      lokalitiSelection: [],
      district: '',
      districtSelection: [],
      state: '',
      stateSelection: [
        'Perlis',
        'Kedah',
        'Pulau Pinang',
        'Perak',
        'Selangor',
        'Kuala Lumpur',
        'Negeri Sembilan',
        'Melaka',
        'Johor',
        'Kelantan',
        'Terengganu',
        'Pahang',
        'Sabah',
        'Sarawak',
        'Pulau Labuan'
      ],
      rumah: [{
        bilrumah: '',
        bilrumahk: '',
        bilrumahp: ''
      }],
      rumahHeaders: [
        { text: 'Bil Rumah Dilawat', value: 'bilrumah', align: 'start', sortable: true, class: 'success', width: '60px' },
        { text: '', value: 'id', align: 'start', sortable: false, class: 'success', width: '1px' },
        { text: 'Kosong', value: 'bilrumahk', sortable: true, class: 'success', width: '30px' },
        { text: 'Berpenghuni', value: 'bilrumahp', sortable: true, class: 'success', width: '30px' }
      ],
      lawatanRumahBaru: false,
      isRumahKosong: 'tidak',
      penghuni: [{
        bergejala: '',
        wargaemas: ''
      }],
      penghuniHeaders: [
        { text: '', value: 'id', align: 'start', sortable: false, class: 'success', width: '1px' },
        { text: 'Bergejala', value: 'bergejala', sortable: true, class: 'success', width: '30px' },
        { text: 'Warga Emas Perlu Disaring', value: 'wargaemas', sortable: true, class: 'success', width: '30px' }
      ],
      searchEP: '',
      searchEPHint: '',
      searchingEP: false,
      saringanPenghuniBaru: false,
      dobMenu: false,
      ident: '',
      name: '',
      dob: '',
      tel: '',
      address: '',
      comorbid: '',
      kategorikes: '',
      gejala: '',
      kategorikessaringan: [
        'Bergejala',
        'Warga Emas Perlu Disaring',
        'Warga Emas',
        'KRT',
        'Peniaga',
        'Lain-lain'
      ],
      jenisSampel: [
        'RT-PCR', 'RTK-Ag', 'RTK-Ab'
      ],
      sampelRes: [
        'Pending', 'Positif', 'Negatif', 'Equivocal', 'Invalid', 'Rejected'
      ],

      // KLINIK KESIHATAN & IK
      page: 1,
      pageCount: 0,
      itemsPerPage: 20,
      acdMenu: false,
      tarikhacd: '',
      // fromDateVal: null,
      stateKKIK: '',
      districtKKIK: '',
      lokalitiKKIK: '',
      districtKKIKSelection: [],
      lokalitiKKIKSelection: [],
      saringanPeoples: [],
      saringanPeopleHeaders: [
        { text: 'Nama', value: 'name', align: 'start', sortable: true, class: 'success', width: '150px' },
        { text: 'Umur', value: 'age', align: 'start', sortable: true, class: 'success', width: '50px' },
        { text: 'IC/Passport', value: 'ident', sortable: true, class: 'success', width: '50px' },
        { text: 'Tel', value: 'tel', sortable: true, class: 'success', width: '50px' },
        { text: 'Comorbid', value: 'comorbid', sortable: true, class: 'success', width: '80px' },
        { text: 'Kategori Kes', value: 'kategorikes', sortable: true, class: 'success', width: '50px' },
        { text: 'Gejala', value: 'gejala', sortable: true, class: 'success', width: '80px' },
        { text: 'Jenis Sampel', value: 'jenissampel', sortable: true, class: 'success', width: '50px' },
        { text: 'Sampel TCA', value: 'sampeltca', sortable: true, class: 'success', width: '160px' },
        { text: 'Berapa Kali Dipanggil', value: 'bildipanggil', sortable: true, class: 'success', width: '50px' },
        { text: 'Sampel Diambil', value: 'sampeldiambil', sortable: true, class: 'success', width: '50px' },
        { text: 'Gelang HSO', value: 'gelanghso', sortable: true, class: 'success', width: '50px' },
        { text: 'Annex 14', value: 'annex14', sortable: true, class: 'success', width: '50px' },
        { text: 'Keputusan Sampel', value: 'sampelres', sortable: true, class: 'success', width: '50px' },
        { text: 'Pelepasan', value: 'pelepasan', sortable: true, class: 'success', width: '50px' },
        { text: 'Address', value: 'address', sortable: true, class: 'success', width: '50px' },
        { text: 'Locality', value: 'locality', sortable: true, class: 'success', width: '50px' },
        { text: 'District', value: 'district', sortable: true, class: 'success', width: '50px' },
        { text: 'State', value: 'state', sortable: true, class: 'success', width: '50px' }
        // { text: 'Tarikh ACD', value: 'tarikhACD', sortable: true, class: 'success', width: '50px' }
      ]
    }
  },

  computed: {
    today () {
      return format(new Date(), 'yyyy-MM-dd')
    },

    currentYear () {
      return new Date().getUTCFullYear().toString()
    },

    endOfCurrentYearDate () {
      return new Date(this.currentYear + '-12-31')
    },

    tarikhacdVal () {
      return this.tarikhacd
    },

    dobVal () {
      return this.dob
    },

    age () {
      return this.getAge(this.dob)
    }
  },

  watch: {
    tab (val) {
      if (val === 1) {
        this.loadACDSelection()
      }
    }
  },

  created () {
    this.reloadRumahAndSaringan()
    this.reloadSaringanKKIK()
  },

  methods: {
    async reloadDistrict () {
      if (this.state === '' && 
        this.stateKKIK === '') {
        return
      }
      
      const payload = {
        state: this.tab===0 ? this.state : this.stateKKIK
      }
      
      try {
        let response
        if (process.env.NODE_ENV === 'production') {
          response = await this.$axios.post(
            'https://mywabak.com/acd/districts/get',
            payload
          )
        } else {
          response = await this.$axios.post(
            'http://localhost:8080/acd/districts/get',
            payload
          )
        }
        if (this.tab===0) {
          this.districtSelection = response.data.districts
        } else {
          this.districtKKIKSelection = response.data.districts
        }
      } catch (error) {
        if (error.response) {
          alert('Masalah network, sila cuba sebentar lagi')
        } else if (error.request) {
          //
        } else {
          //
        }
      }
    },

    async reloadLokaliti () {
      if ((this.state === '' ||
        this.district === '') &&
        (this.stateKKIK === '' ||
        this.districtKKIK === '')) {
        return
      }

      const payload = {
        state: this.tab===0 ? this.state : this.stateKKIK,
        district: this.tab===0 ? this.district : this.districtKKIK
      }

      try {
        let response
        if (process.env.NODE_ENV === 'production') {
          response = await this.$axios.post(
            'https://mywabak.com/acd/localities/get',
            payload
          )
        } else {
          response = await this.$axios.post(
            'http://localhost:8080/acd/localities/get',
            payload
          )
        }
        if (this.tab===0) {
          this.lokalitiSelection = response.data.localities
        } else {
          this.lokalitiKKIKSelection = response.data.localities
        }
      } catch (error) {
        if (error.response) {
          alert('Masalah network, sila cuba sebentar lagi')
        } else if (error.request) {
          //
        } else {
          //
        }
      }
    },

    async createNewACD () {
      if (this.acdName === '') {
        alert('Name ACD Baru Diperlukan')
        return
      }
      const payload = {
        name: this.acdName,
        locality: this.lokaliti,
        district: this.district,
        state: this.state,        
      }      

      try {
        if (process.env.NODE_ENV === 'production') {
          await this.$axios.post(
            'https://myvaksin.com/acd/upsert',
            payload
          )
        } else {
          await this.$axios.post(
            'http://localhost:8080/acd/upsert',
            payload
          )
        }
        this.acdName = ''
        this.state = ''
        this.district = ''
        this.locality = ''
        alert('ACD Baru Berjaya Didaftarkan')
      } catch (error) {
        if (error.response) {
        // 
          alert('Masalah network, sila cuba sebentar lagi')
        } else if (error.request) {
        // 
        } else {
        // 
        }
      }
    },

    async loadACDSelection () {      
      const payload = {
        ident: this.searchEP
      }

      try {
        let response
        if (process.env.NODE_ENV === 'production') {
          response = await this.$axios.post(
            'https://mywabak.com/acd/get',
            payload
          )
        } else {
          response = await this.$axios.post(
            'http://localhost:8080/acd/get',
            payload
          )
        }
        if (response.data.acds.length === 0) {
          this.acdSelection.length = 0
          return
        }
        this.acdSelection = [...response.data.acds]        
      } catch (error) {
        if (error.response) {
          alert('Masalah network, sila cuba sebentar lagi')
        } else if (error.request) {
          //
        } else {
          //
        }
      }
    },

    reloadRumahAndSaringan () {
      this.reloadRumah()
      this.reloadSaringan()
    },

    async reloadRumah () {
      if (this.acd === '') {
        return
      }
      const payload = {
        acdName: this.acd,
        tarikhACD: this.today,
        locality: this.lokaliti,
        district: this.district,
        state: this.state
      }

      try {
        let response
        if (process.env.NODE_ENV === 'production') {
          response = await this.$axios.post(
            'https://myvaksin.com/acd/rumah/get',
            payload
          )
        } else {
          response = await this.$axios.post(
            'http://localhost:8080/acd/rumah/get',
            payload
          )
        }
        if (response.data.state === 'NOTFOUND') {
          this.rumah[0].bilrumahk = '0'
          this.rumah[0].bilrumahp = '0'
          this.rumah[0].bilrumah = '0'
          return
        }
        this.rumah[0].bilrumahk = response.data.bilrumahk
        this.rumah[0].bilrumahp = response.data.bilrumahp
        this.rumah[0].bilrumah = response.data.bilrumahk + response.data.bilrumahp
      } catch (error) {
        if (error.response) {
        // 
          alert('Masalah network, sila cuba sebentar lagi')
        } else if (error.request) {
        // 
        } else {
        // 
        }
      }
    },

    async reloadSaringan () {
      if (this.acd === '') {
        return
      }
      const payload = {
        tarikhACD: this.today,
        acdName: this.acd
      }

      try {
        let response
        if (process.env.NODE_ENV === 'production') {
          response = await this.$axios.post(
            'https://myvaksin.com/acd/saringan/get/kategorikes',
            payload
          )
        } else {
          response = await this.$axios.post(
            'http://localhost:8080/acd/saringan/get/kategorikes',
            payload
          )
        }
        this.penghuni[0].bergejala = response.data.bilBergejala
        this.penghuni[0].wargaemas = response.data.bilWargaemas
      } catch (error) {
        if (error.response) {
        // 
          alert('Masalah network, sila cuba sebentar lagi')
        } else if (error.request) {
        // 
        } else {
        // 
        }
      }
    },            

    lawatanBaru () {
      this.lawatanRumahBaru = true
    },

    async tambahRumah () {
      if (this.acd === '') {
        alert('Sila Pilih ACD')
        return
      }
      const payload = {
        acdName: this.acd,
        tarikhACD: this.today,
        locality: this.lokaliti,
        district: this.district,
        state: this.state,
        bilrumahk: this.isRumahKosong === 'ya' ? 1 : 0,
        bilrumahp: this.isRumahKosong === 'tidak' ? 1 : 0
      }

      try {
        if (process.env.NODE_ENV === 'production') {
          await this.$axios.post(
            'https://myvaksin.com/acd/rumah/upsert',
            payload
          )
        } else {
          await this.$axios.post(
            'http://localhost:8080/acd/rumah/upsert',
            payload
          )
        }
        this.lawatanRumahBaru = false
        this.reloadRumah()
        alert('Bil Rumah Updated')
      } catch (error) {
        if (error.response) {        
          alert('Masalah network, sila cuba sebentar lagi')
        } else if (error.request) {
        // 
        } else {
        // 
        }
      }
    },    

    async doSearchEP () {
      if (this.searchEP === '') {
        return
      }
      const payload = {
        ident: this.searchEP
      }

      try {
        let response
        if (process.env.NODE_ENV === 'production') {
          response = await this.$axios.post(
            'https://mywabak.com/acd/saringan/people/get',
            payload
          )
        } else {
          response = await this.$axios.post(
            'http://localhost:8080/acd/saringan/people/get',
            payload
          )
        }
        if (response.data.ident === 'NOTFOUND') {
          this.ident = ''
          this.name = ''
          this.dob = ''
          this.tel = ''
          this.address = ''
          this.comorbid = ''
          this.saringanPenghuniBaru = false
          this.searchEPHint = 'ID ini tidak dijumpai dalam sistem'
          return
        }
        this.ident = response.data.ident
        this.name = response.data.name
        this.dob = response.data.dob
        this.tel = response.data.tel
        this.address = response.data.address
        this.comorbid = response.data.comorbid
        this.saringanPenghuniBaru = true
      } catch (error) {
        if (error.response) {
          alert('Masalah network, sila cuba sebentar lagi')
        } else if (error.request) {
          //
        } else {
          //
        }
      }
    },

    clearSearchHistory () {
      this.searchEP = ''
      this.searchEPHint = ''
    },        

    async tambahSaringan () {
      if (this.acd === '') {
        alert('Sila Pilih ACd')
        return
      }
      const payload = {
        ACDName: this.acd,
        tarikhACD: this.today,
        locality: this.lokaliti,
        district: this.district,
        state: this.state,
        name: this.name,
        ident: this.ident,
        dob: this.dob,
        tel: this.tel,
        address: this.address,
        kategorikes: this.kategorikes,
        gejala: this.gejala,
        comorbid: this.comorbid
      }      

      try {
        if (process.env.NODE_ENV === 'production') {
          await this.$axios.post(
            'https://myvaksin.com/acd/saringan/add',
            payload
          )
        } else {
          await this.$axios.post(
            'http://localhost:8080/acd/saringan/add',
            payload
          )
        }
        this.saringanPenghuniBaru = false
        this.reloadSaringan()
        this.clearSaringanData()
        alert('Saringan Baru Berjaya Didaftarkan')
      } catch (error) {
        if (error.response) {
        // 
          alert('Masalah network, sila cuba sebentar lagi')
        } else if (error.request) {
        // 
        } else {
        // 
        }
      }
    },

    clearSaringanData () {
      this.name = ''
      this.ident = ''
      this.tel = ''
      this.address = ''
      this.kategorikes = ''
    },

    getAge (dob) {
      if (dob === '') { return '' }

      let diffMs = Date.now() - new Date(dob)
      // Day
      const diff = diffMs / 1000
      const diffDay = diff / (60 * 60 * 24)
      const ageDay = Math.abs(Math.round(diffDay))
      if (ageDay === 1) {
        return ageDay.toString() + ' day old'
      }
      if (ageDay <= 30) {
        return ageDay.toString() + ' days old'
      }
      // Month
      const diffMonth = diffDay / (7 * 4)
      const ageMonth = Math.abs(Math.round(diffMonth))
      if (ageMonth === 1) {
        return ageMonth.toString() + ' month old'
      }
      if (ageMonth <= 12) {
        return ageMonth.toString() + ' months old'
      }
      // Year
      diffMs = this.endOfCurrentYearDate - new Date(dob)
      const ageDt = new Date(diffMs)
      const ageYear = Math.abs(ageDt.getUTCFullYear() - 1970)
      if (ageYear === 1) {
        return ageYear.toString() + ' year old'
      }
      return ageYear.toString() + ' years old'
    },

    async reloadSaringanKKIK () {
      if (this.lokalitiKKIK === '') {
        return
      }
      const payload = {
        acdName: this.acd,
        tarikhACD: this.tarikhacd,
        // locality: this.lokalitiKKIK,
        // district: this.district,
        // state: this.state
      }

      try {
        let response
        if (process.env.NODE_ENV === 'production') {
          response = await this.$axios.post(
            'https://myvaksin.com/acd/saringan/peoples/get',
            payload
          )
        } else {
          response = await this.$axios.post(
            'http://localhost:8080/acd/saringan/peoples/get',
            payload
          )
        }

        for (let i = 0; i < response.data.peoples.length; i++) {
          const saringanPeople = {
            ident: response.data.peoples[i].ident,
            name: response.data.peoples[i].name,
            tel: response.data.peoples[i].tel,
            address: response.data.peoples[i].address,
            // locality: this.lokalitiKKIK,
            // district: this.district,
            // state: this.state,
            // tarikhACD: this.tarikhacd,
            comorbid: response.data.peoples[i].comorbid,
            kategorikes: response.data.peoples[i].kategorikes,
            gejala: response.data.peoples[i].gejala,
            // jenissampel: response.data.peoples[i].jenissampel,
            // bildipanggil: parseInt(response.data.peoples[i].bildipanggil),
            // sampeldiambil: response.data.peoples[i].sampeldiambil,
            // gelanghso: response.data.peoples[i].gelanghso,
            // annex14: response.data.peoples[i].annex14,
            // sampelres: response.data.peoples[i].sampelres,
            // pelepasan: response.data.peoples[i].pelepasan
          }
          saringanPeople.age = this.getAge(response.data.peoples[i].dob)
          // if (response.data.peoples[i].sampeltca) {
          //   saringanPeople.sampeltca = new Date(response.data.peoples[i].sampeltca)
          // } else {
          //   saringanPeople.sampeltca = null
          // }
          this.saringanPeoples.push(saringanPeople)
        }
      } catch (error) {
        if (error.response) {
          alert('Masalah network, sila cuba sebentar lagi')
        } else if (error.request) {
          //
        } else {
          //
        }
      }
    },

    async saveSaringanItemPeople (ident, col, val) {
      const payload = {
        ident,
        col,
        val
      }
      try {
        if (process.env.NODE_ENV === 'production') {
          await this.$axios.post(
            'https://myvaksin.com/acd/saringan/people/updateoc',
            payload
          )
        } else {
          await this.$axios.post(
            'http://localhost:8080/acd/saringan/people/updateoc',
            payload
          )
        }
        alert('Maklumat dikemaskinikan')
      } catch (error) {
        if (error.response) {
          alert('Masalah network, sila cuba sebentar lagi')
        } else if (error.request) {
          //
        } else {
          //
        }
      }
    },

    async saveSaringanItemACDActivity (tarikhACD, ident, col, val) {
      const payload = {
        tarikhACD,
        ident,
        col,
        val
      }
      try {
        if (process.env.NODE_ENV === 'production') {
          await this.$axios.post(
            'https://myvaksin.com/acd/saringan/acdactivity/updateoc',
            payload
          )
        } else {
          await this.$axios.post(
            'http://localhost:8080/acd/saringan/acdactivity/updateoc',
            payload
          )
        }
        alert('Maklumat dikemaskinikan')
      } catch (error) {
        if (error.response) {
          alert('Masalah network, sila cuba sebentar lagi')
        } else if (error.request) {
          //
        } else {
          //
        }
      }
    },

    async saveSaringanItemSampel (ident, col, val) {
      const payload = {
        ident,
        col
      }
      if (col === 'sampeltca') {
        payload.val = format(new Date(val), 'yyyy-MM-dd HH:mm:ss')
      } else {
        payload.val = val
      }

      try {
        if (process.env.NODE_ENV === 'production') {
          await this.$axios.post(
            'https://myvaksin.com/acd/saringan/sampel/updateoc',
            payload
          )
        } else {
          await this.$axios.post(
            'http://localhost:8080/acd/saringan/sampel/updateoc',
            payload
          )
        }
        alert('Maklumat dikemaskinikan')
      } catch (error) {
        if (error.response) {
          alert('Masalah network, sila cuba sebentar lagi')
        } else if (error.request) {
          //
        } else {
          //
        }
      }
    }

  }
}
</script>
