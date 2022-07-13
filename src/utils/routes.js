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
    ];
  }
  return [];
}

export default getRoutes;
