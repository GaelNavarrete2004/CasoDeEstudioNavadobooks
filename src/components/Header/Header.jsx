import Navbar from "../../components/Navbar/Navbar";
import "./Header.css";

const Header = () => {
  return (
    <div className="holder">
      <header className="header">
        <Navbar />
        <div className="header-content flex flex-c text-center">
          <div className="text-content">
            <h2 className="header-title">
              Discover Books You'll Love
            </h2>
            <p className="header-text">
              Explore tons of books, bestsellers, new releases, and classics.
            </p>
            {/* <div className="header-buttons">
              <button className="btn-primary">Shop Now</button>
              <button className="btn-secondary">Explore Categories</button>
            </div> */}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
