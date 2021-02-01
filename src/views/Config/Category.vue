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
                  Categoría de productos</slot
                >
              </CCol>

              <CCol v-if='rol==1' lg="2" sm="6">
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
              :items="arrayCategories"
              :hover="true"
              :fixed="true"
              :border="true"
              :column-filter="true"
              caption="Lista de categorias"
              :fields="rol=='1'?[
                {
                  key: 'name',
                  label: 'Descripción',
                  _style: { width: '95%' },
                  sorter: false,
                  filter: true,
                },

                {
                  key: 'actions',
                  label: 'Acciones',
                  _style: { width: '5%' },
                  sorter: false,
                  filter: true,
                },
              ]:[
                {
                  key: 'name',
                  label: 'Descripción',
                  _style: { width: '95%' },
                  sorter: false,
                  filter: true,
                }
              ]"
              pagination
            >
              <template  #actions="{ item }">
                <td align="center"  style="width:'5%'">
                  <button
                    href="#"
                    class="btn btn-sm"
                    @click="edit(item.id_category)"
                  >
                    <span class="fa fa-edit"></span>
                  </button>
                  <button
                    href="#"
                    class="btn btn-sm"
                    @click="delet(item.id_category)"
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
            <h4 class="modal-title">Registrar categoría</h4>
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
                >Descripción</label
              >
              <div class="col-md-9">
                <input
                  type="text"
                  v-model="category.name"
                  class="form-control"
                  placeholder="Nombre de categoría"
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
      arrayCategories: [],
      category: {
        name: "",
      },
      modalRegistrar: false,
      modal: 0,
      accion: 1,
      id: "",
      rol:this.$store.state.rol
    };
  },
  mounted() {
    this.categories();
  },
  methods: {
    clean() {
      let me = this;
      me.category = {
        name: "",
      };
    },
    edit(id) {
      this.clean();
      this.getCategory(id);
      let me = this;
      me.accion = 2;
      me.id = id;

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
            .delete("/auth/categories/" + me.id)
            .then(function (response) {
              me.categories();
              if (response) {
                swal("Correcto", response.data.message, "success");
              } else {
                swal("Error ", response.message, "error");
              }
            })
            .catch(function (error) {
              console.log(error);
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

    categories() {
      let me = this;
      axios
        .get("/auth/categories")
        .then(function (response) {
          me.arrayCategories = response.data.data;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    getCategory(id) {
      let me = this;
      axios
        .get("/auth/categories/" + id)
        .then(function (response) {
          me.category = response.data.data;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    validate() {
      let me = this;
      let count = 0;
      if (me.category.name == "") {
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
          .post("/auth/categories", {
            name: me.category.name,
          })
          .then(function (response) {
            me.categories();
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
          .put("/auth/categories/" + me.id, {
            name: me.category.name,
          })
          .then(function (response) {
            me.categories();
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