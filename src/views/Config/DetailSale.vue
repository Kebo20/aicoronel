<template>
  <div>
    <CCard>
      <CRow>
        <CCol lg="12">
          <CCardHeader>
            <CRow>
              <CCol lg="11" sm="8" class="col-8">
                <slot name="header">
                  <span class="fa fa-file"></span>
                  Detalle de venta</slot
                >
              </CCol>
              <CCol lg="1" sm="2" class="col-4">
                <div class="row">
                  <button class="btn btn-danger" @click='print'>
                    
                    <span class="fa fa-file-pdf"> </span>
                  </button>
                  <button class="btn btn-primary" @click='excel'>
                    
                    <span class="fa fa-file-excel"> </span>
                  </button>
                </div>
              </CCol>
            </CRow>
          </CCardHeader>

          <CCardBody>
            <div class="row">
              <div class="form-group col-sm-12 col-md-6 col-lg-4">
                <label class="form-control-label" for="text-input">Fecha</label>
                <div class="">
                  <input
                    type="text"
                    v-model="sale.date"
                    class="form-control form-control-sm"
                    disabled
                  />
                </div>
              </div>
              <div class="form-group col-sm-12 col-md-6 col-lg-4">
                <label class="form-control-label" for="email-input"
                  >Cliente</label
                >
                <div class="">
                  <input
                    v-model="sale.client_name"
                    disabled
                    class="form-control form-control-sm"
                  />
                </div>
              </div>
              <div class="form-group col-sm-12 col-md-6 col-lg-4">
                <label class="form-control-label" for="email-input"
                  >Tipo de documento</label
                >
                <div class="">
                  <input
                    v-model="sale.type_doc"
                    placeholder="Seleccione"
                    class="form-control form-control-sm"
                    disabled
                  />
                </div>
              </div>
              <div class="form-group col-sm-12 col-md-6 col-lg-4">
                <label class="form-control-label" for="text-input"
                  >Número de documento</label
                >
                <div class="">
                  <input
                    type="text"
                    v-model="sale.number_doc"
                    class="form-control form-control-sm"
                    disabled
                  />
                </div>
              </div>

              <div class="form-group col-sm-12 col-md-6 col-lg-4">
                <label class="form-control-label" for="email-input"
                  >Observación</label
                >
                <div class="">
                  <input
                    type="text"
                    v-model="sale.observation"
                    class="form-control form-control-sm"
                    disabled
                  />
                </div>
              </div>
              <div class="form-group col-sm-12 col-md-6 col-lg-4">
                <label class="form-control-label" for="email-input"
                  >Tienda</label
                >
                <div class="">
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    v-model="sale.storage_name"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div>
              <hr />
            </div>

            <div class="table-responsive">
              <table class="table table-bordered table-sm">
                <thead
                  class="text-center text-white"
                  style="background-color: #3192a5"
                >
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="d in sale.detail" :key="d">
                    <td align="left" v-text="d.product_name"></td>

                    <td align="right" v-text="d.price"></td>
                    <td align="right" v-text="d.quantity"></td>
                    <td
                      align="right"
                      v-text="d.subtotal"
                      class="text-right"
                    ></td>
                  </tr>
                </tbody>
                <tbody
                  class="text-right text-white font-weight-bold"
                  style="background-color: #3192a5"
                >
                  <tr>
                    <td colspan="3">Subtotal</td>
                    <td v-text="'S/.' + sale.subtotal"></td>
                  </tr>
                  <tr>
                    <td colspan="3">Igv</td>
                    <td v-text="'S/.' + sale.igv" class=""></td>
                  </tr>
                  <tr>
                    <td colspan="3">Total</td>
                    <td v-text="'S/.' + sale.total" class=""></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="modal-footer">
              <router-link :to="{ path: `/sale` }">
                <button class="btn btn-secondary">
                  Regresar <span class="fa fa-arrow-circle-left"></span>
                </button>
              </router-link>
            </div>
          </CCardBody>
        </CCol>
      </CRow>
    </CCard>
  </div>
</template>

<script>
import axios from "../../Config/axios";
import "@fortawesome/fontawesome-free/js/all.js";
import swal from "sweetalert";

import CTableWrapper from "./Table.vue";

import { ModelListSelect } from "vue-search-select";
import "vue-search-select/dist/VueSearchSelect.css";

export default {
  name: "addProvider",
  components: { CTableWrapper },
  data() {
    return {
      sale: {},

      id: this.$route.params.id,
    };
  },

  components: {
    ModelListSelect,
  },

  mounted() {
    this.getSale();
  },
  methods: {
    getSale() {
      let me = this;
      axios
        .get("/auth/sales/" + me.id)
        .then(function (response) {
          me.sale = response.data.data;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    print() {
        
      let me = this;
      axios
        .get("/auth/sales/print/" + me.id)
        .then(function (response) {
          console.log(response);
          let url = response.data.data;
         window.open(url)
          
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    excel() {
        
      let me = this;
      axios
        .get("/auth/sales/export/" + me.id)
        .then(function (response) {
          console.log(response);
          let url = response.data.data;
         window.open(url)
          
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
};
</script>
<style scoped>
.modal-content {
  width: 100% !important;
  position: absolute !important;
  top: 30px !important;
}
.mostrar {
  display: list-item !important;
  opacity: 1 !important;
  position: absolute !important;
  background-color: #685f5f7a !important;
}
.mostrarDesactivar {
  display: list-item !important;
  opacity: 1 !important;
  position: absolute !important;
  background-color: #3c29297a !important;
}
.div-error {
  display: flex;
  justify-content: center;
}
.text-error {
  color: red;
  font-weight: bold;
}
</style>