import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Talk from 'talkjs';
import { Session, Inbox } from '@talkjs/react';
import { useAuth } from "../contexts/AuthContext" // access to auth API

function Chat() {
  const PORT = process.env.PORT || 3005;
  const url = `http://localhost:${PORT}/api/database/getUserEmail`;

  const { currentUser } = useAuth();
  const email = currentUser.email;
  const location = useLocation();
  const { sellerEmail } = location.state || {};
  

  console.log("Email: ", email);
  console.log(sellerEmail);

  console.log("Email: ", email);
  console.log("Seller Email: ", sellerEmail);
  
  const syncUser = useCallback(
    () =>
      new Talk.User({
        id: email,
        name: email.split('@')[0],
        email: email,   // for email notification when person is offline
        // photoUrl: 'https://talkjs.com/new-web/avatar-7.jpg',
        // photoUrl: 'https://talkjs.com/images/avatar-1.jpg',
        // welcomeMessage: 'Hi!',
        role: 'buyer',
      }),
    []
  );

  const syncConversation = useCallback((session) => {
    // JavaScript SDK code here
    const roomID = email + '-' + sellerEmail.sellerEmail;
    const conversation = session.getOrCreateConversation(roomID);

    const other = new Talk.User({
      id: sellerEmail,
      name: sellerEmail.split('@')[0],
      email: sellerEmail,     // for email notification when person is offline
      // photoUrl: 'undefined',
      // welcomeMessage: 'Hey, how can I help?',
      role: 'seller',
    });
    conversation.setParticipant(session.me);
    conversation.setParticipant(other);

    return conversation;
  }, []);

  return (
    <Session appId="t5jYSKwc" syncUser={syncUser}>
      <Inbox
        syncConversation={syncConversation}
        style={{ width: '100%', height: '99vh' }}
      ></Inbox>
    </Session>
  );
}

export default Chat;
