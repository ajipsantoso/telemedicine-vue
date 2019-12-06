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
      icon: 'mdi-home-outline',
      title: 'Dashboard',
      to: '/',
    },
    {
      icon: 'mdi-account-multiple-plus-outline',
      title: 'Add Account',
      model: true,
      children: [
        {
          icon: 'mdi-doctor',
          title: 'Add Doctor / Nurse',
          to: '/doctor/addDoctor'
        },
        // {
        //   icon: 'mdi-account',
        //   title: 'Add User',
        //   act: 'addUser'
        // }
      ]
    }
  ],
  nurse: [
    {
      icon: 'mdi-home-outline',
      title: 'Dashboard',
      to: '/nurse',
    },
  ],
  patient: [
    {
      icon: 'mdi-home',
      title: 'Dashboard',
      to: '/'
    },
  ]
}