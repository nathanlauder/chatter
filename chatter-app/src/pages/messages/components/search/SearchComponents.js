import styled from 'styled-components';

const SearchContainer = styled.div`
  width: 40%;
  margin: 1rem auto;
  position: relative;
  
  svg { // search icon
    background-color: transparent;
    font-size: 25px;
    position: absolute;
    top: 10px;
    right: -20px;
    cursor: pointer;
  }
`;

const SearchField = styled.input`
  background-color: transparent;
  width: 100%;
  border-radius: 10px;
  padding: 10px 8px 10px 20px;
  border: 2px solid var(--white);
  font-size: 1rem;
  letter-spacing: 1px;

  &:focus {
    outline: none;
  }
`;

const UserListContainer = styled.div`
  position: relative;
  width: 40%;
  margin: 0 auto;
  
  svg { // x icon
    position: absolute;
    font-size: 25px;
    top: 5px;
    right: -20px;
    cursor: pointer;
    z-index: 2;
  }
`;

const UserList = styled.ul`
  width: 100%;
  list-style: none;
  overflow-y: auto;
  max-height: 200px;
  border-radius: 0 0 4px 4px;
  border: 2px solid var(--grey);
  padding: 10px 20px 5px 7px;

  ::-webkit-scrollbar {
    width: 8px;

    &-track {
      background: transparent;
    }
  }

  ::-webkit-scrollbar-thumb {
    background: var(--grey);
    border-radius: 15px;
    cursor: pointer;
  }

  li {
    margin-left: 0.5rem;
    vertical-align: middle;
    cursor: pointer;
    letter-spacing: 1px;
    &:not(:last-child) {
      margin-bottom: 0.75rem;
    }
  }
`;

const Username = styled.span`
  margin-left: 0.5rem;
`;

const ProfilePic = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  vertical-align: middle;
`;

export {
  SearchContainer,
  SearchField,
  UserListContainer,
  UserList,
  Username,
  ProfilePic
};