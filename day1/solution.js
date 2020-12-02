let vals = await fetch('https://adventofcode.com/2020/day/1/input').then((response) => response.text()).then((t) => t.split(/\s+/))
vals.pop()
let goal = 2020;
let problem1Map = {};
vals.some((val) => {
   if(problem1Map[goal - val] != undefined){
	  return true;
   } else {
	problem1Map[val] = true;
   }
})

let problem2Map = {}
vals.forEach((v) => problem2Map[v] = true)
vals.some((val1) => {
	return vals.some((val2) => {
		if(val2 === val1){
			return false
		}
		val3 = goal - val2 - val1;
		if(problem2Map[val3]){
			console.log(`Found Problem 2 :  ${val1} ${val2} ${val3}`);
			return true;
		}
	})
})
