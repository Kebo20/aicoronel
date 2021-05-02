<template>
  <div>
    <CCard>
      <CRow>
        <CCol lg="12">
          <CCardHeader>
            <CRow>
              <CCol lg="10" sm="6">
                <slot name="header">
                  <img src="@/assets/images/producto.svg" width="30px" />
                  Productos en tienda</slot
                >
                <br /><br />
              </CCol>

              <CCol lg="6" sm="6">
                <model-list-select
                  :list="arrayProducts"
                  v-model="product"
                  option-value="id_product"
                  option-text="name_brand"
                  placeholder="Seleccione"
                  class="form-control form-control-sm"
                  @input="purchases"
                >
                </model-list-select>
              </CCol>
            </CRow>
          </CCardHeader>

          <CCardBody>
           
            <div class="table-responsive">
              <table class="table table-bordered table-sm">
                <thead
                  class="text-center text-white"
                  style="background-color: #3192a5"
                >
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Fecha</th>
                    <th>Factura/Boleta</th>
                  </tr>
                </thead>
                <tbody v-if="arrayPurchases.length > 0">
                  <tr v-for="d in arrayPurchases" :key="d.id_product">
                    <td v-text="d.product_name"></td>
                    <td align="right" v-text="'S/. '+d.price"></td>
                    <td align="right" v-text="d.date"></td>
                    <td align="right" v-text="d.number_doc"></td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <td align="center" colspan="4"><b>No se encontraron compras para este producto</b></td>
                  </tr>
                </tbody>
              </table>
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

import { ModelListSelect } from "vue-search-select";
import "vue-search-select/dist/VueSearchSelect.css";
import swal from 'sweetalert';

export default {
  name: "Storage",
  components: {},
  data() {
    return {
      arrayProducts: [],
      arrayPurchases: [],

      product: { id_product: "", name: "" },
      category: { id_category: "", name: "" },
      arrayCategories: [],
      id_storage: "1",
      modalRegistrar: false,
      modal: 0,
      accion: 1,
      id: "",
      search: "",
      arrayErrors: [],
      rol: this.$store.state.rol,
    };
  },

  components: {
    ModelListSelect,
  },
  mounted() {
    this.products();
    swal('Selecione un producto','','info')
  },
  methods: {
    products() {
      let me = this;
      axios
        .get("/auth/products")
        .then(function (response) {
          me.arrayProducts = response.data.data;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    purchases() {
      let me = this;
      axios
        .post("/auth/purchases/searchPurchaseByProduct", {
          id_product: me.product.id_product,
        })
        .then(function (response) {
          me.arrayPurchases = response.data.data;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    validator(val) {
      return val ? val.length > 0 : false;
    },
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