const getGameMapSlug = (gameSlug: string) => {
  switch (gameSlug) {
    case 'cs16':
      return 'cs'
    default:
      return gameSlug
  }
}

export default getGameMapSlug;
