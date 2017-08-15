<img src="https://cdn.rawgit.com/dgrcode/chat-back/master/cathat.svg" width="300px">


# CAHAT
A distributed chat service

This is the main repository of this project. There is a realtime demo [here](https://dgrcode.github.io/cahat/). In the demo the back end is mocked so it can be hosted and served from Github.

For the demo there are a few features that are not available, as it is mainly a front end demo. You cannot:
 - Add new server.
 - Change your name –nobody would see it anyways ¯\\\_(ツ)\_/¯–.

There are two other repositories with the code of the [front end](https://github.com/dgrcode/chat-front) and the [back end](https://github.com/dgrcode/chat-back).


## How it works
### Two applications
#### Front end
There is a front end application built with React, Redux and bundled with Webpack. This application can connect to different servers –we'll get there in a second–, and it is in charge of displaying stuff.

One client –front end app– is one _chat user_ in the chat.

#### Back end
There is also a back end application, which is just a WebSocket server, built with node and [ws](https://github.com/websockets/ws). The back end is in charge of storing user names, user ids, and messages. The information is persisted in a MongoDB database.

One server –back end app– is a _chat group_, or _chat room_, in the chat.

### Relation between applications
One client can be connected to multiple servers, and one server can be connected to multiple clients. There is a many to many relation between them.

Given the front end architecture, it made sense for me to make both apps communicate through Redux actions. The idea is that, if I need to send information from the server to the client, I generate an action on the server, send it to the client through the WebSocket connection, and it gets immediately dispatched in the client Redux store.

The difference when the communication goes in the other direction is that the server doesn't have a Redux store nor a reducer. I thought that due to the asynchronous nature of the back end –database, communications, etc.–, creating _pure functions_ to handle changes in state was a big overhead. Instead of that approach, I use a simple `switch` block to handle each type of action received from the front end. It is the same idea of a reducer used in Redux, but in my case I don't try to keep a state in the back end.


## How to use it
Due to lack of security implementation –[see disclaimer](#no_entry-disclaimer)– the front end must be served from localhost, otherwise the https connection will refuse any insecure WebSocket connection.

This is something that I have on the [pending features list](#work-in-progress), that I didn't finish during RC because I found other projects that would allow me to learn more.

### Back end
To see how to use the front end, please read the [instruction on the front end repo](https://github.com/dgrcode/chat-front).

### Front end
To see how to use the back end, please read the [instruction on the back end repo](https://github.com/dgrcode/chat-back).


## :no_entry: Disclaimer

This project don't implement any security measure. Therefore, **any data transmitted through this chat service could be compromised**


## Motivation

This project was done during my batch at the [Recurse Center](https://www.recurse.com). My main goal for doing this project was to learn about:
 - [x] React
 - [x] Redux
 - [x] MongoDB
 - [x] WebSockets
 - [x] Node
 - [ ] Progressive Web Apps
 - [ ] React Native
 - [ ] WebRTC

## Work In Progress

So far this project implements the core functionalities of a chat, but eventually I'd like to add new features as:

##### Security
 - [ ] Implement a secure WebSocket server
 - [ ] Encrypt the stored data

##### Features
 - [ ] Remember user connections
 - [ ] Give custom name to another person
 - [ ] List of connected users
 - [ ] Private messaging between users
 - [ ] Video chat using WebRTC
 - [ ] New messages indicator
 - [ ] Remove connection
 - [ ] Emoji support :+1:
