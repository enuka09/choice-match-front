export const formatPrice = (price: number) => {
  const formattedPrice = new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    minimumFractionDigits: 2,
  }).format(price);

  return formattedPrice.replace("₨", "LKR ");
};
