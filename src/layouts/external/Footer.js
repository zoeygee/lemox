import { Link } from 'react-router-dom';
import { PATH_DASHBOARD, PATH_PAGE } from '../../routes/paths';
import Iconify from '../../components/Iconify';

export default function Footer() {
  const socials = [
    {
      name: 'Facebook',
      link: 'https://www.facebook.com/Lemox-101380271875067/',
      icon: 'akar-icons:facebook-fill',
    },
    {
      name: 'Telegram',
      link: 'https://t.me/+2V-pZb0MjvkwZGZk',
      icon: 'akar-icons:telegram-fill',
    },
    {
      name: 'Twitter',
      link: 'https://twitter.com/Lemox_co',
      icon: 'entypo-social:twitter-with-circle',
    },
    {
      name: 'Medium',
      link: 'https://medium.com/@lemox',
      icon: 'ant-design:medium-circle-filled',
    },
    {
      name: 'Medium',
      link: 'https://www.linkedin.com/company/lemox_co',
      icon: 'entypo-social:linkedin-with-circle',
    },
  ];
  return (
    <>
      <section className="bg-dark border-multicolor">
        <div className="container-lg">
          <div className="row align-items-center">
            <div className="col-12">
              <hr className="bg-gray-900 mt-0 mb-8" />
            </div>
            <div className="col-md">
              <h1 className="text-white mb-0">
                Ready to start your investment <span className="text-primary-light">journey?</span>
              </h1>

              <p className="text-white-60 mb-4 mb-md-0">
                Sign up now for the most accessible, flexible and safe way to invest in real estate.
              </p>
            </div>
            <div className="col-md-auto">
              <Link className="btn btn-primary lift" to={PATH_DASHBOARD.user}>
                Start investing with Lemox.
              </Link>
            </div>
            <div className="col-12">
              <hr className="bg-gray-900 mb-0 mt-8" />
            </div>
          </div>
        </div>
      </section>
      <footer className="footer py-8 pt-md-11 bg-dark">
        <div className="container-lg">
          <div className="row">
            <div className="col-6 col-md">
              <h4 className="navbar-brand text-white mb-3 mb-md-5">Lemox</h4>
            </div>
            <div className="col-6 col-md">
              <ul className="list-unstyled">
                <li className="mb-3">
                  <Link className="text-white-60" to="/">
                    Home
                  </Link>
                </li>
                <li className="mb-3">
                  <Link className="text-white-60" to={PATH_PAGE.marketplace}>
                    Marketplace
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md">
              <ul className="list-unstyled">
                <li className="mb-3">
                  <Link className="text-white-60" to={PATH_PAGE.faqs}>
                    FAQs
                  </Link>
                </li>
                <li className="mb-3">
                  <Link className="text-white-60" to={PATH_PAGE.about}>
                    About us
                  </Link>
                </li>
                <li>
                  <Link className="text-white-60" to={PATH_PAGE.contact}>
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md">
              <ul className="list-unstyled">
                <li className="mb-3">
                  <Link className="text-white-60" to={PATH_PAGE.termsOfService}>
                    Terms of service
                  </Link>
                </li>
                <li className="mb-3">
                  <Link className="text-white-60" to={PATH_PAGE.privatePlacementMemorandum}>
                    Private Placement Memorandum
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <hr className="bg-white-10 my-7" />
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col mx-auto text-center">
              <ul className="list-inline list-unstyled text-gray-600 mb-0">
                {socials.map((social, index) => (
                  <li className="list-inline-item ms-1" key={index}>
                    <a className="icon icon-sm text-reset" href={social.link} target="_blank" rel="noreferrer">
                      <Iconify icon={social.icon} sx={{ fontSize: '50px' }} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <hr className="bg-white-10 my-7" />
            </div>
          </div>
          <div className="row text-center">
            <div className="col-auto">
              <small className="text-gray-600">&copy; Lemox 2022</small>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
