import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const UserList = ({ users, isLoading }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const[countries, setCountries] = useState([
      {country: "Brazil", isSelected: false},  
      {country: "Australia", isSelected: false},
      {country: "Canada", isSelected: false},
      {country: "Germany", isSelected: false},
      {country: "Spain", isSelected: false}
  ]);

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const handleChange = (nameOfCountry) => {
    //onChange(value);
    //Search the country that was changed in countris
    var index=0;
    var indexOp2;
    for(const c of countries){
      if(c.country === nameOfCountry){
        indexOp2=countries.indexOf(c);
        break;
      }
      index++;
    }

    const countries2 = [...countries];
    console.log("countries: ", countries, "countries2", countries2, countries[index]);
    countries2[index].isSelected = !countries2[index].isSelected;
    console.log("countries: ", countries, "countries2", countries2, countries[index]);
    setCountries( countries2 );
    
  };
  
  var countrySelected = false;
  const countriesNames = [];
  for(const c of countries){
    if(c.isSelected){
      countrySelected = true;
      countriesNames.push(c.country)
    }
  }
  //console.log(countriesNames);
  const users2 = countrySelected ? users.filter(user => countriesNames.includes(user.location.country)) : users;

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox value="BR" label="Brazil" onChange={handleChange} isChecked={countries[0].isSelected} />
        <CheckBox value="AU" label="Australia" onChange={handleChange} isChecked={countries[1].isSelected} />
        <CheckBox value="CA" label="Canada" onChange={handleChange} isChecked={countries[2].isSelected} />
        <CheckBox value="DE" label="Germany" onChange={handleChange} isChecked={countries[3].isSelected} />
        <CheckBox value="SP" label="Spain" onChange={handleChange} isChecked={countries[4].isSelected} />
      </S.Filters>
      <S.List>
        {users2.map((user, index) => {
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
