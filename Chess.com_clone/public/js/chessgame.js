const socket = io();
socket.emit("hello");

socket.on("connection received", function(){
    console.log("This is also received");
})