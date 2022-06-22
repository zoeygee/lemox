import { Typography } from '@mui/material';

export default function WatchInvestmentGrow() {
  return (
    <section className="pt-10 pt-md-12 pb-11 pb-md-13">
      <div className="container-lg">
        <div className="row align-items-center justify-content-between">
          <div className="col-md-5 order-md-1">
            <img
              className="img-fluid mb-8 mb-md-0"
              src="https://images.pexels.com/photos/4245923/pexels-photo-4245923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="..."
            />
          </div>
          <div className="col-md-7 col-lg-6 order-md-0 text-muted">
            <hr className="hr-sm bg-warning ms-0 mb-6" />

            <Typography variant="h2" className="display-4 mb-4" color="primary.main">
              Hold your Lemox Tokens and watch your investment grow over time.
            </Typography>

            <p className="text-muted">
              Watch the value of your investment grow and receive rents weekly in our ever growing real estate markets.
              Our portfolio gets valued by an independent 3rd party every 6 months.
            </p>
            <ul className="mb-0">
              <li className="mb-3">Browse our marketplace and select the best investment for you. </li>
              <li className="mb-3">
                Input amount and your Binance Smart Chain wallet address, Token will be sent to that address immediately
                payment has been received.{' '}
              </li>
              <li className="mb-3">Watch your investment grow in value over time.</li>
              <li className="mb-3">Receive percentage rent/token weekly from tenants.</li>
              <li className="mb-3">The value of your holdings will be updated in your portfolio. </li>
              <li>Take advantage of a strong and resilient market showing consistent year-on-year growth.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
