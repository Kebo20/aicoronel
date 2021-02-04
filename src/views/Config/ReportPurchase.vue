<template>
  <div>
    <CRow>
      <CCol sm="12">
        <CCard>
          <CRow>
            <CCol lg="12" sm="12" md="12">
              <CCardHeader>
                <CRow>
                  <CCol lg="12" sm="8" class="col-8">
                    <slot name="header">
                      <span class="fa fa-file"></span>
                      Compras del día</slot
                    >
                  </CCol>
                </CRow>
              </CCardHeader>

              <CCardBody>
                <div class="row">
                  <div class="form-group col-sm-12 col-md-6 col-lg-3">
                    <label class="form-control-label" for="text-input"
                      >Fecha</label
                    >
                    <div class="">
                      <input
                        type="date"
                        v-model="date"
                        class="form-control form-control-sm"
                      />
                    </div>
                  </div>
                    <div
                    class="form-group col-sm-12 col-md-6 col-lg-3"
                    v-if="rol == '1'"
                  >
                  <label class="form-control-label" for="text-input"
                      >Tienda</label>
                    <select
                      v-model="id_storage"
                      placeholder="Seleccione"
                      class="select-search form-control form-control-sm"
                    >
                      <option value="1">Bagua</option>
                      <option value="2">Bagua Chica</option>
                    </select>
                  </div>
                  <div class="form-group col-sm-12 col-md-6 col-lg-3  ">
                  <br>
                    <div class="row justify-content-center">
                      <button class="btn btn-danger" @click="printDate">
                        <span class="fa fa-file-pdf"> </span>
                      </button>
                      <button class="btn btn-primary" @click="excelDate">
                        <span class="fa fa-file-excel"> </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <hr />
                </div>

                <div class="table-responsive"></div>
              </CCardBody>
            </CCol>
          </CRow>
        </CCard>
      </CCol>

      <CCol sm="12">
        <CCard>
          <CRow>
            <CCol lg="12" sm="12" md="12">
              <CCardHeader>
                <CRow>
                  <CCol lg="12" sm="8" class="col-8">
                    <slot name="header">
                      <span class="fa fa-file"></span>
                      Compras entre fechas</slot
                    >
                  </CCol>
                </CRow>
              </CCardHeader>

              <CCardBody>
                <div class="row">
                  <div class="form-group col-sm-12 col-md-6 col-lg-3">
                    <label class="form-control-label" for="text-input"
                      >Inicio</label
                    >
                    <div class="">
                      <input
                        type="date"
                        v-model="date_start"
                        class="form-control form-control-sm"
                      />
                    </div>
                  </div>
                  <div class="form-group col-sm-12 col-md-6 col-lg-3 ">
                    <label class="form-control-label" for="text-input"
                      >Fin</label
                    >
                    <div class="">
                      <input
                        type="date"
                        v-model="date_end"
                        class="form-control form-control-sm"
                      />
                    </div>
                  </div>
                    <div
                    class="form-group col-sm-12 col-md-6 col-lg-3"
                    v-if="rol == '1'"
                  >
                    <label class="form-control-label" for="text-input"
                      >Tienda</label>
                    <select
                      v-model="id_storage"
                      placeholder="Seleccione"
                      class="select-search form-control form-control-sm"
                    >
                      <option value="1">Bagua</option>
                      <option value="2">Bagua Chica</option>
                    </select>
                  </div>
                  <div class="form-group col-sm-12 col-md-6 col-lg-3  ">
                  <br>
                    <div class="row justify-content-center">
                      <button class="btn btn-danger" @click="printDateToDate">
                        <span class="fa fa-file-pdf"> </span>
                      </button>
                      <button class="btn btn-primary" @click="excelDateToDate">
                        <span class="fa fa-file-excel"> </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <hr />
                </div>

                <div class="table-responsive"></div>
              </CCardBody>
            </CCol>
          </CRow>
        </CCard>
      </CCol>

      <CCol sm="12">
        <CCard>
          <CRow>
            <CCol lg="12" sm="12" md="12">
              <CCardHeader>
                <CRow>
                  <CCol lg="12" sm="8" class="col-8">
                    <slot name="header">
                      <span class="fa fa-file"></span>
                      Compras del mes</slot
                    >
                  </CCol>
                </CRow>
              </CCardHeader>

              <CCardBody>
                <div class="row">
                  <div class="form-group col-sm-12 col-md-6 col-lg-3">
                    <div class="">
                       <label class="form-control-label" for="text-input"
                      >Mes</label>
                      <select
                        type="date"
                        v-model="month"
                        class="form-control form-control-sm"
                      >
                        <option value="1">Enero</option>
                        <option value="2">Febreo</option>
                        <option value="3">Marzo</option>
                        <option value="4">Abril</option>
                        <option value="5">Mayo</option>
                        <option value="6">Junio</option>
                        <option value="7">Julio</option>
                        <option value="8">Agosto</option>
                        <option value="9">Setiembre</option>
                        <option value="10">Octubre</option>
                        <option value="11">Noviembre</option>
                        <option value="12">Diciembre</option>
                      </select>
                    </div>
                  </div>
                  <div
                    class="form-group col-sm-12 col-md-6 col-lg-3"
                    v-if="rol == '1'"
                  >
                   <label class="form-control-label" for="text-input"
                      >Tienda</label>
                    <select
                      v-model="id_storage"
                      placeholder="Seleccione"
                      class="select-search form-control form-control-sm"
                    >
                      <option value="1">Bagua</option>
                      <option value="2">Bagua Chica</option>
                    </select>
                  </div>

                  <div class="form-group col-sm-12 col-md-6 col-lg-3  ">
                  <br>
                    <div class="row justify-content-center">
                      <button class="btn btn-danger" @click="printMonth">
                        <span class="fa fa-file-pdf"> </span>
                      </button>
                      <button class="btn btn-primary" @click="excelMonth">
                        <span class="fa fa-file-excel"> </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <hr />
                </div>

                <div class="table-responsive"></div>
              </CCardBody>
            </CCol>
          </CRow>
        </CCard>
      </CCol>
    </CRow>
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
      date: "",
      date_start: "",
      date_end: "",
      month: "1",
      id_storage:'1',
      rol: this.$store.state.rol,
    };
  },

  components: {
    ModelListSelect,
  },

  mounted() {
    
  },
  methods: {
   

    printDate() {
     
      let me = this;

       if(me.date==''){
         swal("Requerido","Seleccione una fecha","warning");
         return false;
       }
      axios
        .post("/auth/purchases/printADate",{date:me.date,id_storage:me.id_storage})
        .then(function (response) {
          console.log(response);
          let url = response.data.data;
          window.open(url);
        })
        .catch(function (error) {
          console.log(error.response);
          swal("Error ", error.response.data.message, "error");
        });
    },

     printDateToDate() {
     
      let me = this;

       if(me.date_start==''){
         swal("Requerido","Seleccione una fecha de inicio","warning");
         return false;
       }
        if(me.date_end==''){
         swal("Requerido","Seleccione una fecha final","warning");
         return false;
       }
      axios
        .post("/auth/purchases/printDateToDate",{date:[me.date_start,me.date_end],id_storage:me.id_storage})
        .then(function (response) {
          console.log(response)
          let url = response.data.data;
          window.open(url);
        })
        .catch(function (error) {
          console.log(error.response);
          swal("Error ", error.response.data.message, "error");
        });
    },


     printMonth() {
     
      let me = this;

       if(me.month==''){
         swal("Requerido","Seleccione un mes","warning");
         return false;
       }
       
      axios
        .post("/auth/purchases/printForMonth",{date:me.month,id_storage:me.id_storage})
        .then(function (response) {
          console.log(response)
          let url = response.data.data;
          window.open(url);
        })
        .catch(function (error) {
          console.log(error.response);
          swal("Error ", error.response.data.message, "error");
        });
    },



      excelDate() {
     
      let me = this;

       if(me.date==''){
         swal("Requerido","Seleccione una fecha","warning");
         return false;
       }
      axios
        .post("/auth/purchases/exportADate",{date:me.date,id_storage:me.id_storage})
        .then(function (response) {
          console.log(response);
          let url = response.data.data;
          window.open(url);
        })
        .catch(function (error) {
          console.log(error.response);
          swal("Error ", error.response.data.message, "error");
        });
    },

     excelDateToDate() {
     
      let me = this;

       if(me.date_start==''){
         swal("Requerido","Seleccione una fecha de inicio","warning");
         return false;
       }
        if(me.date_end==''){
         swal("Requerido","Seleccione una fecha final","warning");
         return false;
       }
      axios
        .post("/auth/purchases/exportDateToDate",{date:[me.date_start,me.date_end],id_storage:me.id_storage})
        .then(function (response) {
          console.log(response)
          let url = response.data.data;
          window.open(url);
        })
        .catch(function (error) {
          console.log(error.response);
          swal("Error ", error.response.data.message, "error");
        });
    },


     excelMonth() {
     
      let me = this;

       if(me.month==''){
         swal("Requerido","Seleccione un mes","warning");
         return false;
       }
       
      axios
        .post("/auth/purchases/exportForMonth",{date:me.month,id_storage:me.id_storage})
        .then(function (response) {
          console.log(response)
          let url = response.data.data;
          window.open(url);
        })
        .catch(function (error) {
          console.log(error.response);
          swal("Error ", error.response.data.message, "error");
        });
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