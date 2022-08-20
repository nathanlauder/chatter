import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import {
  SearchContainer,
  SearchField,
  UserListContainer,
  UserList,
  Username,
  ProfilePic
} from './SearchComponents';
import { findUser } from '../../../../Api/Endpoints';
import { post } from '../../../../Api/Api';

const Search = () => {
  // eslint-disable-next-line no-unused-vars
  const [query, setQuery] = useState('');
  const [userList, setUserList] = useState([]);

  const handleSearch = async () => {
    const payload = {
      username: query
    };
    const data = await post(findUser, payload);
    setUserList(data);
  };

  return (
    <>
      <SearchContainer>
        <SearchField
          id="search-field"
          placeholder="Find other user..."
          value={query || ''}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
          onChange={(e) => {
            if (e.key !== 'Enter') setQuery(e.target.value);
          }}
        />
        <BiSearch id="search-icon" onClick={handleSearch} />
      </SearchContainer>
      <UserListContainer>
        {userList.length > 0 && (
          <>
            <AiOutlineClose onClick={() => { setUserList([]); setQuery(''); }} />
            <UserList>
              {userList.map((user) => (
                // eslint-disable-next-line no-underscore-dangle
                <li key={user._id}>
                  <>
                    <ProfilePic
                      src="/splinter.jpeg"
                      alt={`${user.username}'s profile`}
                    />
                    <Username>
                      {user.username}
                    </Username>
                  </>
                </li>
              ))}
            </UserList>
          </>
        )}
      </UserListContainer>
    </>
  );
};

export default Search;