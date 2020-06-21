export default function initializeCurrentLocation(state) {
  const currentPath = window.location.pathname;
  return {
    ...state,
    router: {
      pathname: currentPath,
    },
  };
}
