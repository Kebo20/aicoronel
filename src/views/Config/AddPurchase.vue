<template>
  <div>
    <CCard>
      <CRow>
        <CCol lg="12">
          <CCardHeader>
            <CRow>
              <CCol lg="10" sm="6">
                <slot name="header">
                  <span class="fa fa-plus-circle"></span>
                  Nueva compra</slot
                >
              </CCol>
            </CRow>
          </CCardHeader>

          <CCardBody>
            <div class="row">
              <div class="form-group col-sm-12 col-md-6 col-lg-4">
                <label class="form-control-label" for="text-input">Fecha</label>
                <div class="">
                  <input
                    type="date"
                    v-model="product.name"
                    class="form-control form-control-sm"
                    placeholder="Nombre de producto"
                  />
                </div>
              </div>
              <div class="form-group col-sm-12 col-md-6 col-lg-4">
                <label class="form-control-label" for="email-input"
                  >Proveedor</label
                >
                <div class="">
                  <model-list-select
                    :list="arrayProviders"
                    v-model="provider"
                    option-value="id_provider"
                    option-text="name"
                    placeholder="Seleccione"
                    class="form-control form-control-sm"
                  >
                  </model-list-select>
                </div>
              </div>
              <div class="form-group col-sm-12 col-md-6 col-lg-4">
                <label class="form-control-label" for="email-input"
                  >Tipo de documneto</label
                >
                <div class="">
                  <select
                    v-model="provider.type_doc"
                    placeholder="Seleccione"
                    class="select-search form-control form-control-sm"
                  >
                    <option selected="true" value="BOLTEA">Boleta</option>
                    <option value="FACTURA">Factura</option>
                    <option value="OTROS">Otros</option>
                  </select>
                </div>
              </div>
              <div class="form-group col-sm-12 col-md-6 col-lg-4">
                <label class="form-control-label" for="text-input"
                  >Número de documento</label
                >
                <div class="">
                  <input
                    type="text"
                    v-model="provider.number_doc"
                    class="form-control form-control-sm"
                    placeholder="Número de documento "
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
                    v-model="product.brands"
                    class="form-control form-control-sm"
                    placeholder="Observación a la compra"
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
                    value="Bagua"
                    readonly
                  />
                </div>
              </div>
            </div>
            <div>
              <hr />
            </div>
            <div class="row">
              <div class="form-group col-sm-12 col-md-6 col-lg-6">
                <label class="form-control-label" for="email-input"
                  >Producto</label
                >
                <div class="">
                  <model-list-select
                    :list="arrayProducts"
                    v-model="product"
                    option-value="id_product"
                    option-text="name"
                    placeholder="Seleccione"
                    class="form-control form-control-sm"
                  >
                  </model-list-select>
                </div>
              </div>
              <div class="form-group col-sm-12 col-md-6 col-lg-2">
                <label class="form-control-label" for="email-input"
                  >Precio</label
                >
                <div class="">
                  <input
                    type="number"
                    v-model="product.price"
                    class="form-control form-control-sm"
                    readonly
                    
                  />
                </div>
              </div>
              <div class="form-group col-sm-12 col-md-6 col-lg-2">
                <label class="form-control-label" for="email-input"
                  >Cantidad</label
                >
                <div class="">
                  <input
                    type="text"
                    v-model="product.quantity"
                    class="form-control form-control-sm"
                  />
                </div>
              </div>
              <div class="form-group col-sm-12 col-md-6 col-lg-2">
                <br>
                <button class="btn btn-primary">
                  <span class="fa fa-plus-circle"> </span>
                </button>
              </div>
            </div>
            <hr />
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtototal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input type="text" class="form-control form-control-sm" />
                  </td>
                  <td>
                    <input type="text" class="form-control form-control-sm" />
                  </td>
                  <td>
                    <input type="number" min="0" class="form-control form-control-sm" />
                  </td>
                  <td>
                    <input
                      type="text"
                      readonly
                      class="form-control form-control-sm"
                    />
                  </td>
                  <td><span class="fa fa-trash"></span></td>
                </tr>
                <tr>
                  <td>
                    <input type="text" class="form-control form-control-sm" />
                  </td>
                  <td>
                    <input type="text" class="form-control form-control-sm" />
                  </td>
                  <td>
                    <input type="number" class="form-control form-control-sm" />
                  </td>
                  <td>
                    <input
                      type="text"
                      readonly
                      class="form-control form-control-sm"
                    />
                  </td>
                  <td><span class="fa fa-trash"></span></td>
                </tr>
                <tr>
                  <td>
                    <input type="text" class="form-control form-control-sm" />
                  </td>
                  <td>
                    <input type="text" class="form-control form-control-sm" />
                  </td>
                  <td>
                    <input type="number" class="form-control form-control-sm" />
                  </td>
                  <td>
                    <input
                      type="text"
                      readonly
                      class="form-control form-control-sm"
                    />
                  </td>
                  <td><span class="fa fa-trash"></span></td>
                </tr>
                <tr>
                  <td>
                    <input type="text" class="form-control form-control-sm" />
                  </td>
                  <td>
                    <input type="text" class="form-control form-control-sm" />
                  </td>
                  <td>
                    <input type="number" class="form-control form-control-sm" />
                  </td>
                  <td>
                    <input
                      type="text"
                      readonly
                      class="form-control form-control-sm"
                    />
                  </td>
                  <td><span class="fa fa-trash"></span></td>
                </tr>
                <tr>
                  <td>
                    <input type="text" class="form-control form-control-sm" />
                  </td>
                  <td>
                    <input type="text" class="form-control form-control-sm" />
                  </td>
                  <td>
                    <input type="number" class="form-control form-control-sm" />
                  </td>
                  <td>
                    <input
                      type="text"
                      readonly
                      class="form-control form-control-sm"
                    />
                  </td>
                  <td><span class="fa fa-trash"></span></td>
                </tr>
                <tr>
                  <td>
                    <input type="text" class="form-control form-control-sm" />
                  </td>
                  <td>
                    <input type="text" class="form-control form-control-sm" />
                  </td>
                  <td>
                    <input type="number" class="form-control form-control-sm" />
                  </td>
                  <td>
                    <input
                      type="text"
                      readonly
                      class="form-control form-control-sm"
                    />
                  </td>
                  <td><span class="fa fa-trash"></span></td>
                </tr>
              </tbody>
            </table>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="modal = 0"
              >
                Cerrar
              </button>
              <button
                type="button"
                class="btn btn-primary"
                v-if="accion == 1"
                @click="save()"
              >
                Guardar
              </button>
              <button
                type="button"
                class="btn btn-primary"
                v-if="accion == 2"
                @click="save()"
              >
                Actualizar
              </button>
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
  name: "Tables",
  components: { CTableWrapper },
  data() {
    return {
      arrayProducts: [],
      product: {
        name: "",
        brand: "",
        price: "",
        units: "",
        id_provider: "",
      },
      provider: { id_provider: "", name: "" },
      product: { id_product: "", name: "" },

      arrayProviders: [],

      modalRegistrar: false,
      modal: 0,
      accion: 1,
      id: "",
      search: "",
      arrayErrors: [],
    };
  },

  components: {
    ModelListSelect,
  },
  mounted() {
    this.products();
    this.providers();
    this.products();
  },
  methods: {
    clean() {
      let me = this;
      me.product = {
        name: "",
        brand: "",
        price: "",
        units: "",
        id_provider: "",
      };
    },

    edit(id) {
      this.clean();
      this.getProduct(id);
      let me = this;
      me.id = id;
      me.accion = 2;
      me.modal = 1;
    },
    delet(id) {
      swal({
        title: "Eliminar",
        text: "¿Seguro de eliminar este registro?",
        span: "warning",
        dangerMode: true,
        buttons: true,
      }).then((willDelete) => {
        if (willDelete) {
          let me = this;
          me.id = id;
          axios
            .delete("/auth/products/" + me.id)
            .then(function (response) {
              me.products();
              swal("Correcto", response.data.message, "success");
            })
            .catch(function (error) {
              swal("Error ", error.message, "error");
            });
        }
      });
    },

    closeModal(status, evt, accept) {
      if (accept) {
        alert("ok");
      }
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
    providers() {
      let me = this;
      axios
        .get("/auth/providers")
        .then(function (response) {
          me.arrayProviders = response.data.data;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    getProduct(id) {
      let me = this;
      axios
        .get("/auth/products/" + id)
        .then(function (response) {
          me.product = response.data.data;

          me.provider = { id_provider: me.product.id_provider };
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    validate() {
      let me = this;
      let count = 0;

      if (me.product.name == "") {
        swal("Datos incompletos", "Ingrese un nombre", "warning");
        count = 1;
      }
      if (me.product.price == "") {
        swal("Datos incompletos", "Ingrese el precio del producto", "warning");
        count = 1;
      }
      if (me.provider.id_provider == "") {
        swal("Datos incompletos", "Seleccione una categoría", "warning");
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
          .post("/auth/products", {
            name: me.product.name,
            brand: me.product.brand,
            price: me.product.price,
            id_provider: me.provider.id_provider,
            units: me.product.units,
          })
          .then(function (response) {
            me.products();
            swal("Correcto", response.data.message, "success");
          })
          .catch(function (error) {
            console.log(error);
            swal("Error ", error, message, "error");
          });
        me.modal = 0;
      } else {
        axios
          .put("/auth/products/" + me.id, {
            name: me.product.name,
            brand: me.product.brand,
            price: me.product.price,
            id_provider: me.provider.id_provider,
            units: me.product.units,
          })
          .then(function (response) {
            me.products();
            swal("Correcto", response.data.message, "success");
          })
          .catch(function (error) {
            swal("Error ", error.message, "error");
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