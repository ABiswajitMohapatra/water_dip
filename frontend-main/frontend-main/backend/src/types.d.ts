export interface Booking {
  arrival_date_year: string;
  arrival_date_month: string;
  arrival_date_day_of_month: string;
  adults: string;
  children: string;
  babies: string;
  country: string;
}

interface Request<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query
> extends core.Request<P, ResBody, ReqBody, ReqQuery> {
  query: { startDate: any; endDate: any };
}

interface Response<ResBody = any> extends core.Response<ResBody> {}
