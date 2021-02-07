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
              </CCol>

              <CCol  lg="2" sm="6">
                  
                  <div class="" v-if="rol == '1'">
                    <select
                      v-model="id_storage"
                      @change="products"
                      class="select-search form-control form-control-sm"
                    >
                      <option  value="1">Bagua</option>
                      <option value="2">Bagua Grande</option>
                    </select>
                  </div>
                  <div class="" v-if="rol == '2'">
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      value="Bagua"
                      readonly
                    />
                  </div>
                  <div class="" v-if="rol == '3'">
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      value="Bagua Grande"
                      readonly
                    />
                  </div>
              </CCol>
            </CRow>
          </CCardHeader>

          <CCardBody>
            <CDataTable
              :items-per-page="10"
              :dark="false"
              :items="arrayProducts"
              :hover="true"
              :fixed="true"
              :border="true"
              :column-filter="true"
              caption="Lista de productos"
              :fields="rol=='1'?[
                {
                  key: 'product_name',
                  label: 'Producto',
                  _style: { width: '20%' },
                  sorter: false,
                  filter: true,
                },
                {
                  key: 'category_name',
                  label: 'Categoría',
                  _style: { width: '20%' },
                  sorter: false,
                  filter: true,
                },
                {
                  key: 'quantity',
                  label: 'Stock Disponible',
                  _style: { width: '20%' },
                  sorter: false,
                  filter: true,
                },
                {
                  key: 'storage_name',
                  label: 'Tienda',
                  _style: { width: '20%' },
                  sorter: false,
                  filter: true,
                },
              ]:[
                {
                  key: 'product_name',
                  label: 'Producto',
                  _style: { width: '20%' },
                  sorter: false,
                  filter: true,
                },
                {
                  key: 'category_name',
                  label: 'Categoría',
                  _style: { width: '20%' },
                  sorter: false,
                  filter: true,
                },
                {
                  key: 'quantity',
                  label: 'Stock actual',
                  _style: { width: '20%' },
                  sorter: false,
                  filter: true,
                },
              
              ]"
              pagination
            >
              <template #actions="{ item }">
                <td align="center">
                  <button
                    href="#"
                    class="btn btn-sm"
                    @click="edit(item.id_product)"
                  >
                    <span class="fa fa-edit"></span>
                  </button>
                  <button
                    href="#"
                    class="btn btn-sm"
                    @click="delet(item.id_product)"
                  >
                    <span class="fa fa-trash"></span>
                  </button>
                </td>
              </template>
            </CDataTable>
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

export default {
  name: "Storage",
  components: {  },
  data() {
    return {
      arrayProducts: [],
      category: { id_category: "", name: "" },
      arrayCategories: [],
      id_storage:'1',
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
   
  },
  methods: {
    products() {
      let me = this;
      axios
        .post("/auth/lots/list",{id_storage:me.id_storage})
        .then(function (response) {
          me.arrayProducts = response.data.data;
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