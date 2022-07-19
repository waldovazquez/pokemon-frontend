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
      to: '/favorites',
      label: 'Favorites',
    },
    {
      id: 3,
      to: '/pokemon/create',
      label: 'Make your pokemon',
      logged: true,
    },
    {
      id: 4,
      to: '/pokemon/my-pokemon',
      label: 'Your Pokemons',
      logged: true,
    },
    ];
  }
  return [{
    id: 1,
    to: '/sign-in',
    label: 'Sign in',
  },
  {
    id: 2,
    to: '/sign-up',
    label: 'Sign Up',
  },
  ];
}

export default getRoutes;
