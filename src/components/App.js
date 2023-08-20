import Main from "../components/Main.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import React from "react";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditPopupProfile from "./EditPopupProfile.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute";
import auth from "../utils/auth.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: null,
      currentUser: {},
      cards: [],
      loggedIn: false,
      registerSuccess: false,
      pathLinkHeader: "/sign-up",
      nameLinkHeader: "Регистрация",
      email: "",
      token: "",
    };
  }

  handleEditAvatarClick = () => {
    this.setState({
      isEditAvatarPopupOpen: true,
    });
  };

  handleEditProfileClick = () => {
    this.setState({
      isEditProfilePopupOpen: true,
    });
  };

  handleAddPlaceClick = () => {
    this.setState({
      isAddPlacePopupOpen: true,
    });
  };

  closeAllPopups = () => {
    this.setState({
      isEditAvatarPopupOpen: false,
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      selectedCard: null,
    });
  };

  handleCardClick = (card) => {
    this.setState({ selectedCard: card });
  };

  componentDidMount() {
    Promise.all([api.getUserInfo(), api.getInitialsCard()])
      .then(([userInfo, cards]) => {
        this.setState({
          currentUser: userInfo,
          cards: cards,
        });
      })
      .catch((err) => console.log(err));
    if (localStorage.getItem("jwt")) {
      const token = localStorage.getItem("jwt");
      auth.getValidToken(token).then((res) => {
        this.setState({
          token: token,
          email: res.data.email,
          loggedIn: true,
        });
      }).catch(err => console.log(err));
    }
  }

  setCardsState(cards) {
    this.setState({
      cards: cards,
    });
  }

  handleCardLike = (card) => {
    const isLiked = card.info.likes.some(
      (i) => i._id === this.state.currentUser._id,
    );
    api
      .changeLikeCardStatus(card.info._id, isLiked)
      .then((newCard) => {
        const newCardArr = this.state.cards.map((c) =>
          c._id === card.info._id ? newCard : c,
        );
        this.setCardsState(newCardArr);
      })
      .catch((err) => console.log(err));
  };

  handleCardDelete = (card) => {
    api
      .deleteCard(card.info._id)
      .then((removeCard) => {
        const newCardArr = this.state.cards.filter(
          (c) => c._id !== card.info._id,
        );
        this.setCardsState(newCardArr);
      })
      .catch((err) => console.log(err));
  };

  handleUpdateUser = ({ nameNew, aboutNew }) => {
    api
      .editProfile({ nameNew, aboutNew })
      .then((userInfoNew) => {
        this.setState({
          currentUser: userInfoNew,
          isEditProfilePopupOpen: false,
        });
        return true;
      })
      .catch((err) => console.log(err));
  };

  handleUpdateAvatar = (avatarNew) => {
    api
      .editAvatar(avatarNew)
      .then((newUser) => {
        this.setState({
          currentUser: newUser,
          isEditAvatarPopupOpen: false,
        });
      })
      .catch((err) => console.log(err));
  };

  handleAddPlaceSubmit = ({ nameNew, linkNew }) => {
    api.addNewCard({ nameNew, linkNew }).then((newCard) => {
      this.setCardsState([newCard, ...this.state.cards]);
      this.setState({
        isAddPlacePopupOpen: false,
        loggedIn: false,
      }).catch((err) => console.log(err));
    });
  };

  handleAuth = ({ password, email }) => {
    auth
      .authorization({ password, email })
      .then((jwt) => {
        this.setState({
          loggedIn: true,
          email: email,
          token: jwt.token,
        });
        localStorage.setItem("jwt", jwt.token);
        return <Navigate to="/" replace />;
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loggedIn: false,
        });
      });
  };

  handleRegister = ({ password, email }) => {
    auth
      .registration({ password: password, email: email })
      .then((res) => {
        this.setState({
          registerSuccess: true,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          registerSuccess: false,
        });
      });
  };

  handleGoOut = () => {
    this.setState({
      loggedIn: false,
      email: "",
      registerSuccess: false,
    });
    localStorage.removeItem("jwt");
  };

  render() {
    return (
      <div className="page__content">
        <CurrentUserContext.Provider value={this.state.currentUser}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  path="/"
                  loggedIn={this.state.loggedIn}
                  element={Main}
                  onAddPlace={this.handleAddPlaceClick}
                  onCardClick={this.handleCardClick}
                  onEditAvatar={this.handleEditAvatarClick}
                  onEditProfile={this.handleEditProfileClick}
                  onCardLike={this.handleCardLike}
                  cards={this.state.cards}
                  onCardDelete={this.handleCardDelete}
                  email={this.state.email}
                  onGoOut={this.handleGoOut}
                />
              }
            />
            <Route
              path="/sign-in"
              element={
                <Login
                  onSubmit={this.handleAuth}
                  loggedIn={this.state.loggedIn}
                />
              }
            />
            <Route
              path="/sign-up"
              element={
                <Register
                  onSubmit={this.handleRegister}
                  success={this.state.registerSuccess}
                />
              }
            />
          </Routes>
          <Footer loggedIn={this.state.loggedIn} />
          <EditPopupProfile
            onUpdateUser={this.handleUpdateUser}
            isOpen={this.state.isEditProfilePopupOpen}
            onClose={this.closeAllPopups}
          />
          <EditAvatarPopup
            onUpdateAvatar={this.handleUpdateAvatar}
            isOpen={this.state.isEditAvatarPopupOpen}
            onClose={this.closeAllPopups}
          />
          <AddPlacePopup
            onAddPlace={this.handleAddPlaceSubmit}
            isOpen={this.state.isAddPlacePopupOpen}
            onClose={this.closeAllPopups}
          />
          <ImagePopup
            card={this.state.selectedCard}
            onClose={this.closeAllPopups}
          />
          <PopupWithForm
            title="Вы уверены?"
            onClose={this.closeAllPopups}
            name="delete-card"
            nameButton="Да"
          />
        </CurrentUserContext.Provider>
      </div>
    );
  }
}

export default App;
