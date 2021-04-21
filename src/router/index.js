import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')
const Provider = () => import('@/views/Config/Provider')
const Product = () => import('@/views/Config/Product')
const Category = () => import('@/views/Config/Category')
const Client = () => import('@/views/Config/Client')
const User = () => import('@/views/Config/User')

const Login = () => import('@/views/Login/Login')
const AddPurchase = () => import('@/views/Config/AddPurchase')
const ListPurchase = () => import('@/views/Config/ListPurchase')
const DetailPurchase = () => import('@/views/Config/DetailPurchase')
const EditPurchase = () => import('@/views/Config/EditPurchase')
const ReportPurchase = () => import('@/views/Config/ReportPurchase')


const AddSale = () => import('@/views/Config/AddSale')
const ListSale = () => import('@/views/Config/ListSale')
const DetailSale = () => import('@/views/Config/DetailSale')
const ReportSale = () => import('@/views/Config/ReportSale')
const PurchaseByProduct = () => import('@/views/Config/PurchaseByProduct')


const Storage = () => import('@/views/Config/Storage')
const InitialInventory = () => import('@/views/Config/InitialInventory')



const P404 = () => import('@/views/errors/Page404')




// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
//const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')



Vue.use(Router)





const router = new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Inicio',
      component: TheContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },

        {
          path: 'provider',
          name: 'Proveedores',
          component: Provider
        },
        {
          path: 'client',
          name: 'Clientes',
          component: Client
        },
        {
          path: 'user',
          name: 'Usuarios',
          component: User,
          beforeEnter:(to, from, next) => {
           let rol=store.state.rol
           if(rol==1){
            next()
          }else{
             next("/404")
           }
          
          }
        },
        {
          path: 'product',
          name:'Productos',
          redirect: '/product/list',
          component: {
            render(c) { return c('router-view') }
          },
          children: [

            {
              path: 'category',
              name: 'Listar categorias',
              component: Category
            },
            {
              path: 'list',
              name: 'Listar productos',
              component: Product
            }
    
          ]
        },
        {
          path: 'storage',
          name:'Almacén',
          component: Storage
        },
        {
          path: 'initial-inventory',
          name: 'Inventario inicial',
          component: InitialInventory,
          beforeEnter:(to, from, next) => {
           let rol=store.state.rol
           if(rol==1){
            next()
          }else{
             next("/404")
           }
          
          }
        },

        {
          path: 'purchase',
          name:'Compras',
          redirect: '/purchase/list',
          beforeEnter:(to, from, next) => {
            let rol=store.state.rol
            if(rol==1){
             next()
           }else{
              next("/404")
            }
           
           },
          component: {
            render(c) { return c('router-view') }
          },
          children: [

            {
              path: 'add',
              name: 'Registrar compra',
              component: AddPurchase
            },
            {
              path: 'list',
              name: 'Listar compras',
              component: ListPurchase
            },
            {
              path: 'detail/:id',
              name: 'Detalle de compra',
              component: DetailPurchase
            },
            {
              path: 'edit/:id',
              name: 'Editar compra',
              component: EditPurchase
            }
            ,
            {
              path: 'reports',
              name: 'Reportes ',
              component: ReportPurchase
            }
    
          ]
        },
        {
          path: 'sale',
          name:'Ventas',
          redirect: '/sale/list',
          component: {
            render(c) { return c('router-view') }
          },
          children: [

            {
              path: 'add',
              name: 'Registrar venta',
              component: AddSale
            },
            {
              path: 'list',
              name: 'Listar ventas',
              component: ListSale
            },
            {
              path: 'detail/:id',
              name: 'Detalle de venta',
              component: DetailSale
            },
            {
              path: 'products',
              name: 'Consultar compras por producto',
              component: PurchaseByProduct
            },
            {
              path: 'reports',
              name: 'Reportes ',
              component: ReportSale
            }
    
          ]
        },
  ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render(c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'logins',
          name: 'Logins',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    },
    {
      path: "/404",
      component: P404
    }
  ]

})

//VALIDAR SESIÓN EN RUTAS
router.beforeEach((to, from, next) => {
  let token=store.state.token
  if (to.path != '/login') { //para otras rutas
    if (token!='') {
      next()
    } else {
      next('/login')
    }
  } else { //para /login
    if (token!='') {
      next('/')
    } else {
      next();
    }

  }

});



export default router;




