let input = await fetch('https://adventofcode.com/2020/day/2/input').then((response) => response.text()).then((t) =>  t.split(/\n+/)).then((t) => {t.pop(); return t})

let regex = /([0-9]+)-([0-9]+)\s(\w):\s(\w+)/;
let solution1 = input.filter((inp) => {
  [_, min, max, seq, pw] = inp.match(regex);
  pw = pw.split('').sort().join('');
   
  start = pw.indexOf(seq);  
  if(start == -1){
    return false
  }
  end = pw.lastIndexOf(seq);
  count  = (end + 1 - start);
  if((count >= min) && (count <= max)){
    return true;
  }
});

console.log(`Solution 1 : ${solution1.length}`);

let solution2 = input.filter((inp) => {
  [_, one, two, seq, pw] = inp.match(regex);
  charOne = pw.charAt(parseInt(one, 10) - 1) ;
  charTwo = pw.charAt(parseInt(two, 10) - 1) ;

  if(((charOne == seq) && (charTwo != seq)) || ((charOne != seq) && (charTwo == seq))){
    return true;
  }
});

console.log(`Solution 2 : ${solution2.length}`);
