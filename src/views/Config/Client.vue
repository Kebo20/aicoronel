<template>
  <div>
    <CCard>
      <CRow>
        <CCol lg="12">
          <CCardHeader>
            <CRow>
              <CCol lg="10" sm="6">
                <slot name="header">
                  <img src="@/assets/images/cliente.svg" width="30px" />
                  Clientes</slot
                >
              </CCol>

              <CCol v-if="rol =='1'" lg="2" sm="6">
                <CButton
                  color="primary"
                  @click="
                    modal = 1;
                    accion = 1;
                    id = 0;
                    clean();
                  "
                  class="mr-1"
                >
                  <span class="fa fa-plus-circle"></span> Añadir
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>

          <CCardBody>
            <CDataTable
              :items-per-page="5"
              :dark="false"
              :items="arrayClients"
              :hover="true"
              :fixed="true"
              :border="true"
              :column-filter="true"
              caption="Lista de clientes"
              :fields="
                rol == '1'
                  ? [
                      {
                        key: 'name',
                        label: 'Nombre',
                        _style: { width: '1%' },
                        sorter: false,
                        filter: true,
                      },
                      {
                        key: 'number_doc',
                        label: 'N° de documento',
                        _style: { width: '1%' },
                        sorter: false,
                        filter: true,
                      },
                      {
                        key: 'email',
                        label: 'Correo',
                        _style: { width: '1%' },
                        sorter: false,
                        filter: true,
                      },
                      {
                        key: 'address',
                        label: 'Dirección',
                        _style: { width: '1%' },
                        sorter: false,
                        filter: true,
                      },
                      {
                        key: 'phone',
                        label: 'Teléfono',
                        _style: { width: '1%' },
                        value: 'hola',
                        sorter: false,
                        filter: true,
                      },
                      {
                        key: 'actions',
                        label: 'Acciones',
                        _style: { width: '1%' },
                        value: 'hola',
                        sorter: false,
                        filter: true,
                      },
                    ]
                  : [
                      {
                        key: 'name',
                        label: 'Nombre',
                        _style: { width: '1%' },
                        sorter: false,
                        filter: true,
                      },
                      {
                        key: 'number_doc',
                        label: 'N° de documento',
                        _style: { width: '1%' },
                        sorter: false,
                        filter: true,
                      },
                      {
                        key: 'email',
                        label: 'Correo',
                        _style: { width: '1%' },
                        sorter: false,
                        filter: true,
                      },
                      {
                        key: 'address',
                        label: 'Dirección',
                        _style: { width: '1%' },
                        sorter: false,
                        filter: true,
                      },
                      {
                        key: 'phone',
                        label: 'Teléfono',
                        _style: { width: '1%' },
                        value: 'hola',
                        sorter: false,
                        filter: true,
                      }
                    ]
              "
              pagination
            >
              <template #actions="{ item }">
                <td align="center">
                  <button
                    href="#"
                    class="btn btn-sm"
                    @click="edit(item.id_client)"
                  >
                    <span class="fa fa-edit"></span>
                  </button>
                  <button
                    href="#"
                    class="btn btn-sm"
                    @click="delet(item.id_client)"
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
            <h4 class="modal-title">Registrar cliente</h4>
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
                >Tipo de documneto</label
              >
              <div class="col-md-9">
                <select
                  v-model="client.type_doc"
                  class="select-search form-control"
                >
                  <option value="0">Seleccionar</option>
                  <option value="dni">DNI</option>
                  <option value="ruc">RUC</option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-3 form-control-label" for="text-input"
                >Número de documento</label
              >
              <div class="col-md-9">
                <input
                  type="text"
                  v-model="client.number_doc"
                  class="form-control"
                  placeholder="Número de ruc/dni "
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
                  v-model="client.name"
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
                  v-model="client.address"
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
                  v-model="client.phone"
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
                  v-model="client.email"
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

import CTableWrapper from "./Table.vue";

export default {
  name: "Tables",
  components: { CTableWrapper },
  data() {
    return {
      arrayClients: [],
      client: {
        name: "",
        type_doc: "",
        number_doc: "",
        email: "",
        phone: "",
        address: "",
      },
      modalRegistrar: false,
      modal: 0,
      accion: 1,
      id: "",
      search: "",
      arrayErrors: [],
      rol:this.$store.state.rol
    };
  },
  mounted() {
    this.clients();
  },
  methods: {
    clean() {
      let me = this;
      me.client = {
        name: "",
        type_doc: "",
        number_doc: "",
        email: "",
        phone: "",
        address: "",
      };
    },

    edit(id) {
      this.clean();
      this.getClient(id);
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
            .delete("/auth/clients/" + me.id)
            .then(function (response) {
              me.clients();
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

    getClient(id) {
      let me = this;
      axios
        .get("/auth/clients/" + id)
        .then(function (response) {
          me.client = response.data.data;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    validate() {
      let me = this;
      let count = 0;

      if (me.client.type_doc == "") {
        swal("Datos incompletos", "Ingrese un tipo de documento", "warning");
        count = 1;
      }
      if (me.client.number_doc == "") {
        swal("Datos incompletos", "Ingrese un número de documento", "warning");
        count = 1;
      }
      if (me.client.name == "") {
        swal("Datos incompletos", "Ingrese un nombre", "warning");
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
          .post("/auth/clients", {
            name: me.client.name,
            type_doc: me.client.type_doc,
            number_doc: me.client.number_doc,
            address: me.client.address,
            phone: me.client.phone,
            email: me.client.email,
          })
          .then(function (response) {
            me.clients();
            swal("Correcto", response.data.message, "success");
          })
          .catch(function (error) {
            console.log(error.response);
          swal("Error ", error.response.data.message, "error");
          });
        me.modal = 0;
      } else {
        axios
          .put("/auth/clients/" + me.id, {
            name: me.client.name,
            type_doc: me.client.type_doc,
            number_doc: me.client.number_doc,
            address: me.client.address,
            phone: me.client.phone,
            email: me.client.email,
          })
          .then(function (response) {
            me.clients();
            swal("Correcto", response.data.message, "success");
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