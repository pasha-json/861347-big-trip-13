export const generateTotalCost = (points) => {
  let totalCost = 0;
  for (let i = 0; i < points.length; i++) {
    totalCost += points[i].price;
  }
  return totalCost;
};

