# Shot Clock
Shot Clock is a real time competitive billiards clock that sychronizes across multiple clients. A clock's creator controls the clock and scoreboard, and other clients can connect to it using a shared code.

### [Live Deployment](https://shot-clock.netlify.app/)

![alt text](https://austinaluzzi.com/assets/images/shotclock.png "Demo Clock")

# Technologies
- React
- Tailwind CSS
- Node.js
- Socket.IO

This is a single page application built in React with Tailwind for styling. Socket.IO is used to facilitate WebSockets for real-time clock functionality and synchronization.

The backend is a simple Node.js server that also integrates SocketIO. The server manages a "room" for each clock, forwards events from the controller to other room connections, and closes rooms when not active.

### [Backend Source](https://github.com/aaluzzi/shot-clock-backend)

# Installation

### Prerequisites
- **Node.js and npm**

### Steps

1. Clone this repository
    ```
    git clone https://github.com/aaluzzi/shot-clock.git
    cd shot-clock
    ```
2. Install dependencies
    ```
    npm install
    ```
3. Run the application
    ```
    npm run dev
    ```