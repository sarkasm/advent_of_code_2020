let groupSplit = /^\s*$/gm
let input = await fetch('https://adventofcode.com/2020/day/6/input').then((response) => response.text()).then((t) =>  t.split(groupSplit).map((a)=>a.trim()))

let x = input.map(form => {
  const responses = form.split(/\n+/gm);
  const answers = {};
  responses.forEach(response => response.split('').forEach((a) => answers[a] = (answers[a] || 0) + 1));
  console.log(answers);
  const yes = Object.values(answers).filter((val) => val === responses.length).length;
  return yes;
  // return allYes.reduce((acc, a) =>  acc.add(a), new Set()).size
}
)

console.log(x.reduce((sum, a) => sum + a, 0));
