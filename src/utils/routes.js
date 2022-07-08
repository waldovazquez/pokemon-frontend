function getRoutes(userData) {
  if (userData) {
    return [{
      id: 1,
      to: '/home',
      label: 'Home',
      logged: true,
    },
    {
      id: 2,
      to: '/about',
      label: 'About',
    },
    {
      id: 3,
      to: '/pokemon/create',
      label: 'Make your pokemon',
      logged: true,
    },
    ];
  }
  return [
    {
      id: 1,
      to: '/about',
      label: 'About',
    },
    {
      id: 2,
      to: '/sign-in',
      label: 'Sign in',
    },
    {
      id: 3,
      to: '/sign-up',
      label: 'Sign up',
    },
  ];
}

export default getRoutes;
