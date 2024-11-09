// Because of webpack, CSS rules need to be imported here and not in the .html file
// import './styles.css';

// Another webpack check
if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

// ---------------------- START YOUR CODE BELOW HERE

function findPath(start, end) {
  function recPath(start, end, e = -1, p = []) {
    let edges = e + 1;
    let path = p.map((x) => x);
    path.push(start);
    if (start === end) {
      // path.push(end);
      possiblePaths.push({ Edges: edges, Path: path });
      return;
    }
    if (edges >= 63) return;
    let possibleMoves = evaluateMoves(calculateMoves(start, end));
    // console.log(possibleMoves);

    // levelOrder ausprobieren, children queuen und langsam tiefer gehen;
    // recursiv ist dann quatsch, ich brauche eine queue;
    for (let move of possibleMoves) {
      recPath(move, end, edges, path);
    }
  }
  // function calculateMoves() {} -> move definition to here
  // function evaluateMoves() {} -> move definition to here
  let possiblePaths = [];
  // console.log(start);
  // console.log(end);
  recPath(start, end);
  console.log(possiblePaths);
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

findPath([0, 0], [2, 1]);

// console.log(evaluateMoves(calculateMoves([0, 0])));
