import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { PATH_PAGE, PATH_DASHBOARD } from '../routes/paths';
import Page from '../components/Page';
import { Benefits, WatchInvestmentGrow, StepsToStart } from '../sections/@external/LandingPage';

export default function LandingPage() {
  return (
    <Page title="Future of real estate investing">
      <section className="pt-6 pt-md-11 bg-dark">
        <div className="container-lg">
          <div className="row justify-content-center" data-aos="fade-up">
            <div className="col-12 text-center text-white">
              <h6 className="text-uppercase text-warning mb-5">lemox.</h6>
              <h1 className="display-3 mb-4">Future of real estate investing</h1>
            </div>
          </div>
          <div className="row justify-content-center" data-aos="fade-up" data-aos-delay="100">
            <div className="col-md-8 col-lg-6 text-center text-white">
              <p className="fs-lg">We make it possible to own a fraction of real estate for as low as $100</p>
              <Link to={PATH_PAGE.marketplace}>
                <button type="button" className="btn btn-white">
                  Get started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="position-relative">
        <div className="shape shape-fluid-x shape-bottom text-dark pb-10 pb-lg-10">
          <div className="shape-img pb-8 pb-md-11">
            <svg viewBox="0 0 100 50" preserveAspectRatio="none">
              <path d="M0 0h100v25H75L25 50H0z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
      <section className="pt-5 pt-md-5">
        <div className="container-lg">
          <div className="row mx-n4 mb-9 mb-md-10">
            <div className="col-3 px-4 d-none d-md-block">
              <div className="position-relative mt-8">
                <div className="position-absolute top-end text-primary-light mt-n10 mt-lg-n8 me-n12 me-lg-n6">
                  <svg width="185" height="186" viewBox="0 0 185 186" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="2" cy="2" r="2" fill="currentColor" />
                    <circle cx="22" cy="2" r="2" fill="currentColor" />
                    <circle cx="42" cy="2" r="2" fill="currentColor" />
                    <circle cx="62" cy="2" r="2" fill="currentColor" />
                    <circle cx="82" cy="2" r="2" fill="currentColor" />
                    <circle cx="102" cy="2" r="2" fill="currentColor" />
                    <circle cx="122" cy="2" r="2" fill="currentColor" />
                    <circle cx="142" cy="2" r="2" fill="currentColor" />
                    <circle cx="162" cy="2" r="2" fill="currentColor" />
                    <circle cx="182" cy="2" r="2" fill="currentColor" />
                    <circle cx="2" cy="22" r="2" fill="currentColor" />
                    <circle cx="22" cy="22" r="2" fill="currentColor" />
                    <circle cx="42" cy="22" r="2" fill="currentColor" />
                    <circle cx="62" cy="22" r="2" fill="currentColor" />
                    <circle cx="82" cy="22" r="2" fill="currentColor" />
                    <circle cx="102" cy="22" r="2" fill="currentColor" />
                    <circle cx="122" cy="22" r="2" fill="currentColor" />
                    <circle cx="142" cy="22" r="2" fill="currentColor" />
                    <circle cx="162" cy="22" r="2" fill="currentColor" />
                    <circle cx="182" cy="22" r="2" fill="currentColor" />
                    <circle cx="2" cy="42" r="2" fill="currentColor" />
                    <circle cx="22" cy="42" r="2" fill="currentColor" />
                    <circle cx="42" cy="42" r="2" fill="currentColor" />
                    <circle cx="62" cy="42" r="2" fill="currentColor" />
                    <circle cx="82" cy="42" r="2" fill="currentColor" />
                    <circle cx="102" cy="42" r="2" fill="currentColor" />
                    <circle cx="122" cy="42" r="2" fill="currentColor" />
                    <circle cx="142" cy="42" r="2" fill="currentColor" />
                    <circle cx="162" cy="42" r="2" fill="currentColor" />
                    <circle cx="182" cy="42" r="2" fill="currentColor" />
                    <circle cx="2" cy="62" r="2" fill="currentColor" />
                    <circle cx="22" cy="62" r="2" fill="currentColor" />
                    <circle cx="42" cy="62" r="2" fill="currentColor" />
                    <circle cx="62" cy="62" r="2" fill="currentColor" />
                    <circle cx="82" cy="62" r="2" fill="currentColor" />
                    <circle cx="102" cy="62" r="2" fill="currentColor" />
                    <circle cx="122" cy="62" r="2" fill="currentColor" />
                    <circle cx="142" cy="62" r="2" fill="currentColor" />
                    <circle cx="162" cy="62" r="2" fill="currentColor" />
                    <circle cx="182" cy="62" r="2" fill="currentColor" />
                    <circle cx="2" cy="82" r="2" fill="currentColor" />
                    <circle cx="22" cy="82" r="2" fill="currentColor" />
                    <circle cx="42" cy="82" r="2" fill="currentColor" />
                    <circle cx="62" cy="82" r="2" fill="currentColor" />
                    <circle cx="82" cy="82" r="2" fill="currentColor" />
                    <circle cx="102" cy="82" r="2" fill="currentColor" />
                    <circle cx="122" cy="82" r="2" fill="currentColor" />
                    <circle cx="142" cy="82" r="2" fill="currentColor" />
                    <circle cx="162" cy="82" r="2" fill="currentColor" />
                    <circle cx="182" cy="82" r="2" fill="currentColor" />
                    <circle cx="2" cy="102" r="2" fill="currentColor" />
                    <circle cx="22" cy="102" r="2" fill="currentColor" />
                    <circle cx="42" cy="102" r="2" fill="currentColor" />
                    <circle cx="62" cy="102" r="2" fill="currentColor" />
                    <circle cx="82" cy="102" r="2" fill="currentColor" />
                    <circle cx="102" cy="102" r="2" fill="currentColor" />
                    <circle cx="122" cy="102" r="2" fill="currentColor" />
                    <circle cx="142" cy="102" r="2" fill="currentColor" />
                    <circle cx="162" cy="102" r="2" fill="currentColor" />
                    <circle cx="182" cy="102" r="2" fill="currentColor" />
                    <circle cx="2" cy="122" r="2" fill="currentColor" />
                    <circle cx="22" cy="122" r="2" fill="currentColor" />
                    <circle cx="42" cy="122" r="2" fill="currentColor" />
                    <circle cx="62" cy="122" r="2" fill="currentColor" />
                    <circle cx="82" cy="122" r="2" fill="currentColor" />
                    <circle cx="102" cy="122" r="2" fill="currentColor" />
                    <circle cx="122" cy="122" r="2" fill="currentColor" />
                    <circle cx="142" cy="122" r="2" fill="currentColor" />
                    <circle cx="162" cy="122" r="2" fill="currentColor" />
                    <circle cx="182" cy="122" r="2" fill="currentColor" />
                    <circle cx="2" cy="142" r="2" fill="currentColor" />
                    <circle cx="22" cy="142" r="2" fill="currentColor" />
                    <circle cx="42" cy="142" r="2" fill="currentColor" />
                    <circle cx="62" cy="142" r="2" fill="currentColor" />
                    <circle cx="82" cy="142" r="2" fill="currentColor" />
                    <circle cx="102" cy="142" r="2" fill="currentColor" />
                    <circle cx="122" cy="142" r="2" fill="currentColor" />
                    <circle cx="142" cy="142" r="2" fill="currentColor" />
                    <circle cx="162" cy="142" r="2" fill="currentColor" />
                    <circle cx="182" cy="142" r="2" fill="currentColor" />
                    <circle cx="2" cy="162" r="2" fill="currentColor" />
                    <circle cx="22" cy="162" r="2" fill="currentColor" />
                    <circle cx="42" cy="162" r="2" fill="currentColor" />
                    <circle cx="62" cy="162" r="2" fill="currentColor" />
                    <circle cx="82" cy="162" r="2" fill="currentColor" />
                    <circle cx="102" cy="162" r="2" fill="currentColor" />
                    <circle cx="122" cy="162" r="2" fill="currentColor" />
                    <circle cx="142" cy="162" r="2" fill="currentColor" />
                    <circle cx="162" cy="162" r="2" fill="currentColor" />
                    <circle cx="182" cy="162" r="2" fill="currentColor" />
                    <circle cx="2" cy="182" r="2" fill="currentColor" />
                    <circle cx="22" cy="182" r="2" fill="currentColor" />
                    <circle cx="42" cy="182" r="2" fill="currentColor" />
                    <circle cx="62" cy="182" r="2" fill="currentColor" />
                    <circle cx="82" cy="182" r="2" fill="currentColor" />
                    <circle cx="102" cy="182" r="2" fill="currentColor" />
                    <circle cx="122" cy="182" r="2" fill="currentColor" />
                    <circle cx="142" cy="182" r="2" fill="currentColor" />
                    <circle cx="162" cy="182" r="2" fill="currentColor" />
                    <circle cx="182" cy="182" r="2" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-8 pt-md-8 pb-11 pb-md-13">
        <div className="container-lg">
          <div className="row align-items-center justify-content-between">
            <div className="col-md-5 col-lg-6 order-md-1">
              <div className="position-relative mb-10 mb-md-0">
                <div className="rounded-top-start rounded-bottom-end shadow-img">
                  <img
                    className="position-relative img-fluid rounded-top-start rounded-bottom-end shadow-lg"
                    src="/static/images/house.png"
                    alt="..."
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-5 order-md-0">
              <h2 className="display-4 mb-4">How you get paid</h2>

              <p>
                Our mission is to make it as easy as possible for anyone in the world to diversify into real estate
                investing.
              </p>
              <ul>
                <li className="list-item active">
                  <div className="svgs-wrapper">
                    <span>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="9.5" stroke="#1b1642" />
                        <circle cx="10" cy="10" r="5" fill="#1b1642" />
                      </svg>
                    </span>
                    <svg width="1" height="35" viewBox="0 0 1 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect
                        x="0.25"
                        y="0.25"
                        width="0.5"
                        height="169.5"
                        stroke="#1b1642"
                        strokeWidth="0.5"
                        strokeDasharray="4 4"
                      />
                    </svg>
                  </div>
                  <div className="text-content">
                    <p>Tenant Pays rent to the management</p>
                  </div>
                </li>
                <li className="list-item inactive">
                  <div className="svgs-wrapper">
                    <span>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="9.5" stroke="#1b1642" />
                        <circle cx="10" cy="10" r="5" fill="#1b1642" />
                      </svg>
                    </span>
                    <svg width="1" height="35" viewBox="0 0 1 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect
                        x="0.25"
                        y="0.25"
                        width="0.5"
                        height="169.5"
                        stroke="#1b1642"
                        strokeWidth="0.5"
                        strokeDasharray="4 4"
                      />
                    </svg>
                  </div>
                  <div className="text-content">
                    <p>Management sends token to Lemox.</p>
                  </div>
                </li>
                <li className="list-item inactive">
                  <div className="svgs-wrapper">
                    <span>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="9.5" stroke="#1b1642" />
                        <circle cx="10" cy="10" r="5" fill="#1b1642" />
                      </svg>
                    </span>
                    <svg width="1" height="35" viewBox="0 0 1 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect
                        x="0.25"
                        y="0.25"
                        width="0.5"
                        height="169.5"
                        stroke="#1b1642"
                        strokeWidth="0.5"
                        strokeDasharray="4 4"
                      />
                    </svg>
                  </div>
                  <div className="text-content">
                    <p>Lemox send payment directly to investors' dashboard.</p>
                  </div>
                </li>
                <li className="list-item inactive">
                  <div className="svgs-wrapper">
                    <span>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="9.5" stroke="#1b1642" />
                        <circle cx="10" cy="10" r="5" fill="#1b1642" />
                      </svg>
                    </span>
                  </div>
                  <div className="text-content">
                    <p>Investor withdraws to crypto wallet.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div className="position-relative">
        <div className="shape shape-fluid-x shape-top text-white">
          <div className="shape-img pb-8">
            <svg viewBox="0 0 100 50" preserveAspectRatio="none">
              <path d="M0 25h25L75 0h25v50H0z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
      <StepsToStart />
      <WatchInvestmentGrow />

      <section
        className="pt-10 pt-md-12 pb-11 pb-md-13"
        style={{
          backgroundImage: 'url(/static/images/stock-bottom-banner.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          color: 'white',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <h1>Trusted & Transparent</h1>
              <p>
                Lemox is fully reserved. Unlike banks, we don’t loan out your money. We publish our holdings and
                obligations in real time.
              </p>
              <Link className="btn btn-primary lift" to={PATH_DASHBOARD.user}>
                Start investing with Lemox.
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="position-relative">
        <div className="shape shape-fluid-x shape-top text-light">
          <div className="shape-img pb-8 pb-md-11">
            <svg viewBox="0 0 100 50" preserveAspectRatio="none">
              <path d="M0 25h25L75 0h25v50H0z" fill="currentColor" />
            </svg>{' '}
          </div>
        </div>
      </div>
      <Benefits />
    </Page>
  );
}
