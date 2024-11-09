// Because of webpack, CSS rules need to be imported here and not in the .html file
// import './styles.css';

// Another webpack check
if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

// ---------------------- START YOUR CODE BELOW HERE

function findPath(start, end) {
  function recPath(start, end, e = 0, p = []) {
    let edges = e + 1;
    let path = p.push(start);
    if (start === end) {
      path.push(end);
      possiblePaths.push({ Edges: edges, Path: path });
      return;
    }
    let possibleMoves = calculateMoves(start, end);
    possibleMoves = evaluateMoves(start, end);

    for (let move in possibleMoves) {
      recPath(move, end, edges, path);
    }
  }
  // function calculateMoves() {}
  // function evaluateMoves() {}
  let possiblePaths = [];
  recPath(start, end);
}

function calculateMoves(start) {
  if (Array.isArray(start) === false) throw new Error('Input not an array');
  if (start.length != 2)
    throw new Error('Array needs two have exactly two coordinates');
  if (start[0] < 0 || start[0] > 7 || start[1] < 0 || start[1] > 7)
    throw new Error('Invalid coordinates');
  // coordination system: x is from left to right and the first value in the array
  // y is from down to up and the second value in the array
  let x = 0;
  let y = 1;
  return [
    [start[x] + 1, start[y] + 2],
    [start[x] + 2, start[y] + 1],
    [start[x] + 2, start[y] - 1],
    [start[x] + 1, start[y] - 2],
    [start[x] - 1, start[y] - 2],
    [start[x] - 2, start[y] - 1],
    [start[x] - 2, start[y] + 1],
    [start[x] - 1, start[y] + 2],
  ];
}
function evaluateMoves(moves) {
  let legitMoves = [];
  for (let move of moves) {
    if (move[0] < 0 || move[0] > 7 || move[1] < 0 || move[1] > 7) continue;
    else legitMoves.push(move);
  }
  return legitMoves;
}

console.log(evaluateMoves(calculateMoves([0, 0])));
