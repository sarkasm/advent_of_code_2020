

let groupSplit = /^\s*$/gm
let input = await fetch('https://adventofcode.com/2020/day/6/input').then((response) => response.text()).then((t) =>  t.split(groupSplit).map((a)=>a.trim()))

let solution1 = input.map(form => 
  form.replace(/\n+/gm, '').split('').reduce((acc, a) =>  acc.add(a), new Set()).size
)


let solution2 = input.map(form => {
  const responses = form.split(/\n+/gm);
  const answers = {};
  responses.forEach(response => response.split('').forEach((a) => answers[a] = (answers[a] || 0) + 1));
  return Object.values(answers).filter((val) => val === responses.length).length;
}
)

console.log(`Solution 1: ${solution1.reduce((sum, a) => sum + a, 0)}`);
console.log(`Solution 2: ${solution2.reduce((sum, a) => sum + a, 0)}`);
