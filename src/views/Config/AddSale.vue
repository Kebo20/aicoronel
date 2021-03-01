<template>
  <div>
    <CCard>
      <CRow>
        <CCol lg="12">
          <CCardHeader>
            <CRow>
              <CCol lg="10" sm="6">
                <slot name="header"> Nueva Venta</slot>
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
                    v-model="sale.date"
                    class="form-control form-control-sm"
                    placeholder="Nombre de producto"
                  />
                </div>
              </div>
              <div class="form-group col-sm-12 col-md-6 col-lg-4">
                <label class="form-control-label" for="email-input"
                  >Cliente</label
                >
                <a
                  @click="
                    modal = 1;
                    accion = 1;
                    id = 0;
                    clean();
                  "
                  class="btn btn-xs"
                >
                  <span class="fa fa-plus-circle"></span>
                </a>
                <div class="">
                  <model-list-select
                    :list="arrayClients"
                    v-model="client"
                    option-value="id_client"
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
                    v-model="sale.type_doc"
                    placeholder="Seleccione"
                    class="select-search form-control form-control-sm"
                    @change="correlativo"
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
                    v-model="sale.number_doc"
                    class="form-control form-control-sm"
                    placeholder="Número de documento "
                    readonly
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
                    v-model="sale.id_storage"
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
                    value="Bagua Grande"
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
                    option-text="name_brand"
                    placeholder="Seleccione"
                    class="form-control form-control-sm"
                  >
                  </model-list-select>
                </div>
              </div>
              <div class="form-group col-sm-12 col-md-6 col-lg-2">
                <label class="form-control-label" for="email-input"
                  >Precios </label
                >
                <div class="">
                  <select
                    v-model="price"
                    placeholder="Seleccione"
                    class="select-search form-control form-control-sm"
                  >
                    <option selected="true" :value="product.price">
                      S/. {{ product.price }}
                    </option>
                    <option v-if="product.price2 != 0" :value="product.price2">
                      S/. {{ product.price2 }}
                    </option>
                  </select>
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
                    <th>Cant.</th>
                    <th>Dscto.</th>
                    <th>Importe</th>
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
                        disabled
                      />
                    </td>
                    <td>
                      <input
                        v-model="d.quantity"
                        type="number"
                        class="form-control form-control-sm text-right"
                      />
                    </td>
                    <td>
                      <input
                        v-model="d.discount"
                        type="number"
                        class="form-control form-control-sm text-right"
                      />
                    </td>
                    <td
                      v-text="(d.quantity * d.price - d.discount).toFixed(2)"
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
                    <td colspan="5">Subtotal</td>
                    <td v-text="dato.subtotal"></td>
                  </tr>
                  <tr>
                    <td colspan="5">Igv (18%)</td>
                    <td v-text="dato.igv" class=""></td>
                  </tr>
                  <tr>
                    <td colspan="5">Total</td>
                    <td v-text="dato.total" class=""></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="clear()">
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
            <h4 class="modal-title">Registrar Cliente</h4>
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
              <label class="col-md-3 form-control-label" for="email-input"
                >Tipo de documento</label
              >
              <div class="col-md-9">
                <!-- <select
                  v-model="client.type_doc"
                  class="select-search form-control"
                >
                  <option selected value="DNI">DNI</option>
                  <option value="RUC">RUC</option>
                </select> -->
                <model-list-select
                  :list="arrayTypeDoc"
                  v-model="clientNew.type_doc"
                  option-value="name"
                  option-text="name"
                  placeholder="Seleccione"
                >
                </model-list-select>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-3 form-control-label" for="text-input"
                >Número de documento</label
              >
              <div class="col-md-9">
                <input
                  type="text"
                  v-model="clientNew.number_doc"
                  class="form-control"
                  placeholder="Número de RUC/DNI "
                />
              </div>
            </div>

            <div class="form-group row">
              <label class="col-md-3 form-control-label" for="text-input"
                >Nombre</label
              >
              <div class="col-md-9">
                <input
                  type="text"
                  v-model="clientNew.name"
                  class="form-control"
                  placeholder="Nombre de proveedor"
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-3 form-control-label" for="email-input"
                >Dirección</label
              >
              <div class="col-md-9">
                <input
                  type="email"
                  v-model="clientNew.address"
                  class="form-control"
                  placeholder="Ingrese dirección"
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-3 form-control-label" for="email-input"
                >Celular/Teléfono</label
              >
              <div class="col-md-9">
                <input
                  type="text"
                  v-model="clientNew.phone"
                  class="form-control"
                  placeholder="Ingrese teléfono"
                />
              </div>
            </div>

            <div class="form-group row">
              <label class="col-md-3 form-control-label" for="email-input"
                >Correo</label
              >
              <div class="col-md-9">
                <input
                  type="email"
                  v-model="clientNew.email"
                  class="form-control"
                  placeholder="Ingrese correo"
                />
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
              @click="saveClient()"
            >
              Guardar
            </button>
            <!-- <button
              type="button"
              class="btn btn-primary"
              v-if="accion == 2"
              @click="save()"
            >
              Actualizar
            </button> -->
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
  name: "addSale",
  components: {},
  data() {
    return {
      arrayTypeDoc: [{ name: "DNI" }, { name: "RUC" }],

      arrayProducts: [],

      client: { id_client: "", name: "" },
      clientNew: {
        name: "",
        type_doc: "DNI",
        number_doc: "",
        email: "",
        phone: "",
        address: "",
      },
      product: { id_product: "", name: "" },
      price: 0,
      arrayClients: [],
      sale: {
        date: "",
        type_doc: "FACTURA",
        number_doc: "",
        observation: "",
        id_storage: "1",
      },
      detail: {
        quantity: "0",
        price: "0",
        discount: "0",
      },
      arrayDetail: [],
      modalRegistrar: false,
      modal: 0,
      accion: 1,
      id: "",
      rol: this.$store.state.rol,
    };
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
            parseInt(me.arrayDetail[i].quantity) -
          me.arrayDetail[i].discount;
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
    this.clients();
    this.correlativo();
    let me = this;
  },
  methods: {
    addDetail() {
      let me = this;

      if (
        me.detail.quantity < 1 ||
        me.price < 0.1 ||
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
        name: me.product.name_brand,
        quantity: me.detail.quantity,
        price: me.price,
        discount: me.detail.discount,
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
    clients() {
      let me = this;
      axios
        .get("/auth/clients")
        .then(function (response) {
          me.arrayClients = response.data.data;
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

    correlativo() {
      let me = this;
      axios
        .post("/auth/sales/correlativo", { type_doc: me.sale.type_doc })
        .then(function (response) {
          me.sale.number_doc = response.data.code;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    validate() {
      let me = this;
      let count = 0;
      if (me.sale.date == "") {
        swal("Datos incompletos", "Ingrese una fecha", "warning");
        count = 1;
      }
      if (me.sale.number_doc == "") {
        swal("Datos incompletos", "Ingrese un número de documento", "warning");
        count = 1;
      }
      if (me.sale.type_doc == "") {
        swal("Datos incompletos", "Ingrese un tipo de documento", "warning");
        count = 1;
      }
      if (me.client.id_client == "") {
        swal("Datos incompletos", "Seleccione un cliente", "warning");
        count = 1;
      }

      if (me.sale.id_storage == "" && rol == "1") {
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
        .post("/auth/sales", {
          date: me.sale.date,
          type_doc: me.sale.type_doc,
          number_doc: me.sale.number_doc,
          id_client: me.client.id_client,
          observation: me.sale.observation,
          id_storage: me.sale.id_storage,
          details: me.arrayDetail,
        })
        .then(function (response) {
          if (response) {
            swal("Correcto", response.data.message, "success");
            me.clear();
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
      me.client = { id_client: "", name: "" };
      me.product = { id_product: "", name: "" };
      me.sale = {
        date: "",
        type_doc: "FACTURA",
        number_doc: "",
        observation: "",
        id_storage: "1",
      };
      (me.detail = {
        quantity: "0",
        price: "0",
        discount: "0",
      }),
        (me.arrayDetail = []);
    },

    validator(val) {
      return val ? val.length > 0 : false;
    },

    validateClient() {
      let me = this;
      let count = 0;

      if (me.clientNew.type_doc == "") {
        swal("Datos incompletos", "Ingrese un tipo de documento", "warning");
        count = 1;
      }
      if (me.clientNew.number_doc == "") {
        swal("Datos incompletos", "Ingrese un número de documento", "warning");
        count = 1;
      }
      if (me.clientNew.name == "") {
        swal("Datos incompletos", "Ingrese un nombre", "warning");
        count = 1;
      }

      return count;
    },

    saveClient() {
      let me = this;
      if (this.validateClient() > 0) {
        return false;
      }

      if (me.accion == 1) {
        axios
          .post("/auth/clients", {
            name: me.clientNew.name,
            type_doc: me.clientNew.type_doc,
            number_doc: me.clientNew.number_doc,
            address: me.clientNew.address,
            phone: me.clientNew.phone,
            email: me.clientNew.email,
          })
          .then(function (response) {
            me.clients();
            swal("Correcto", response.data.message, "success");
            me.modal = 0;
          })
          .catch(function (error) {
            console.log(error.response);
            swal("Error ", error.response.data.message, "error");
          });
      }
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