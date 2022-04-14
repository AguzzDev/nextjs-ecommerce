import { CashIcon, ChartBarIcon, ChatAlt2Icon, HomeIcon, MailIcon, ShoppingBagIcon, TrendingUpIcon, UserGroupIcon, UserIcon } from '@heroicons/react/outline'

const SidebarData = [
  {
    title: 'Inicio',
    icon: HomeIcon,
    path: '/'
  },
  {
    title: 'Analiticas',
    icon: TrendingUpIcon,
    path: '/analiticas'
  },
  {
    title: 'Ventas',
    icon: TrendingUpIcon,
    path: '/ventas'
  },
  {
    title: 'Usuarios',
    icon: UserIcon,
    path: '/usuarios'
  },
  {
    title: 'Productos',
    icon: ShoppingBagIcon,
    path: '/productos'
  },
  {
    title: 'Transacciones',
    icon: CashIcon,
    path: '/transacciones'
  },
  {
    title: 'Reportes',
    icon: ChartBarIcon,
    path: '/reportes'
  },
  {
    title: 'Correo',
    icon: MailIcon,
    path: '/correo'
  },
  {
    title: 'Opiniones',
    icon: UserGroupIcon,
    path: '/opiniones'
  },
  {
    title: 'Mensajes',
    icon: ChatAlt2Icon,
    path: '/mensajes'
  }
]
export default SidebarData
