// Because of webpack, CSS rules need to be imported here and not in the .html file
// import './styles.css';

// Another webpack check
if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

// ---------------------- START YOUR CODE BELOW HERE

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

function findPath(start, end) {
  if (
    start[0] < 0 ||
    start[0] > 7 ||
    start[1] < 0 ||
    start[1] > 7 ||
    end[0] < 0 ||
    end[0] > 7 ||
    end[1] < 0 ||
    end[1] > 7
  )
    throw new Error('Invalid coordinates!');

  if (start === end) {
    console.log('You are already there! No moves necessary!');
    return;
  }

  let possibleSolutions = [];
  let currentlyShortestFoundSolution = null;

  let queueIndex = 0;
  let queue = [{ start: start, edges: 0, pathUntilHere: [] }];
  let whileLoops = 0;

  let possibleMoves = [];

  while (queueIndex < queue.length) {
    // whileLoops = whileLoops + 1;
    // if (whileLoops >= 63) {
    //   console.log("Couldn't find a solution! Terminated after 63 loops.");
    //   return;
    // }

    // skip loops where edges are higher than the ones of already found solutions
    if (
      currentlyShortestFoundSolution != null &&
      queue[queueIndex]['edges'] >= currentlyShortestFoundSolution
    ) {
      queueIndex = queueIndex + 1;
      continue;
    }

    // start position of current queue item matches with end -> log
    if (equalsCheck(queue[queueIndex]['start'], end)) {
      // add end to the path
      queue[queueIndex]['pathUntilHere'].push(end);

      // push path to solutions array
      possibleSolutions.push(queue[queueIndex]);

      // update shortest found solution
      if (
        currentlyShortestFoundSolution === null ||
        currentlyShortestFoundSolution > queue[queueIndex]['edges']
      ) {
        currentlyShortestFoundSolution = queue[queueIndex]['edges'];
      }
    }

    // calculate all possible moves, save to array
    possibleMoves = evaluateMoves(
      calculateMoves(queue[queueIndex]['start'], end),
    );

    // make shallow copy ob previous path and push recent move to it
    let path = queue[queueIndex]['pathUntilHere'].map((x) => x);
    path.push(queue[queueIndex]['start']);

    // increase edges by one
    let edges = queue[queueIndex]['edges'] + 1;

    // for each move, push a new object into the queue with the updated path and edges
    for (let move of possibleMoves) {
      queue.push({ start: move, edges: edges, pathUntilHere: path });
    }

    // move one forward in the queue
    queueIndex = queueIndex + 1;
  }
  console.log(possibleSolutions);
  console.log(currentlyShortestFoundSolution);
}

const equalsCheck = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

findPath([0, 0], [7, 7]);
