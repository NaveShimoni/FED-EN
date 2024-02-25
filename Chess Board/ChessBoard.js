class Chessboard extends HTMLElement {
    connectedCallback() {
        const boardSize = 8;
        let chessboardHTML = '<div class="chessboard">';

        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                const cellColor = (row + col) % 2 === 0 ? 'light' : 'dark';
                chessboardHTML += `<div class="cell ${cellColor}"></div>`;
            }
        }

        chessboardHTML += '</div>';
        this.innerHTML = chessboardHTML;
    }
}

customElements.define('chess-board', Chessboard);