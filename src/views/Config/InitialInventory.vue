<template>
  <div>
    <CCard>
      <CRow>
        <CCol lg="12">
          <CCardHeader>
            <CRow>
              <CCol lg="9" sm="3">
                <slot name="header">
                  <img src="@/assets/images/producto.svg" width="30px" />
                  Inventario inicial</slot
                >
                <br />
                <br />
              </CCol>
              <CCol v-if="rol == '1'" lg="2" sm="12" style="margin: 5px">
                <div class="" v-if="rol == '1'">
                  <select
                    v-model="search_id_storage"
                    @change="getInitialInventory"
                    class="select-search form-control form-control-sm"
                  >
                    <option value="1">Bagua</option>
                    <option value="2">Bagua Grande</option>
                  </select>
                </div>
              </CCol>
            </CRow>

            <CRow>
              <CCol v-if="rol == '1'" lg="6" sm="12">
                <CButton
                  color="primary"
                  @click="
                    modal = 1;
                    accion = 1;
                    clean();
                  "
                  class="mr-1"
                >
                  <span class="fa fa-plus-circle"></span> Ingresar
                </CButton>
                <CButton
                  color="primary"
                  @click="
                    modal = 1;
                    accion = 2;
                    clean();
                  "
                  class=""
                >
                  <span class="fa fa-minus-circle"></span> Retirar
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>

          <CCardBody>
            <CDataTable
              :items-per-page="20"
              :dark="false"
              :items="arrayMovesProducts"
              :hover="true"
              :fixed="true"
              :border="true"
              :column-filter="true"
              size="small"
              caption=""
              :fields="
                rol == '1'
                  ? [
                      {
                        key: 'date',
                        label: 'Fecha del movimiento',
                        _style: { width: '1%' },
                        sorter: false,
                        filter: true,
                      },
                      {
                        key: 'type',
                        label: 'Tipo',
                        _style: { width: '1%' },
                        sorter: false,
                        filter: true,
                      },
                      {
                        key: 'product_name',
                        label: 'Nombre',
                        _style: { width: '1%' },
                        sorter: false,
                        filter: true,
                      },
                      {
                        key: 'category_name',
                        label: 'Categoría',
                        _style: { width: '1%' },
                        sorter: false,
                        filter: true,
                      },
                       {
                        key: 'quantity',
                        label: 'Cantidad',
                        _style: { width: '1%' },
                        sorter: false,
                        filter: true,
                      },

                      {
                        key: 'storage_name',
                        label: 'Almacén',
                        _style: { width: '1%' },
                        sorter: false,
                        filter: true,
                      },
                    ]
                  : []
              "
              pagination
            >
              <template #type="{ item }">
                <td align="center">
                  <CBadge style="padding:5px " v-if="item.type == 'entrada'" color="success"
                    >INGRESO</CBadge
                  >
                  <CBadge style="padding:5px " v-else color="danger">SALIDA</CBadge>
                </td>
              </template>
            </CDataTable>
          </CCardBody>
        </CCol>
      </CRow>
    </CCard>

    <!--Inicio del modal agregar/actualizar-->
    <div
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      style="display: none"
      aria-hidden="true"
      :class="{ mostrar: modal }"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">
              {{ accion == 1 ? "Ingresar producto" : "Retirar Producto" }}
            </h4>
            <button
              type="button"
              class="close"
              @click="modal = 0"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group row">
              <label class="col-md-3 form-control-label" for="text-input"
                >Producto</label
              >
              <div class="col-md-9">
                <model-list-select
                  :list="arrayProducts"
                  v-model="product"
                  option-value="id_product"
                  option-text="name_brand"
                  placeholder="Seleccione"
                  class="form-control form-control-sm"
                >
                </model-list-select>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-md-3 form-control-label" for="text-input"
                >Cantidad</label
              >
              <div class="col-md-9">
                <input
                  type="number"
                  v-model="quantity"
                  class="form-control"
                  placeholder=""
                  maxlength="250"
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-3 form-control-label" for="text-input"
                >Tienda</label
              >
              <div class="col-md-9">
                <select
                  v-model="id_storage"
                  placeholder="Seleccione"
                  class="select-search form-control form-control-sm"
                >
                  <option selected="true" value="1">Bagua</option>
                  <option value="2">Bagua Grande</option>
                </select>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="modal = 0">
              Cerrar
            </button>
            <button
              type="button"
              class="btn btn-primary"
              v-if="accion == 1"
              @click="save()"
            >
              Ingresar
            </button>
            <button
              type="button"
              class="btn btn-primary"
              v-if="accion == 2"
              @click="save()"
            >
              Retirar
            </button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <!--Fin del modal-->
  </div>
</template>

<script>
import axios from "../../Config/axios";
import "@fortawesome/fontawesome-free/js/all.js";
import swal from "sweetalert";

import { ModelListSelect } from "vue-search-select";
import "vue-search-select/dist/VueSearchSelect.css";

export default {
  name: "Product",
  components: {},
  data() {
    return {
      arrayProducts: [],
      arrayMovesProducts: [],

      product: { id_product: "", name: "" },
      category: {},
      arrayCategories: [],
      modalRegistrar: false,
      modal: 0,
      accion: 1,

      search: "",
      quantity: 0,
      arrayErrors: [],
      rol: this.$store.state.rol,
      idStorage: 1,
      search_id_storage: 1,
    };
  },

  components: {
    ModelListSelect,
  },
  mounted() {
    this.getInitialInventory();
    this.products();
  },
  computed() {},
  methods: {
    clean() {
      let me = this;
      me.product = {
       id_product: "", name: ""
      };
      me.quantity=''
      me.id_storage=''
    },

    edit(id) {
      this.clean();
      this.getProduct(id);
      let me = this;
    },
   

    closeModal(status, evt, accept) {
      if (accept) {
        alert("ok");
      }
    },

    getInitialInventory() {
      let me = this;
      axios
        .get("/auth/lots/moves-product-initial/" + me.search_id_storage)
        .then(function (response) {
          me.arrayMovesProducts = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
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

    validate() {
      let me = this;
      let count = 0;

      if (me.product.id_product == '') {
        swal("Datos incompletos", "Seleccione un producto", "warning");
        count = 1;
      }
      if (me.quantity <1) {
        swal("Datos incompletos", "Ingrese una cantidad", "warning");
        count = 1;
      }
      if (me.id_storage == "") {
        swal("Datos incompletos", "Seleccione una tienda", "warning");
        count = 1;
      }

      return count;
    },

    save() {
      let me = this;
      if (this.validate() > 0) {
        return false;
      }
      if (me.accion == 1) {
        axios
          .post("/auth/lots/add", {
            id_product: me.product.id_product,
            quantity: me.quantity,
            id_storage: me.id_storage,
          })
          .then(function (response) {
            me.getInitialInventory();
            if (response) {
              swal("Correcto", response.data.message, "success");
            } else {
              swal("Error ", response.message, "error");
            }
          })
          .catch(function (error) {
            console.log(error.response);
            swal("Error ", error.response.data.message, "error");
          });
        me.modal = 0;
      } else {
        axios
          .post("/auth/lots/remove", {
            id_product: me.product.id_product,
            quantity: me.quantity,
            id_storage: me.id_storage,
          })
          .then(function (response) {
            me.getInitialInventory();
            if (response) {
              swal("Correcto", response.data.message, "success");
            } else {
              swal("Error ", response.message, "error");
            }
          })
          .catch(function (error) {
            console.log(error.response);
            swal("Error ", error.response.data.message, "error");
          });

        me.modal = 0;
      }
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