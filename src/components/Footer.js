import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <footer
        className={`footer root__container-center ${
          !this.props.loggedIn ? "footer_unvisible" : null
        }`}
      >
        <p className="footer__text">&copy; 2020 Mesto Russia</p>
      </footer>
    );
  }
}

export default Footer;
