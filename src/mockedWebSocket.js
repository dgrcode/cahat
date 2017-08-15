'use strict';

import md from 'markdown';
import baconipsum from './mockedMessages';

const markdown = md.markdown;

const createMessage = (rawMessage, date, userId) => ({
  rawMessage,
  htmlMessage: markdown.toHTML(rawMessage),
  timestamp: new Date(date).getTime(),
  userId
});

const initialMessages = [
  createMessage('This is a message in a mocked server', 1502699195143, 'uid0'),
  createMessage('Every 15 seconds –*or less*– a message from a random user will be ' +
    '*received*. **This is all mocked!**', 1502699198143, 'uid0'),
  createMessage('## Enjoy the demo! :)', 1502699205143, 'uid0')
];

const validUserNames = ['Mickey Mouse', 'Bugs Bunny', 'Felix the Cat',
  'Scooby-Doo', 'Jerry Mouse', 'Tom Cat', 'Silvester', 'Winnie the Pooh',
  'Pluto', 'Goofy', 'Bambi', 'Bagheera', 'Baloo', 'Daisy Duck', 'Piglet',
  'Dory', 'Scar', 'Mufasa', 'Shere Khan', 'Snoopy', 'Garfield', 'Donkey Kong',
  'Simba', 'Mojo Jojo', 'Tasmanian Devil', 'Nala', 'SpongeBob', 'Mr. Krabs',
  'Cheewacca', 'Timon', 'Pombaa', 'Road Runner', 'Zazu', 'Sebastian', 'Rudolph',
  'Snowball', 'Brian Griffin', 'Littlefoot', 'Crash Bandicoot', 'Spyro',
  'Woody Woodpecker', 'Sonic'];

export default function MockedWebSocket (wsAddress, serverName) {
  this.onmessage = function (arg) {
    console.log('called mocked onmessage:', arg);
  };

  this.onopen = function (arg) {
    console.log('called mocked onopen:', arg);
  };

  // Mocked event
  const generateWsEvent = wsMessage => ({
    target: this,
    data: wsMessage
  });

  // Mocked information from the db
  const userNames = { uid0: 'Daniel' };
  for (let i = 1; i < 10; i++) {
    userNames['uid' + i] = validUserNames[Math.floor(Math.random() * validUserNames.length)];
  }

  // Mocked `send` and `broadcast` to avoid changing most of the server code here
  const broadcast = (message) => setTimeout(() =>
    this.onmessage(generateWsEvent(JSON.stringify(message))), 100);
  const send = (message) => setTimeout(() =>
    this.onmessage(generateWsEvent(message)), 100);

  const getRandomUserId = () => {
    const inUseUserNames = Object.keys(userNames);
    return inUseUserNames[Math.floor(Math.random() * (inUseUserNames.length - 1)) + 1];
  };

  window.gruid = getRandomUserId;

  const sendRandomMessage = () => {
    console.log('Sends a new message from', wsAddress);
    send(JSON.stringify({
      type: "MESSAGE",
      payload: {
        htmlMessage: markdown.toHTML(baconipsum[Math.floor(Math.random() * baconipsum.length)]),
        userId: getRandomUserId(),
        timestamp: new Date().getTime()
      }
    }));
  };

  this.mock = () => {
    // Set interval to simulate a conversation
    const msgAtRandomInterval = () => {
      sendRandomMessage();
      setTimeout(msgAtRandomInterval, Math.random() * 15000);
    };
    setTimeout(msgAtRandomInterval, 10000);

    /*
    Initialize the Mocked Web Socket. It is equivalent at `.onopen` from the
    server.
    Methods `this.onopen` and `this.onmessage` are defined in the client and
    therefore can be called here
    */
    console.log('sends handshake');
    const handshake = {
      type: 'HANDSHAKE',
      payload: {
        serverName,
        messages: initialMessages,
        userNames
      }
    };

    send(JSON.stringify(handshake));
  };

  /*
  This function handles sent messages from the front end. It is equivalent to
  the `onmessage` of the back end
  */
  this.send = function (data) {
    console.log('send!');
    data = JSON.parse(data);

    switch (data.type) {
    case 'HANDSHAKE_USER_INFO':
      // Disabled user persistance in the demo. User is reset in any new session
      const userId = 'userDemoId';
      const name = 'Anonymous';
      let wsAction = {
        type: 'NAME_CHANGE',
        payload: {
          userId,
          name,
          idNamePair: { [userId]: 'Anonymous' }
        }
      };
      broadcast(wsAction);
      wsAction = {
        type: 'USER_INFO',
        payload: {
          userId,
          name
        }
      };
      send(JSON.stringify(wsAction));
      broadcast({
        type: 'USER_CONNECTED',
        payload: {
          userId
        }
      });
      break;

    case 'NAME_CHANGE':
      userNames[data.payload.userId] = data.payload.name;
      wsAction = {
        type: 'NAME_CHANGE',
        payload: {
          userId: data.payload.userId,
          name: data.payload.name,
          idNamePair: { [data.payload.userId]: data.payload.name }
        }
      };
      broadcast(wsAction);
      break;

    case 'MESSAGE':
      const wsMessage = {
        type: "MESSAGE",
        payload: {
          htmlMessage: markdown.toHTML(data.payload.rawMessage),
          userId: data.payload.userId,
          timestamp: new Date().getTime()
        }
      };
      broadcast(wsMessage);
      break;

    default:
      // do nothing

    }
  };
}
