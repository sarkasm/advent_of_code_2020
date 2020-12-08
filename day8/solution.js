let groupSplit = /\n+/
let inputTextPromise = fetch('https://adventofcode.com/2020/day/8/input').then((response) => response.text());


let testText = 'nop +0\nacc +1\njmp +4\nacc +3\njmp -3\nacc -99\nacc +1\njmp -4\nacc +6'
// let inputTextPromise = Promise.resolve(testText);

let input = await inputTextPromise.then((t) => t.split(groupSplit));
console.log(input)

tracker = []
loc = 0;
acc = 0;
v = 'visited'
while(input[loc] != v){
  [command, val]=input[loc].replace('+', '').split(' ');
  input[loc] = v;
  switch(command){
    case 'nop':
      loc++;
      break;
    case 'acc':
      acc += parseInt(val);
      loc++;
      break
    case 'jmp':
      loc += parseInt(val);
      break
  }
}

console.log(acc);
