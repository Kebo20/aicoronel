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
                  Productos</slot
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
              :items="arrayProducts"
              :hover="true"
              :fixed="true"
              :border="true"
              :column-filter="true"
              caption="Lista de productos"
              :fields="rol=='1'?[
                {
                  key: 'name',
                  label: 'Nombre',
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
                  key: 'brand',
                  label: 'Marca',
                  _style: { width: '20%' },
                  sorter: false,
                  filter: true,
                },
                {
                  key: 'price',
                  label: 'Precio',
                  _style: { width: '20%' },
                  sorter: false,
                  filter: true,
                },
                {
                  key: 'units',
                  label: 'Unidad',
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
                  filter: false,
                },
              ]:[
                {
                  key: 'name',
                  label: 'Nombre',
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
                  key: 'brand',
                  label: 'Marca',
                  _style: { width: '20%' },
                  sorter: false,
                  filter: true,
                },
                {
                  key: 'price',
                  label: 'Precio',
                  _style: { width: '20%' },
                  sorter: false,
                  filter: true,
                },
                {
                  key: 'units',
                  label: 'Unidad',
                  _style: { width: '20%' },
                  sorter: false,
                  filter: true,
                }
              ]"
              pagination
            >
              <template #actions="{ item }">
                <td   align="center">
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
            <h4 class="modal-title">Registrar producto</h4>
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
                  v-model="product.name"
                  class="form-control"
                  placeholder="Nombre de producto"
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-3 form-control-label" for="email-input"
                >Categoría</label
              >
              <div class="col-md-9">
                <!--  <v-select
                  v-model="category"
                  @search="selectCategories"
                  label="nombre"
                  :options="arrayCategories"
                  @input="getDatosCategory"
                  placeholder="Buscar categorias..."
                >
                </v-select>-->
                <model-list-select
                  :list="arrayCategories"
                  v-model="category"
                  option-value="id_category"
                  option-text="name"
                  placeholder="seleccione"
                >
                </model-list-select>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-3 form-control-label" for="email-input"
                >Precio</label
              >
              <div class="col-md-9">
                <input
                  type="number"
                  v-model="product.price"
                  class="form-control"
                  placeholder="Ingrese precio"
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-3 form-control-label" for="email-input"
                >Marca</label
              >
              <div class="col-md-9">
                <input
                  type="text"
                  v-model="product.brand"
                  class="form-control"
                  placeholder="Ingrese nombre de marca"
                />
              </div>
            </div>

            <div class="form-group row">
              <label class="col-md-3 form-control-label" for="email-input"
                >Unidad</label
              >
              <div class="col-md-9">
                <input
                  type="email"
                  v-model="product.units"
                  class="form-control"
                  placeholder="Ingrese unidad"
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


import { ModelListSelect } from "vue-search-select";
import "vue-search-select/dist/VueSearchSelect.css";

export default {
  name: "Tables",
  components: {  },
  data() {
    return {
      arrayProducts: [],
      product: {
        name: "",
        brand: "",
        price: "",
        units: "",
        id_category: "",
      },
      category: { id_category: "", name: "" },
      arrayCategories: [],
      modalRegistrar: false,
      modal: 0,
      accion: 1,
      id: "",
      search: "",
      arrayErrors: [],
rol:this.$store.state.rol
    };
  },

  components: {
    ModelListSelect,
  },
  mounted() {
    this.products();
    this.categories();
  },
  methods: {
    clean() {
      let me = this;
      me.product = {
        name: "",
        brand: "",
        price: "",
        units: "",
        id_category: "",
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
              console.log(response)
              if (response) {
                swal("Correcto", response.data.message, "success");
                me.products();
              } else {
                swal("Error ", response.message, "error");
              }
            })
            .catch(function (error) {
              console.log(error.response)
              swal("Error",error.response.data.message, "error");
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

    getProduct(id) {
      let me = this;
      axios
        .get("/auth/products/" + id)
        .then(function (response) {
          me.product = response.data.data;

          me.category = { id_category: me.product.id_category };
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
      if (me.category.id_category == "") {
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
            id_category: me.category.id_category,
            units: me.product.units,
          })
          .then(function (response) {
            me.products();
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
          .put("/auth/products/" + me.id, {
            name: me.product.name,
            brand: me.product.brand,
            price: me.product.price,
            id_category: me.category.id_category,
            units: me.product.units,
          })
          .then(function (response) {
            me.products();
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