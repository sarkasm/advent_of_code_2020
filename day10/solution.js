let groupSplit = /\n+/
let fetchPromise = fetch('https://adventofcode.com/2020/day/10/input').then((response) => response.text()).then((text) => text.trim());


// let testText = '35\n20\n15\n25\n47\n40\n62\n55\n65\n95\n102\n117\n150\n182\n127\n219\n299\n277\n309\n576';
//let testText = '16\n10\n15\n5\n1\n11\n7\n19\n6\n12\n4';
let testText = '28\n33\n18\n42\n31\n14\n46\n20\n48\n47\n24\n23\n49\n45\n19\n38\n39\n11\n1\n32\n25\n35\n8\n17\n7\n9\n4\n2\n34\n10\n3';
// let testText = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n49\n100\n50';
let testPromise = Promise.resolve(testText);

let live = 1;

let inputPromise = live ? fetchPromise : testPromise;

let input = await inputPromise.then((t) => t.split(groupSplit)).then((t) => t.map((i) =>parseInt(i)));

ratingsArr = input.reduce((acc, val) => {
  acc[val]=true; 
  return acc
}, [true]);

ratingsIdx = 0;
diffCount= {1: 0, 2:0, 3:1} // 3 is 1 because the top adapter will add 3 to get to device

while(ratingsIdx < ratingsArr.length){
  const nearest = [1, 2, 3].find((i) => ratingsArr[ratingsIdx + i]);
  if(!nearest){
    break
  }

  ratingsIdx += nearest;
  diffCount[nearest] = diffCount[nearest] + 1;
}


let backwardTotals = [];
backwardTotals[ratingsArr.length - 1] = 1;

for(backwardsIdx=ratingsArr.length - 2; backwardsIdx >= 0; backwardsIdx--){
  if(ratingsArr[backwardsIdx]){
    let total = [1, 2, 3].reduce((acc, i) => acc + (backwardTotals[backwardsIdx + i] || 0), 0)
    backwardTotals[backwardsIdx] = total;
  }
}

console.log(`Solution 1: ${diffCount[1] * diffCount[3]}`)
console.log(`Solution 2: ${backwardTotals[0]}`);
