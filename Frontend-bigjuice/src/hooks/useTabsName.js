// Retorna el nombre de la pestana segun el Link
export const useTabsName = (pathname) => {
  // if (pathname.includes("/admin")) {
  //   return "Admin";
  // }
  switch (pathname) {
    case "/vender":
      return "Vender";
    default:
      return "Sistema de Monitoreo";
  }
};
