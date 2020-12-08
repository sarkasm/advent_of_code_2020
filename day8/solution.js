let groupSplit = /\n+/
let inputTextPromise = fetch('https://adventofcode.com/2020/day/8/input').then((response) => response.text());


//let testText = 'nop +0\nacc +1\njmp +4\nacc +3\njmp -3\nacc -99\nacc +1\njmp -4\nacc +6'
// let testText = 'nop +0\nacc +1\nnop +3\nacc +1\njmp -4\nnop +1'
// let inputTextPromise = Promise.resolve(testText);

let input = await inputTextPromise.then((t) => t.split(groupSplit));
// console.log(input)


runProgram = (proginput) => {
  tracker = []
  loc = 0;
  acc = 0;
  v = 'visited'  
  // console.log(`ProgInput: ${proginput}`)
  while(tracker[loc] != v && loc < proginput.length){
    [command, val]=proginput[loc].replace('+', '').split(' ');
    tracker[loc] = v;
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

  loop = (loc < proginput.length)

  return {
    loop,
    acc
  }
}



// solution1 = runProgram([...input]);
// console.log(`Solution 1 : ${solution1.acc} looped: ${solution1.loop}`)



// Find all the changable commands 
changeable = ['jmp', 'nop'];
options = []
input.forEach((val, idx) => {
  changeable.includes(val.split(' ')[0]) ? options.push(idx) : undefined
})

escaped = false;
swaps = {
  'jmp': 'nop',
  'nop': 'jmp',
  'acc': 'acc',
}

lastacc = 0;
console.log(input)
changeindx = 0;
while(!escaped && changeindx < input.length){
  console.log(`RUNNING togo: ${changeindx}`)
  loc = 0;
  inputcopy = [...input];
  if (inputcopy[changeindx].includes('nop')) {
    inputcopy[changeindx] = inputcopy[changeindx].replace('nop', 'jmp');
  } else if (inputcopy[changeindx].includes('jmp')) {
    inputcopy[changeindx] = inputcopy[changeindx].replace('jmp', 'nop');
  } else {
    continue;
  }

  // commandToSwap = options.shift();
  // [command, val]=inputcopy[commandToSwap].replace('+', '').split(' ');
  // inputcopy[commandToSwap] = `${swaps[command]} ${val}`;
  // console.log(inputcopy);
  result = runProgram(inputcopy);
  escaped = !result.loop;
  lastacc = result.acc;
  changeindx++;
  // console.log(result)
}
console.log(`Solution 2 : ${lastacc}`)


// console.log(options);
// console.log(options[0]);
// console.log(options.shift());
// console.log(options[0])
