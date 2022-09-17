import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getConversations } from '../../../../Api/Endpoints';
import { get } from '../../../../Api/Api';
import { ls } from '../../../../Api/storage';
import Tooltip from '../../../../components/Tooltip';

const Container = styled.div`
  width: 300px;
  min-width: 300px;
`;

const ConversationContainer = styled.div`
  border-left: 2px solid var(--grey);
  height: 100vh;
`;

const Title = styled.h3`
  text-align: center;
  width: 100%;
  border-bottom: 1px solid var(--white);
  padding: 1rem 0;
`;

const Conversations = styled.div`
`;

const ConversationTitle = styled.div`
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0.5rem;
  white-space: nowrap;
  max-width: 270px;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover ${Tooltip} {
    visibility: visible;
    right: 0;
  }
`;

const Conversation = () => {
  // eslint-disable-next-line no-unused-vars
  const [drawerOpen, setDrawer] = useState(true);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await get(`${getConversations}${ls.get('id')}`);
      console.log(data);
      setConversations(data);
    };
    fetchData();
  }, []);

  const titleWillOverflow = (title) => title.length > 20;

  return (
    <Container>
      <ConversationContainer>
        <Title>My Conversations</Title>

        <Conversations>
          {conversations.map((conv) => (
            <ConversationTitle key={conv._id}>
              { conv.title }
              { titleWillOverflow(conv.title) && (
                <Tooltip>{ conv.title }</Tooltip>
              )}
            </ConversationTitle>
          ))}
        </Conversations>
      </ConversationContainer>
    </Container>
  );
};

export default Conversation;