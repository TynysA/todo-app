import { NavLink } from "react-router-dom";
function MainLayout({ children }) {
  return (
    <div className="app">
      <div className="header">
        <div className="container">
          <div className="header__inner">
            <NavLink to="/" className="link__home">
              Home
            </NavLink>
          </div>
        </div>
      </div>
      <div className="container">{children}</div>
    </div>
  );
}

export default MainLayout;
