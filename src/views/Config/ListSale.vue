<template>
  <div>
    <CCard>
      <CRow>
        <CCol lg="12">
          <CCardHeader>
            <CRow>
              <CCol lg="10" sm="6">
                <slot name="header">
                  <img src="@/assets/images/venta.svg" width="30px" />
                  Ventas</slot
                >
              </CCol>
            </CRow>
          </CCardHeader>

          <CCardBody>
            <CDataTable
              :items-per-page="5"
              :dark="false"
              :items="arraySales"
              :hover="true"
              :fixed="true"
              :border="true"
              :column-filter="true"
              caption="Lista de ventas"
              :fields="[
                {
                  key: 'date',
                  label: 'Fecha',
                  _style: { width: '10%' },
                  sorter: false,
                  filter: true,
                },
                {
                  key: 'type_doc',
                  label: 'Tipo',
                  _style: { width: '10%', text: 'center' },
                  sorter: false,
                  filter: true,
                },
                {
                  key: 'number_doc',
                  label: 'Número ',
                  _style: { width: '10%' },
                  sorter: false,
                  filter: true,
                },
                {
                  key: 'client_name',
                  label: 'Cliente',
                  _style: { width: '20%' },
                  sorter: false,
                  filter: true,
                },
                {
                  key: 'observation',
                  label: 'Observación',
                  _style: { width: '10%' },
                  sorter: false,
                  filter: true,
                },
                {
                  key: 'discount',
                  label: 'Dscto.',
                  _style: { width: '10%' },
                  sorter: false,
                  filter: true,
                },
                {
                  key: 'subtotal',
                  label: 'Subtotal(S/.)',
                  _style: { width: '20%' },
                  sorter: false,
                  filter: true,
                },
                {
                  key: 'igv',
                  label: 'Igv(S/.)',
                  _style: { width: '20%' },
                  sorter: false,
                  filter: true,
                },

                {
                  key: 'total',
                  label: 'Total(S/.)',
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
                 {
                  key: 'status',
                  label: 'Estado',
                  _style: { width: '10%' },
                  value: '',
                  sorter: false,
                  filter:true
                 },

                 {
                  key: 'action_detail',
                  label: '',
                  _style: { width: '10%' },
                  value: 'hola',
                  sorter: false,
                  filter: false,
                },
                {
                  key: 'action_delete',
                  label: '',
                  _style: { width: '10%' },
                  value: 'hola',
                  sorter: false,
                  filter: false,
                },
              ]"
              pagination
            >

             <template #status="{ item }">
                <td align="center">
                 <CBadge v-if="item.status=='1'" color='success'>Activo</CBadge>
                  <CBadge v-else color='danger'>Anulada</CBadge>
                </td>
              </template>
              <template #action_detail="{ item }">
                <td align="center">
                  <router-link :to="{ path:`/sale/detail/${item.id_sale}`} ">

                    <CBadge  color="success"> <span class="fa fa-search-plus "></span></CBadge>

                  </router-link>

                 

                </td>
              </template>
                <template #action_delete="{ item }">
                <td align="center">
                
               <a href="#" v-if="item.status=='1'">
                    <CBadge @click="delet(item.id_sale)" color="danger"
                      > <span class="fa fa-ban"></span></CBadge
                  ></a>
                  <a href="#" v-else>
                    <CBadge color="secondary"
                      > <span disabled class="fa fa-ban"></span></CBadge
                  ></a>
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
import swal from "sweetalert";


import { ModelListSelect } from "vue-search-select";
import "vue-search-select/dist/VueSearchSelect.css";

export default {
  name: "ListSale",
  components: {  },
  data() {
    return {
      arraySales: []
      
    };
  },

  components: {
    ModelListSelect,
  },
  mounted() {
    this.sales();
  },
  methods: {
  

    delet(id) {
      swal({
        title: "Eliminar",
        text: "¿Seguro de anular este registro?",
        span: "warning",
        dangerMode: true,
        buttons: true,
      }).then((willDelete) => {
        if (willDelete) {
          let me = this;
          me.id = id;
          axios
            .delete("/auth/sales/" + me.id)
            .then(function (response) {
              me.sales();
              swal("Correcto", response.data.message, "success");
            })
            .catch(function (error) {
              console.log(error.response);
              swal("Error ", error.response.data.message, "error");
            });
        }
      });
    },

    sales() {
      let me = this;
      axios
        .get("/auth/sales")
        .then(function (response) {
          me.arraySales = response.data.data;
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