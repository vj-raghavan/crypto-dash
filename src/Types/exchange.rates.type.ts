export default interface IExchangeRatesData {
  currency: string;
  date: string;
  quotes: Array<Quote>;
}

type Quote = {
  time: string;
  price: string;
};
