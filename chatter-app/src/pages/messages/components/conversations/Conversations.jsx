import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getConversations } from '../../../../Api/Endpoints';
import { get } from '../../../../Api/Api';
import { ls } from '../../../../Api/storage';
import Tooltip from '../../../../components/Tooltip';

const Container = styled.div`
  width: 300px;
  min-width: 300px;
  border-left: 2px solid var(--grey);
  height: calc(99.5vh - 75px);
`;

const ConversationContainer = styled.button`
  border: none;
  background-color: var(--black);
`;

const Title = styled.h3`
  text-align: center;
  width: 100%;
  border-bottom: 2px solid var(--grey);
  padding: 1rem 0;
`;

const Conversations = styled.div`
  margin-top: 1rem;
`;

const ConversationTitle = styled.div`
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0.25rem;
  margin: 0 0 0.75rem 0.5rem;
  white-space: nowrap;
  max-width: 270px;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ isActiveConversation }) => (isActiveConversation ? 'border-bottom: 4px solid var(--frost); border-radius: 3px;' : 'border-bottom: 3px solid transparent;')}
  /* border-bottom: 2px solid pink; */

  ${Tooltip} {
    right: 0;
  }
  &:hover ${Tooltip} {
    visibility: visible;
    right: 0;
  }
`;

const Conversation = ({ activeConversation, setActiveConversation }) => {
  // eslint-disable-next-line no-unused-vars
  const [drawerOpen, setDrawer] = useState(true);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await get(`${getConversations}${ls.get('id')}`);
      setConversations(data);
    };
    fetchData();
  }, []);

  const titleWillOverflow = (title) => title.length > 20;

  return (
    <Container>
      <Title>My Conversations</Title>

      <Conversations>
        {conversations.map((conv) => (
          <ConversationContainer key={conv._id} onClick={() => setActiveConversation(conv)}>
            <ConversationTitle isActiveConversation={activeConversation === conv._id}>
              { conv.title }
              { titleWillOverflow(conv.title) && (
                <Tooltip>{ conv.title }</Tooltip>
              )}
            </ConversationTitle>
          </ConversationContainer>
        ))}
      </Conversations>
    </Container>
  );
};

Conversation.propTypes = {
  setActiveConversation: PropTypes.func.isRequired,
  activeConversation: PropTypes.string.isRequired
};

export default Conversation;