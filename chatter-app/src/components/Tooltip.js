import styled from 'styled-components';

const Tooltip = styled.div`
  visibility: hidden;
  background-color: var(--grey);
  color: #fff;
  text-align: center;
  padding: 5px;
  border-radius: 6px;
  position: absolute;
  z-index: 3;
  white-space: nowrap;

  &:parent:hover {
    visibility: visible;
  }
`;

export default Tooltip;