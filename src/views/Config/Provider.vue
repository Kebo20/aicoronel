<template>
  <div>
    <CCard>
      
      <CRow>
        <CCol lg="12">
          <CCardHeader>
            <slot name="header"> <img src="@/assets/images/proveedor.svg" width="30px" /> Proveedores</slot>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              :items-per-page="small ? 7 : 5"
              :dark="false"
              :items="arrayProviders"
              :small="true"
              :hover="true"
              fixed
              caption="Lista de proveedores"
              :fields="[
                'businessName',
                'ruc',
                'status',
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
                <td align='center'>
                 
                    <a @click="edit(item.ruc)"><CIcon  name="cil-grid" /> </a>
                  <CIcon @click="edit(item.ruc)" name="cil-grid" /> 
                </td>
              </template>
            </CDataTable>
          </CCardBody>
        </CCol>
      </CRow>
      <CRow>
         <CCol lg="12">
        <CButton pressed @click="login()" color="primary" aria-pressed="true"
          >Login</CButton
        >

        <CButton
          pressed
          @click="providers()"
          color="primary"
          aria-pressed="true"
          >Listar</CButton
        >

        <CButton pressed @click="logout()" color="primary" aria-pressed="true"
          >Logout</CButton
        >
         </CCol>
      </CRow>
    </CCard>
  </div>
</template>

<script>
import axios from "axios";

import CTableWrapper from "./Table.vue";
import usersData from "../users/UsersData";

export default {
  name: "Tables",
  components: { CTableWrapper },
  data() {
    return {
      email: "root",
      password: "123qaz",
      user: "",
      arrayProviders: [],
    };
  },
  mounted() {
    this.providers();
  },
  methods: {
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      console.log(array);
      return array;
    },

    getShuffledUsersData() {
      return this.shuffleArray(usersData.slice(0));
    },

    edit(id) {
      alert(id);
      //this.logout();
    },
    delet(id) {
      alert(id);
      //this.logout();
    },

    login() {
      let me = this;
      axios
        .post("http://pyr-intranet-api/api/auth/login", {
          userName: me.email,
          password: me.password,
          remember_me: false,
        })
        .then(function (response) {
          console.log(response);
          //  me.user = response.data.user;
          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem("user", response.data.user);
          //axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access_token;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    providers() {
      let me = this;
      let config = {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      axios
        .get("http://pyr-intranet-api/api/providers/list", config)
        .then(function (response) {
          me.arrayProviders = response.data.data;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    logout() {
      let me = this;
      let config = {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      axios
        .get("http://pyr-intranet-api/api/auth/logout", config)
        .then(function (response) {
          console.log(response);
          //me.user = "";
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          me.arrayProviders = [];
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
