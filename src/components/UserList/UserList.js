import React, { useEffect, useState, useContext } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import FavoriteContext from "theme/context";
import SearchBox from "components/SearchBox/searchBox";
import InfiniteScroll from 'react-infinite-scroll-component';


const UserList = ({ users, isLoading, onLoadMore }) => {

  const [hoveredUserId, setHoveredUserId] = useState();

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCountries, setSelectedCountries] = useState([]);

  const { profileFavorites, setProfileFavorites } = useContext(FavoriteContext);




  useEffect(() => {
    const savedFavoriteUsers = JSON.parse(localStorage.getItem("profileFavorites"));
    if (savedFavoriteUsers)
      setProfileFavorites(savedFavoriteUsers);
  }, []);

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const handleChange = (value) => {

    if (!selectedCountries.includes(value)) {
      setSelectedCountries([...selectedCountries, value]);
    }
    else {
      setSelectedCountries(selectedCountries.filter(c => c !== value));
    }
  };

  const handleSearch = query => {
    setSearchQuery(query);
  };


  const handleHeart = (user) => {
    const profileFavoritesLocalStorage = [...profileFavorites];

    var index;
    if (!profileFavorites.includes(user)) {
      setProfileFavorites([...profileFavorites, user])
      profileFavoritesLocalStorage.push(user);
    }
    else {
      setProfileFavorites(profileFavorites.filter(fuser => fuser !== user));
      index = profileFavoritesLocalStorage.indexOf(user);
      profileFavoritesLocalStorage.splice(index, 1);
    }
    localStorage.setItem("profileFavorites", JSON.stringify(profileFavoritesLocalStorage));
  };

  let filtered = (selectedCountries.length === 0) ? users : users.filter(user => selectedCountries.includes(user.nat));

  if (searchQuery)
    filtered = filtered.filter(u =>
      (u.name.first.toLowerCase().startsWith(searchQuery.toLowerCase())) ||
      (u.name.last.toLowerCase().startsWith(searchQuery.toLowerCase()))
    );

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox value="BR" label="Brazil" onChange={handleChange} isChecked={selectedCountries.includes("BR")} />
        <CheckBox value="AU" label="Australia" onChange={handleChange} isChecked={selectedCountries.includes("AU")} />
        <CheckBox value="CA" label="Canada" onChange={handleChange} isChecked={selectedCountries.includes("CA")} />
        <CheckBox value="DE" label="Germany" onChange={handleChange} isChecked={selectedCountries.includes("DE")} />
        <CheckBox value="ES" label="Spain" onChange={handleChange} isChecked={selectedCountries.includes("ES")} />
      </S.Filters>
      <SearchBox value={searchQuery} onChange={handleSearch} />
      <S.List id="scrollableDiv">
        <InfiniteScroll
          dataLength={filtered.length} //This is important field to render the next data
          next={onLoadMore}
          hasMore={true}
          scrollableTarget={"scrollableDiv"}
        >
          {filtered.map((user, index) => {
            return (
              <S.User
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <S.UserPicture src={user?.picture.large} alt="" />
                <S.UserInfo>
                  <Text size="22px" bold>
                    {user?.name.title} {user?.name.first} {user?.name.last}
                  </Text>
                  <Text size="14px">{user?.email}</Text>
                  <Text size="14px">
                    {user?.location.street.number} {user?.location.street.name}
                  </Text>
                  <Text size="14px">
                    {user?.location.city} {user?.location.country}
                  </Text>
                </S.UserInfo>
                <S.IconButtonWrapper isVisible={index === hoveredUserId || profileFavorites.includes(user)} onClick={() => handleHeart(user)}>
                  <IconButton>
                    <FavoriteIcon color="error" />
                  </IconButton>
                </S.IconButtonWrapper>
              </S.User>
            );
          })}

          {isLoading && (
            <S.SpinnerWrapper>
              <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
            </S.SpinnerWrapper>
          )}
        </InfiniteScroll>
      </S.List>
    </S.UserList>
  );
};

export default UserList;