
let groupSplit = /\n+/
let inputTextPromise = fetch('https://adventofcode.com/2020/day/7/input').then((response) => response.text());


//let testText = 'shiny gold bags contain 2 dark red bags.\ndark red bags contain 2 dark orange bags.\ndark orange bags contain 2 dark yellow bags.\ndark yellow bags contain 2 dark green bags.\ndark green bags contain 2 dark blue bags.\ndark blue bags contain 2 dark violet bags.\ndark violet bags contain no other bags.'
// let inputTextPromise = Promise.resolve(testText);

typeMap = {}

getRuleForType = (type) => {
  let rule = typeMap[type];
     
  if(!rule){
    rule = {contents: {}, parents: []};
    typeMap[type] = rule;  
  }
  return rule;
}

let input = await inputTextPromise.then((t) =>  t.split(groupSplit).map((a)=>a.trim()))
input.pop();
input.forEach((rule)=> {
  rule = rule.replaceAll('bags', 'bag').replace('.', '');
  [rulesFor, contentRules] = rule.split(' contain ');
  contentRules = contentRules.split(', ').filter((r) => r !== 'no other bag');
  ruleForObj = getRuleForType(rulesFor);
  contentRules.forEach((rule) => {
    const [_, countStr, type] = rule.match(/^(\d+) (.+)$/);
    let existingRule = getRuleForType(type);
    existingRule.parents.push(rulesFor);
    ruleForObj.contents[type] = parseInt(countStr);
  })

  typeMap[rulesFor] = ruleForObj;  
})


 let parentSet = new Set();
 findParents = (type) => {
  parentSet.add(type);
  const typeObj = getRuleForType(type);
  typeObj.parents.forEach(findParents)
 }

 sumChildrenCount = (typeObj) => {
  return Object.entries(typeObj.contents).reduce((acc, [name, count]) => {
    const insideCount = sumChildrenCount(getRuleForType(name));
    return  count * insideCount + acc;
  }, 1)
 }



 lookingFor = 'shiny gold bag'


 findParents(lookingFor)
 parentSet.delete(lookingFor)
 
 bagsInside = sumChildrenCount(getRuleForType(lookingFor)) - 1
 
 console.log(`Bags that can have a '${lookingFor}': ${parentSet.size}`);
 console.log(`Bags inside of a '${lookingFor}': ${bagsInside}`);
 