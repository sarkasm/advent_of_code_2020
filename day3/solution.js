let input = await fetch('https://adventofcode.com/2020/day/3/input').then((response) => response.text()).then((t) =>  t.split(/\n+/)).then((t) => {t.pop(); return t})
let columns = input[0].length;

let findTrees = (move_x, move_y) => {
  let current_row = 0;
  let current_column = 0;
  let treeCount = 0;
  while (current_row < input.length){
    if((input[current_row].charAt(current_column  % columns)) === '#'){
      treeCount++;
    }
    current_row = current_row + move_y;
    current_column = current_column + move_x;
  }
   return treeCount
}

console.log(findTrees(3, 1));

console.log(findTrees(1, 1) * findTrees(3, 1) * findTrees(5, 1) * findTrees(7, 1) * findTrees(1, 2));
