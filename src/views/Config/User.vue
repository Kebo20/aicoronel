<template>
  <div>
    <CCard>
      <CRow>
        <CCol lg="12">
          <CCardHeader>
            <CRow>
              <CCol lg="10" sm="6">
                <slot name="header">
                  <img src="@/assets/images/usuario.svg" width="30px" />
                  Usuarios</slot
                >
              </CCol>

              <CCol lg="2" sm="6">
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
              :items="arrayUsers"
              :hover="true"
              :fixed="true"
              :border="true"
              :column-filter="true"
              caption="Lista de usuarios"
              :fields="[
                {
                  key: 'name',
                  label: 'Usuario',
                  _style: { width: '20%' },
                  sorter: false,
                  filter: true,
                },

                {
                  key: 'role_name',
                  label: 'Rol',
                  _style: { width: '20%' },
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
              ]"
              pagination
            >
              <template #actions="{ item }">
                <td align="center">
                  <button href="#" class="btn btn-sm" @click="edit(item.id)">
                    <span class="fa fa-edit"></span>
                  </button>
                  <button href="#" class="btn btn-sm" @click="delet(item.id)">
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
            <h4 class="modal-title" v-if="accion==1">Registrar Usuario</h4>
            <h4 class="modal-title" v-else>Modificar Usuario</h4>

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
                >Nombre</label
              >
              <div class="col-md-9">
                <input
                  type="text"
                  v-model="user.name"
                  class="form-control"
                  placeholder="Nombre de usuario"
                  maxlength="250"

                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-3 form-control-label" for="email-input"
                >Rol</label
              >
              <div class="col-md-9">
                <model-list-select
                  :list="arrayRoles"
                  v-model="rol"
                  option-value="id_role"
                  option-text="name"
                  placeholder="Seleccione"
                >
                </model-list-select>
              </div>
            </div>
            <!-- <div class="form-group row">
              <label class="col-md-3 form-control-label" for="email-input"
                >Correo</label
              >
              <div class="col-md-9">
                <input
                  type="email"
                  v-model="user.email"
                  class="form-control"
                  placeholder="Ingrese un correo"
                />
              </div>
            </div> -->

            <div class="form-group row" v-if="accion==2">
              <label class="col-md-3 form-control-label" for="email-input"
                >¿Actualizar contraseña?</label
              >
              <div class="col-md-9">
                <input type="checkbox" v-model="updatePassword" class="" />
              </div>
            </div>
            <div v-show="updatePassword||accion==1">
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="email-input"
                  >Contraseña</label
                >
                <div class="col-md-9">
                  <input
                    type="text"
                    v-model="password"
                    class="form-control"
                    placeholder="Ingrese una nueva contraseña"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="email-input"
                  >Repita contraseña</label
                >
                <div class="col-md-9">
                  <input
                    type="text"
                    v-model="password_repeat"
                    class="form-control"
                    placeholder="Ingrese otra vez la contraseña"
                  />
                </div>
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
var strongRegex = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})");

import axios from "../../Config/axios";
import "@fortawesome/fontawesome-free/js/all.js";
import swal from "sweetalert";

import { ModelListSelect } from "vue-search-select";
import "vue-search-select/dist/VueSearchSelect.css";

export default {
  name: "user",
  components: {},
  data() {
    return {
      arrayUsers: [],
      user: {
        name: "",
        email: "",
        password: "",

        id_rol: "",
      },
      rol: { id_role: "", name: "" },
      arrayRoles: [],
      modalRegistrar: false,
      modal: 0,
      accion: 1,
      id: "",
      password: "",
      password_repeat: "",
      updatePassword: false,
    };
  },

  components: {
    ModelListSelect,
  },
  mounted() {
    this.users();
    this.roles();
  },
  methods: {
    clean() {
      let me = this;
      me.user = {
        name: "",
        email: "",

        id_role: "",
      };
      (me.password = ""), (me.password_repeat = "");
    },

    edit(id) {
      this.clean();
      this.getUser(id);
      let me = this;
     
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
            .delete("/auth/users/" + me.id)
            .then(function (response) {
              me.users();
              if (response) {
                swal("Correcto", response.data.message, "success");
              } else {
                swal("Error ", response.message, "error");
              }
            })
            .catch(function (error) {
              swal("Error ", error.response.data.message, "error");
            });
        }
      });
    },

    closeModal(status, evt, accept) {
      if (accept) {
        alert("ok");
      }
    },

    users() {
      let me = this;
      axios
        .get("/auth/users")
        .then(function (response) {
          me.arrayUsers = response.data.data;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    roles() {
      let me = this;
      axios
        .get("/auth/roles")
        .then(function (response) {
          me.arrayRoles = response.data.data;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    getUser(id) {
      let me = this;
      axios
        .get("/auth/users/" + id)
        .then(function (response) {
          me.user = response.data.data;
          me.rol = { id_role: me.user.id_role };
           me.id = id;
      me.accion = 2;
      me.modal = 1;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    validate() {
      let me = this;
      let count = 0;

      if (me.user.name == "") {
        swal("Datos incompletos", "Ingrese un nombre", "warning");
        count = 1;
        return count;
      }
      // if (me.user.email == "") {
      //   swal("Datos incompletos", "Ingrese un correo", "warning");
      //   count = 1;
      //   return count;
      // }
      if (me.updatePassword||me.accion==1) {
        if (me.password == "") {
          swal("Datos incompletos", "Ingrese una contraseña ", "warning");
          count = 1;
          return count;
        }

        if (!strongRegex.test(me.password)) {
          swal(
            "Datos incorrectos",
            "La contraseña debe tener mínimo 8 digitos, una letra y un número",
            "warning"
          );
          count = 1;
          return count;
        }

        if (me.password != me.password_repeat) {
          swal("Datos incompletos", "Contraseñas no coinciden ", "warning");
          count = 1;
          return count;
        }
      }

      if (me.rol.id_role == "") {
        swal("Datos incompletos", "Seleccione una categoría", "warning");
        count = 1;
        return count;
      }
    },

    save() {
      let me = this;
      if (this.validate() > 0) {
        return false;
      }
      if (me.accion == 1) {
        axios
          .post("/auth/users", {
            name: me.user.name,
            // email: me.user.email,
            id_role: me.rol.id_role,
            password: me.password,
          })
          .then(function (response) {
            me.users();
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
          .put("/auth/users/" + me.id, {
            name: me.user.name,
            // email: me.user.email,
            updatePassword:me.updatePassword,
            id_role: me.rol.id_role,
            password: me.password,
          })
          .then(function (response) {
            me.users();
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