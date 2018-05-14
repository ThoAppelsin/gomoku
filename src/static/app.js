function game_over(winner) {
    var winbox = document.createElement('div')
    winbox.innerText = `${winner} won!`
    winbox.classList.add('winbox')

    tiles.forEach(row => row.forEach(tile => tile.classList.remove('available')))
    board.style.backgroundColor = '#AAA'

    document.body.appendChild(winbox)
}

function string_board() {
    return tiles.map(row => row.map(tile => tile.state).join('')).join('\n')
}

function make_move(r, c) {
    tiles[r][c].classList.remove('available')
    tiles[r][c].classList.add('x')
    tiles[r][c].state = 'x'

    fetch('/', {
        body: JSON.stringify({ board: string_board() }),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        method: 'POST'
    })
    .then(res => res.json())
    .then(data => {
        tiles[data.r][data.c].classList.remove('available')
        tiles[data.r][data.c].classList.add('o')
        tiles[data.r][data.c].state = 'o'

        if (data.winner) {
            game_over(data.winner)
        }
    })
}

function prepare_board(m, n, k) {
    board = document.createElement('div')
    tiles = []

    for (let i = 0; i < m; i++) {
        var row = []
        for (let j = 0; j < n; j++) {
            var tile = document.createElement('div')
            tile.classList.add('tile')
            tile.classList.add('available')
            tile.state = '.'
            tile.onclick = (evt) => {
                make_move(i, j)
            }

            tile.appendChild(document.createElement('div'))

            row.push(tile)
            board.appendChild(tile)
        }
        tiles.push(row)
    }

    board.classList.add('board')

    board.style.gridColumnGap = board.style.gridRowGap = `${(7 / n).toFixed(2)}vw`;
    board.style.gridTemplateRows = `repeat(${m}, auto)`
    board.style.gridTemplateColumns = `repeat(${n}, 1fr)`

    document.body.appendChild(board)
}

prepare_board(15, 15, 5)
