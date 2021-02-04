<template>
  <div
    class="c-app flex-row align-items-center"
    style="background-color: #205d69 !important"
  >
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <h2></h2>
                <br /><br />
                <p class="text-muted"></p>
                <CInput
                  placeholder="Usuario"
                  autocomplete="username email"
                  v-model="name"
                >
                  <template #prepend-content
                    ><CIcon name="cil-user"
                  /></template>
                </CInput>
                <CInput
                  placeholder="Password"
                  type="password"
                  autocomplete="curent-password"
                  v-model="password"
                >
                  <template #prepend-content
                    ><CIcon name="cil-lock-locked"
                  /></template>
                </CInput>
                <CRow>
                  <CCol col="12" class="text-left">
                    <button @click="login" class="btn btn-block btn-primary">
                      Ingresar <i class="fa fa-unlock-alt"></i>
                    </button>
                  </CCol>
                  <!-- <CCol col="6" class="text-right">
                      <CButton color="link" class="px-0">Forgot password?</CButton>
                      <CButton color="link" class="d-lg-none">Register now!</CButton>
                    </CCol>-->
                </CRow>
              </CCardBody>
            </CCard>
            <CCard
              color="secondary"
              text-color="black"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <img src="@/assets/images/logo.jpg" width="200px" />
                <br />
                <!--  <CButton
                  color="light"
                  variant="outline"
                  size="lg"
                >
                  Register Now!
                </CButton>-->
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import axios from "../../Config/axios";
import "@fortawesome/fontawesome-free/js/all.js";
import swal from "sweetalert";
//import store from '../../store'

export default {
  name: "Tables",
  components: {},
  data() {
    return {
      name: "",
      password: "",
      user: "",
      modal: 0,
      tipoAccion: 1,
    };
  },
  mounted() {
    let me=this
   console.log(me.$store.state.token)
  },
  methods: {
    // DATATABLE
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

    login() {
      let me = this;

      if(me.name==''||me.password==''){
          swal("Mensaje ", 'Ingrese usuario y contraseña', "warning");
          return false;

      }
      axios
        .post("/auth/login", {
          name: me.name,
          password: me.password,
          remember_me: false,
        })
        .then(function (response) {
          if (response) {
            me.user = response.data.user;
            me.$store.commit('user', response.data.user)
            me.$store.commit('rol', response.data.rol)
            me.$store.commit('token', response.data.access_token)


            

            swal("Bienvenido", me.$store.state.user, "success");
            me.$router.push("/");
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + response.data.access_token;
          } else {
            swal("Bienvenido", response.message, "success");
          }
        })
        .catch(function (error) {
          swal("Error ", error.response.data.message, "error");
        });
    },

    validator(val) {
      return val ? val.length > 0 : false;
    },
  },
};
</script>
