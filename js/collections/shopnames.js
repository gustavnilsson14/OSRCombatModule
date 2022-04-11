function getShopNames() {
  return [
    "Shop",
    "Mall",
    "boutique",
    "deli",
    "department",
    "booth",
    "specialties",
    "franchise",
    "emporium",
    "market",
    "mill",
    "outlet",
    "showroom",
    "stand",
    "store",
    "supermarket",
  ].map((x) => {
    return x.charAt(0).toUpperCase() + x.slice(1);
  });
}
