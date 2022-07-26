import styled from 'styled-components';

const Link = styled.a`
  background-color: transparent;
  color: ${({ color }) => color || 'inherit'};
  text-decoration: none;
  font-weight: ${({ bold }) => (bold ? '700' : 500)};
`;

export default Link;