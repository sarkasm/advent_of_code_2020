let groupSplit = /\n+/
let fetchPromise = fetch('https://adventofcode.com/2020/day/9/input').then((response) => response.text()).then((text) => text.trim());


let testText = '35\n20\n15\n25\n47\n40\n62\n55\n65\n95\n102\n117\n150\n182\n127\n219\n299\n277\n309\n576';
// let testText = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n49\n100\n50';
let testPromise = Promise.resolve(testText);

let preamble = 25;
let live = 1;

let inputPromise = live ? fetchPromise : testPromise;

let input = await inputPromise.then((t) => t.split(groupSplit)).then((t) => t.map((i) =>parseInt(i)));


numCount = {}
numList = [];
let sol1 = undefined;
let found = true;
sol1 = input.find((val, idx) => {
  if(idx >= preamble){
    found = numList.find((num) => {
      if((val - num != num) && (numCount[val - num])){
        return true
      }
    });

    removedVal = numList.shift();
    numCount[removedVal] = numCount[removedVal] - 1;  
  }

  if(!found){
    return val;
  }
  numList.push(val);
  numCount[val] = (numCount[val] || 0) + 1;
})


range = [];
input.find((val, idx) => {
  if(val < sol1){
    let addIdx = idx + 1;
    let endIdx;
    let sum = val;
    while(addIdx < input.length && sum < sol1){
      sum += input[addIdx];
      endIdx = addIdx;
      addIdx++;
    }

    if(sum === sol1){
      range = [idx, endIdx]
      return true;
    }
  }
}) 

irange = input.slice(range[0], range[1]);

console.log(`Solution 1 : ${sol1}`);
console.log(`Solution 2 : ${Math.min.apply(this, irange) + Math.max.apply(this, irange)}`)

