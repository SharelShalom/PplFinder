import React, {useState} from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "pages";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";
import Favorites from './pages/Favorite/Favorite';
import FavoriteContext from "theme/context";

const AppRouter = () => {
  const [favoriteUsers, setFavoriteUsers] = useState([]);
  const [profileFavorites, setProfileFavorites] = useState([]);

  //Infinity scroll
  
  const [numOfPage, setNumOfPage] = useState(0);
  const [isBottom, setIsBottom] = useState(false);

  return (
    <ThemeProvider>
      <FavoriteContext.Provider value = {{ favoriteUsers, setFavoriteUsers, profileFavorites, setProfileFavorites, numOfPage, setNumOfPage, isBottom, setIsBottom }}>
       <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/favorites" component={Favorites} />
        </Switch>
       </Router>
      </FavoriteContext.Provider>
    </ThemeProvider>
  );
};

export default AppRouter;
