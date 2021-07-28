import React from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";

const Favorite = () => {
  const { users, isLoading } = usePeopleFetch();

  return (
    <S.Favorite>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder - Favorites
          </Text>
        </S.Header>
        <UserList users={users} isLoading={isLoading} />
      </S.Content>
    </S.Favorite>
  );
};

export default Favorite;
