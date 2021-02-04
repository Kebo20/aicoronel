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
                    v-model="purchase.date"
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
                  >Tipo de documento</label
                >
                <div class="">
                  <select
                    v-model="purchase.type_doc"
                    placeholder="Seleccione"
                    class="select-search form-control form-control-sm"
                  >
                    <option selected="true" value="BOLETA">Boleta</option>
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
                    v-model="purchase.number_doc"
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
                    v-model="purchase.observation"
                    class="form-control form-control-sm"
                    placeholder="Observación a la compra"
                  />
                </div>
              </div>
              <div class="form-group col-sm-12 col-md-6 col-lg-4">
                <label class="form-control-label" for="email-input"
                  >Tienda</label
                >
                <div class="" v-if="rol == '1'">
                  <select
                    v-model="purchase.id_storage"
                    placeholder="Seleccione"
                    class="select-search form-control form-control-sm"
                  >
                    <option selected="true" value="1">Bagua</option>
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
                    value="Bagua Chica"
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
                    v-model="detail.price"
                    class="form-control form-control-sm"
                    min="0"
                  />
                </div>
              </div>
              <div class="form-group col-sm-12 col-md-6 col-lg-2">
                <label class="form-control-label" for="email-input"
                  >Cantidad</label
                >
                <div class="">
                  <input
                    type="number"
                    v-model="detail.quantity"
                    class="form-control form-control-sm"
                    min="0"
                  />
                </div>
              </div>
              <div class="form-group col-sm-12 col-md-6 col-lg-2">
                <br />
                <button @click="addDetail" class="btn btn-primary">
                  <span class="fa fa-plus-circle"> </span>
                </button>
              </div>
            </div>
            <hr />
            <div class="table-responsive">
              <table class="table table-bordered table-sm">
                <thead
                  class="text-center text-white"
                  style="background-color: #3192a5"
                >
                  <tr>
                    <th></th>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="d in arrayDetail" :key="d.id_product">
                    <td>
                      <button
                        class="btn btn-sm"
                        @click="deleteDetail(d.id_product)"
                      >
                        <span class="fa fa-trash"></span>
                      </button>
                    </td>
                    <td v-text="d.name"></td>

                    <td>
                      <input
                        v-model="d.price"
                        type="number"
                        min="0"
                        class="form-control form-control-sm text-right"
                      />
                    </td>
                    <td>
                      <input
                        v-model="d.quantity"
                        type="number"
                        class="form-control form-control-sm text-right"
                      />
                    </td>
                    <td
                      v-text="(d.quantity * d.price).toFixed(2)"
                      class="text-right"
                    ></td>
                  </tr>
                </tbody>
                <tbody
                  v-for="dato in total"
                  :key="dato"
                  class="text-right text-white font-weight-bold"
                  style="background-color: #3192a5"
                >
                  <tr>
                    <td colspan="4">Subtotal</td>
                    <td v-text="dato.subtotal"></td>
                  </tr>
                  <tr>
                    <td colspan="4">Igv</td>
                    <td v-text="dato.igv" class=""></td>
                  </tr>
                  <tr>
                    <td colspan="4">Total</td>
                    <td v-text="dato.total" class=""></td>
                  </tr>
                </tbody>
              </table>
            </div>

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


import { ModelListSelect } from "vue-search-select";
import "vue-search-select/dist/VueSearchSelect.css";

export default {
  name: "addProvider",
  components: {  },
  data() {
    return {
      arrayProducts: [],

      provider: { id_provider: "", name: "" },
      product: { id_product: "", name: "" },

      arrayProviders: [],
      purchase: { date: "", type_doc: "FACTURA", number_doc: "", observation: "",id_storage:'1' },
      detail: {
        quantity: "0",
        price: "0",
      },
      arrayDetail: [],
      modalRegistrar: false,
      modal: 0,
      accion: 1,
      id: "",
rol:this.$store.state.rol    };
  },

  components: {
    ModelListSelect,
  },
  computed: {
    total: function () {
      let me = this;
      var neto = 0;
      for (var i = 0; i < me.arrayDetail.length; i++) {
        var subtotal =
          parseFloat(me.arrayDetail[i].price) *
          parseInt(me.arrayDetail[i].quantity);
        neto = neto + subtotal;
      }
      var impuesto = (neto * 0.18) / (1 + 0.18);
      var parcial = parseFloat(neto) - impuesto;
      var total = [
        {
          subtotal: "S/. " + parcial.toFixed(2),
          igv: "S/. " + impuesto.toFixed(2),
          total: "S/. " + neto.toFixed(2),
        },
      ];

      return total;
    },
  },
  mounted() {
    this.products();
    this.providers();

  },
  methods: {
    addDetail() {
      let me = this;

      if (
        me.detail.quantity < 1 ||
        me.detail.price < 0.1 ||
        me.product.id_product == ""
      ) {
        swal({
          type: "Mensaje",
          icon: "warning",
          title: "Mensaje",
          text: "Ingrese datos válidos",
        });
        return false;
      }
      for (var i = 0; i < me.arrayDetail.length; i++) {
        if (me.arrayDetail[i].id_product == me.product.id_product) {
          swal({
            type: "Mensaje",
            icon: "warning",
            title: "Mensaje",
            text: "¡Este producto ya se encuentra agregado a la lista!",
          });
          return false;
        }
      }

      me.arrayDetail.push({
        id_product: me.product.id_product,
        name: me.product.name,
        quantity: me.detail.quantity,
        price: me.detail.price,
      });
      me.detail.quantity = 0;
      me.detail.price = 0;
      me.product = {};
    },
    deleteDetail(id) {
      let me = this;
      me.arrayDetail = me.arrayDetail.filter((item) => item.id_product !== id);
    },
    clean() {
      let me = this;
      me.product = { id_product: "", name: "" };
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

      if (me.purchase.number_doc == "") {
        swal("Datos incompletos", "Ingrese un número de documento", "warning");
        count = 1;
      }
      if (me.purchase.type_doc == "") {
        swal("Datos incompletos", "Ingrese un tipo de documento", "warning");
        count = 1;
      }
      if (me.provider.id_provider == "") {
        swal("Datos incompletos", "Seleccione una proveedor", "warning");
        count = 1;
      }

       if (me.provider.id_storage == ""&& rol=='1') {
        swal("Datos incompletos", "Seleccione una tienda", "warning");
        count = 1;
      }

      if (me.arrayDetail.length == 0) {
        swal("Datos incompletos", "Ingrese productos a la lista", "warning");
        count = 1;
      }

      return count;
    },

    save() {
      let me = this;
      if (this.validate() > 0) {
        return false;
      }

      axios
        .post("/auth/purchases", {
          date: me.purchase.date,
          type_doc: me.purchase.type_doc,
          number_doc: me.purchase.number_doc,
          id_provider: me.provider.id_provider,
          observation: me.purchase.observation,
          id_storage: me.purchase.id_storage,
          details: me.arrayDetail,
        })
        .then(function (response) {
          if (response) {
            swal("Correcto", response.data.message, "success");
            me.clear()
          } else {
            swal("Error ", response.message, "error");
          }
        })
        .catch(function (error) {
          console.log(error.response);
          swal("Error ", error.response.data.message, "error");
        });
      me.modal = 0;
    },


    clear() {
      
      let me = this;
      me.provider= { id_provider: "", name: "" },
      me.product= { id_product: "", name: "" },
      me.purchase= { date: "", type_doc: "FACTURA", number_doc: "", observation: "",id_storage:'1' }
      me.detail= {
        quantity: "0",
        price: "0",
      },
      me.arrayDetail= []
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