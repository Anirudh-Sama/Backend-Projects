const socket = io();
const chess = new Chess();
const boardElement = document.querySelector('.chessboard');
// socket.emit("hello");

// socket.on("connection received", function(){
//     console.log("This is also received");
// })

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = "";
    board.forEach((row, rowIndex) => {
        row.forEach((square, squareIndex) => {
            const squareElement = document.createElement("div");
            squareElement.classList.add(square, 
                (rowIndex + squareIndex) % 2 === 0 ? "light" : "dark"
            );
            squareElement.dataset.row = rowIndex;
            squareElement.dataset.col = squareIndex;

            if(square){
                const pieceElement = document.createElement("div");
                pieceElement.classList.add("piece", square.color === "w" ? "white" : "black");
                pieceElement.innerText = "";
                pieceElement.draggable = playerRole === square.color;
                pieceElement.addEventListener("dragStart", (e) => {
                    if(pieceElement.draggable0){
                        draggedPiece = pieceElement;
                        sourceSquare = {row: rowIndex, col: squareIndex};
                        e.dataTransfer.setData("text/plain", "");
                    }
                });
                pieceElement.addEventListener("dragend", (e) => {
                    draggedPiece = null;
                    sourceSquare = null;
                })

                squareElement.appendChild(pieceElement);
            }

            squareElement.addEventListener('dragover', function(e){
                e.preventDefault();
            })

            squareElement.addEventListener("drop", function(e){
                e.preventDefault();
                if(draggedPiece){
                    const targetSource = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col)
                    };

                    handleMove(sourceSquare, targetSource);
                }
            })

            boardElement.appendChild(squareElement);
        });
    });
};

const handleMove = () => {};

const getpieceUnicode = (piece) => {
    const unicodePieces = {
        K: "♔",
    };
    return unicodePieces[piece.type] || "";
};

renderBoard();