import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getConversations } from '../../../../Api/Endpoints';
import { get } from '../../../../Api/Api';
import { ls } from '../../../../Api/storage';

const Container = styled.div`
  position: relative;
`;

const ConversationContainer = styled.div`
  border-left: 2px solid var(--grey);
  position: absolute;
  top: 0;
  right: 0;
  width: 30%;
`;

const Title = styled.h3`
  text-align: center;
  border-bottom: 1px solid var(--white);
  padding: 1rem 0;
`;

const Conversations = styled.div`
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

  return (
    <Container>
      <ConversationContainer>
        <Title>My Conversations</Title>

        <Conversations>
          {conversations.map((conv) => (
            // eslint-disable
            <div key={conv._id}>{ conv.title }</div>
          ))}
        </Conversations>
      </ConversationContainer>
    </Container>
  );
};

export default Conversation;