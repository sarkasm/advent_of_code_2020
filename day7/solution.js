
let groupSplit = /\n+/
let inputTextPromise = fetch('https://adventofcode.com/2020/day/7/input').then((response) => response.text());


//let testText = 'shiny gold bags contain 2 dark red bags.\ndark red bags contain 2 dark orange bags.\ndark orange bags contain 2 dark yellow bags.\ndark yellow bags contain 2 dark green bags.\ndark green bags contain 2 dark blue bags.\ndark blue bags contain 2 dark violet bags.\ndark violet bags contain no other bags.'
// let inputTextPromise = Promise.resolve(testText);

typeMap = {}

getRuleForType = (type) => {
  let rule = typeMap[type];
     
  if(!rule){
    rule = {contents: {}, parents: [], parentsObj: {}};
    typeMap[type] = rule;  
  }
  return rule;
}

let input = await inputTextPromise.then((t) =>  t.split(groupSplit).map((a)=>a.trim()))
input.pop();
 input.forEach((rule)=> {
   definition = rule.split(' contain ');
   rulesFor = definition[0].replace('bags', 'bag');
   contentRules = definition[1].replace('.', '').split(', ');
   ruleForObj = getRuleForType(rulesFor);
   contentRules.forEach((rule) => {
     if(rule === 'no other bags'){
      return;
    }
     const rulesplit = rule.match(/^(\d+) (.+)$/);

     const count = parseInt(rulesplit[1]);
     rulesplit[2] = rulesplit[2].replace('bags', 'bag');
     
      let existingRule = getRuleForType(rulesplit[2]);
      existingRule.parents.push(rulesFor);
      existingRule.parentsObj[rulesFor] = ruleForObj;
      ruleForObj.contents[rulesplit[2]] = count;
   })

   typeMap[rulesFor] = ruleForObj;
  
 })


 theSet = new Set();
 findParents = (type) => {
  theSet.add(type);
  const typeObj = getRuleForType(type);
  typeObj.parents.forEach(findParents)
 }

 sumChildrenCount = (typeObj) => {
  const children = Object.entries(typeObj.contents);
  return children.reduce((acc, [name, count]) => {
    const insideCount = sumChildrenCount(getRuleForType(name));
    return  count * insideCount + acc;
  }, 1)
 }



 lookingFor = 'shiny gold bag'


 findParents(lookingFor)
 theSet.delete(lookingFor)
 
 bagsInside = sumChildrenCount(getRuleForType(lookingFor)) - 1
 
 console.log(`Bags that can have a '${lookingFor}': ${theSet.size}`);
 console.log(`Bags inside of a '${lookingFor}': ${bagsInside}`);
 