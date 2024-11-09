function (start, end, e = 0, p = [])
  - if start = end, no update edges, puth end to path aswell return object with edges and path zu übergeordneter function, die dann
    den besten pfad evaluiert

  - calculate all possible moves from start and put to array
  - remove illegal moves from array
  - let edges = e +1
  - let path = p.push(start)

  - recursive function (new start, end, new edges, new path)


  kombis;
  1 2
  2 1
  2 -1
  1 -2
  -1 -2
  -2 -1
  -2 1
  -1 2