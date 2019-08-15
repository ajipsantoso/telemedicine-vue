export default {
  default: [
    {
      icon: 'mdi-home',
      title: 'Dashboard',
      to: '/'
    },
  ],
  doctor: [
    {
      icon: 'mdi-home',
      title: 'Dashboard',
      to: '/users'
    },
    {
      icon: 'mdi-access-point',
      title: 'Request Access',
      to: '/users/request'
    },
    // {
    //   icon: 'mdi-access-point',
    //   title: 'Request Approval',
    //   to: '/users/request'
    // }
  ],
  patient: [
    {
      icon: 'mdi-home',
      title: 'Dashboard',
      to: '/admin'
    },
    {
      icon: 'mdi-home',
      title: 'Dashboard',
      to: '/'
    }
  ]
}