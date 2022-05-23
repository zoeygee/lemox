import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AccountPopover from '../dashboard/AccountPopover';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const auth = JSON.parse(localStorage.getItem('profile'));
  const navigate = useNavigate();
  console.log(auth);
  const handleToggle = () => {
    if (open === false) setOpen(true);
    else {
      setOpen(false);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-lg">
        <a className="navbar-brand d-lg-none" href="#">
          Lemox
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={handleToggle}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={open ? 'show-navbar navbar-collapse' : 'collapse navbar-collapse'} id="navbarSupportedContent">
          <ul className="navbar-nav justify-content-end w-100">
            <li className="nav-item ">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/faqs">
                Faqs
              </Link>
            </li>
          </ul>
          <Link className="navbar-brand d-none d-lg-block px-lg-6" to="/">
            Lemox
          </Link>

          <ul className="navbar-nav justify-content-start w-100">
            <li className="nav-item ">
              <Link className="nav-link" to="/marketplace">
                Marketplace
              </Link>
            </li>
            {auth ? (
              <li className="nav-item dropdown">
                <div
                  className="nav-link dropdown-toggle"
                  id="accountDropdown"
                  role="button"
                  tabIndex={0}
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <i className="fa fa-caret-down" />
                  <AccountPopover auth={auth} />
                </div>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="accountDropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Account <i className="fa fa-caret-down" />
                </a>
                <div
                  className="dropdown-positioner"
                  style={{
                    position: 'absolute',
                    inset: '0px auto auto 0px',
                    margin: '0px',
                    transform: 'translate3d(-63px, 45px, 0px)',
                  }}
                  data-popper-placement="bottom"
                >
                  <ul className="dropdown-menu show" aria-labelledby="accountDropdown">
                    <li className="dropdown-item dropend">
                      <a
                        id="signInDropright"
                        href="{{ route('login') }}"
                        role="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Login
                      </a>
                    </li>
                    <li className="dropdown-item dropend">
                      <a
                        id="signUpDropright"
                        href="{{ route('register') }}"
                        role="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Register
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
