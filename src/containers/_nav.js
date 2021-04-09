import store from '../store'

export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Inicio',
        to: '/dashboard',
        //icon: 'cil-speedometer',
       // badge: {
         // color: 'primary',
          //text: 'NEW'
       // }
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Configuración']
      },
      {
        _name: 'CSidebarNavItem',
        name: '* Proveedores',
        to: '/provider',
      
        //icon: 'cil-user'
      },
      store.state.rol===1?
      {
        _name: 'CSidebarNavItem',
        name: '* Usuarios',
        to: '/user',
        //icon: 'cil-user'
      }:'',
      {
        _name: 'CSidebarNavItem',
        name: '* Clientes',
        to: '/client',
        //icon: 'cil-people'
      },
      {
        _name: 'CSidebarNavDropdown',
        name: '* Productos',
        route: '/base',
        //icon: 'cil-puzzle',
        items: [

          {
            name: 'Categorias',
            to: '/product/category'
          },

          {
            name: 'Gestionar Productos',
            to: '/product'
          }
        ]
      },
     
      {
        _name: 'CSidebarNavTitle',
        _children: ['Gestión']
      },
      store.state.rol===1?
      {
        _name: 'CSidebarNavDropdown',
        name: '* Compras',
        route: '/base',
        //icon: 'cil-chart',
        items: [

          {
            name: 'Registrar Compra',
            to: '/purchase/add'
          },

          {
            name: 'Ver Compras',
            to: '/purchase/list'
          },
          {
            name: 'Reportes',
            to: '/purchase/reports'
          }
        ]
      }:'',
    
      {
        _name: 'CSidebarNavDropdown',
        name: '* Ventas',
        route: '/sale',
        //icon: 'cil-dollar',
        items: [
          {
            name: 'Registrar Venta',
            to: '/sale/add'
          },
          {
            name: 'Ver ventas',
            to: '/sale/list'
          },
          {
            name: 'Reportes',
            to: '/sale/Reports'
          }
        ]
      },
      {
        _name: 'CSidebarNavItem',
        name: '* Almacén',
        to: '/storage',
        //icon: 'cil-storage'
      },
      store.state.rol===1?
      {
        _name: 'CSidebarNavItem',
        name: '* Inventario inicial',
        to: '/initial-inventory',
        //icon: 'cil-storage'
      }
      :'',
    ]
  }
]