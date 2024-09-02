const socket = io();
const chess = new Chess();
const boardElement = document.querySelector('.chessboard');
// socket.emit("hello");

// socket.on("connection received", function(){
//     console.log("This is also received");
// })