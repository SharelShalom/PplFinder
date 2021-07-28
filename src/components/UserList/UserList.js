import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import { ArrowRightAltTwoTone } from "@material-ui/icons";

const UserList = ({ users, isLoading }) => {
  const [hoveredUserId, setHoveredUserId] = useState();

  const [selectedCountries, setSelectedCountries] = useState([]);

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const handleChange = (value) => {
    //onChange(value);

    //const newSelectedCountries = [...selectedCountries];
    //var index;

    if(!selectedCountries.includes(value)) {
      setSelectedCountries([...selectedCountries ,value]);
      //newSelectedCountries.push(value);
    }
    else {
      //index = newSelectedCountries.indexOf(value);
      //newSelectedCountries.splice(index, 1);
      setSelectedCountries(selectedCountries.filter(c => c!==value));
    }
    
  };

  const users3 = (selectedCountries.length === 0) ? users : users.filter(user => selectedCountries.includes(user.nat));

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox value="BR" label="Brazil" onChange={handleChange} isChecked={selectedCountries.includes("BR")} />
        <CheckBox value="AU" label="Australia" onChange={handleChange} isChecked={selectedCountries.includes("AU")} />
        <CheckBox value="CA" label="Canada" onChange={handleChange} isChecked={selectedCountries.includes("CA")} />
        <CheckBox value="DE" label="Germany" onChange={handleChange} isChecked={selectedCountries.includes("DE")} />
        <CheckBox value="ES" label="Spain" onChange={handleChange} isChecked={selectedCountries.includes("ES")} />
      </S.Filters>
      <S.List>
        {users3.map((user, index) => {
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
              <S.IconButtonWrapper isVisible={index === hoveredUserId}>
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
      </S.List>
    </S.UserList>
  );
};

export default UserList;
