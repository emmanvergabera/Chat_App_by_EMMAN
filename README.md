# Chat_App by EMMAN

- NAME: VERGABERA, LATRELL GEORGE EMMANUEL
- SECTION: BSIT2A/BSCS2A

A real-time chat app where people join with a username, see who is online, and messages show
up instantly in every open browser window.

## Features
- Real-time messaging: a message sent in one window appears in all windows.
- [Optional feature] Usernames: you must pick a name before you can chat. Empty names and names
  already in use are refused.
- Active Users list: shows everyone currently online and updates when
  someone joins or leaves.
- Each message is labelled with its sender, like "Emman: hi".

## Prerequisites
1. Node.js 18 or newer (a current LTS version is best). This also installs
   npm. Check with:
       node -v
       npm -v
2. A modern web browser (Chrome, Edge, Firefox, Safari).
3. An internet connection when you open the page, because Bootstrap 5.3.8
   and jQuery are loaded from CDNs.
4. A free port 3000 on your computer.

## Install and run
Open a terminal in this folder (the one containing package.json), then:

    npm install
    npm start

You should see "Server is listening." Then:
1. Open http://localhost:3000 in your browser.
2. Open a second window (or a different browser) at the same address.
3. Enter a different username in each window and press Join Chat.
4. Type a message and press Send Message. It appears in both windows.
5. Stop the server with Ctrl + C.

There is no build step. If you edit server.js, stop and restart the server.
If you edit index.html, just refresh the browser.

## How it works (plain version)
1. The browser loads index.html, which loads socket.io, jQuery and Bootstrap.
2. The person types a username. The page sends it to the server with the
   `New User` event. The server checks it and answers yes or no.
3. Whenever someone joins or leaves, the server sends the full list of names
   to everybody with the `Get Users` event, and each page redraws the Active
   Users box.
4. When a message is sent (`Send Message`), the server adds the sender's name
   and broadcasts it to everyone as `New Message`.
5. When someone closes their tab, the server removes their name and updates
   everyone's list.

### Events
| Event          | Direction         | Data                                      |
|----------------|-------------------|-------------------------------------------|
| New User       | browser -> server | username, plus a callback with true/false |
| Send Message   | browser -> server | the message text                          |
| New Message    | server -> browser | { msg, user }                             |
| Get Users      | server -> browser | list of usernames                         |

## Troubleshooting
- "Cannot GET /" or a blank page: make sure the server is running and you
  opened http://localhost:3000 (not the HTML file straight from your disk).
- Page has no styling or nothing works: check your internet connection, since
  Bootstrap and jQuery load from CDNs.
- "EADDRINUSE" or port already in use: another program is using port 3000.
  Close it, or change the number in `server.listen(3000)` in server.js and in
  the address you open.
- "That name is empty or already taken.": pick a different username.

## Known limits
- Usernames and the Active Users list live in server memory only. Restarting
  the server clears them.
- There are no passwords, so anyone can pick any free name.
- Messages are not saved. People who join later do not see earlier messages.

<img width="1916" height="637" alt="image" src="https://github.com/user-attachments/assets/dedc74b8-6da6-4253-a16c-59efaf313437" />
