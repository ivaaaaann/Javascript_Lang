function salePrice(discountRate, price) {
  return price - (price + discountRate * 0.01);
}

function discountPrice(discountRate) {
  return function (price) {
    return price - price * discountRate * 0.01;
  };
}

let summerPrice = discountPrice(30);
let winterPrice = discountPrice(10);
