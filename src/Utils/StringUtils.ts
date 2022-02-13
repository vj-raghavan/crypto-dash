export const capitaliseFirstLetter = (letter: string) =>
  letter.charAt(0).toUpperCase() + letter.slice(1);

type QuotesObject = {
  time: number;
  price: number;
};

export const calculateProfitAndTimesIndex = (
  quotesArray: Array<QuotesObject>
) => {
  let minPrice = quotesArray[0].price;
  // initialise the maxprofit by calculating the difference between the first two prices
  let maxProfit = quotesArray[1].price - quotesArray[0].price;

  // init minIndex and maxIndex for comparisons on where we last set our minPrice and maxPrice
  let minIndex = 0;
  let maxIndex = 0;

  // begin at 1, since we already have our first
  for (let i = 1, length = quotesArray.length; i < length; i++) {
    if (quotesArray[i].price - minPrice > maxProfit) {
      maxProfit = quotesArray[i].price - minPrice;
      maxIndex = i;
    }

    /* set new minPrice: if our current price is lower than our
    set minimum price of the day, then set the new minimum price
    to equal that of the current price
    NOTE: we check to eliminate the last price of day from being set, as the day is over */
    if (quotesArray[i].price < minPrice && i !== length - 1) {
      minPrice = quotesArray[i].price;
      minIndex = i;
    }
  }

  return { maxProfit, minIndex, maxIndex };
};

export const convertStringAttributesToNumber = (objToConvert: any) => {
  Object.keys(objToConvert).forEach((key) => {
    if (typeof objToConvert[key] === "object") {
      return convertStringAttributesToNumber(objToConvert[key]);
    }
    objToConvert[key] = parseFloat(objToConvert[key]);
  });
  return objToConvert;
};
