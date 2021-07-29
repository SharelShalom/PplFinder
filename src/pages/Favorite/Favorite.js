import React, {useContext} from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import FavoriteContext from "theme/context";
import * as S from "./style";

const Favorites = () => {
  const { users, isLoading } = usePeopleFetch();
  const {profileFavorites, setProfileFavorites} = useContext(FavoriteContext);
  
  return (
    <S.Favorite>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder - Favorites
          </Text>
        </S.Header>
        <UserList users={profileFavorites} isLoading={isLoading} />
      </S.Content>
    </S.Favorite>
  );
};

export default Favorites;
