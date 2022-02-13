import http from "./http-common";
import IExchangeRatesData from "../Types/exchange.rates.type";
class ExchangeRatesService {
  getRatesForADay() {
    return http.get<Array<IExchangeRatesData>>("/exch/dailyrates");
  }
}
export default new ExchangeRatesService();
