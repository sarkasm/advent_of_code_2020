
let groupSplit = /\n+/
let inputTextPromise = fetch('https://adventofcode.com/2020/day/7/input').then((response) => response.text());

// let testText = 'light red bags contain 1 bright white bag, 2 muted yellow bags.\ndark orange bags contain 3 bright white bags, 4 muted yellow bags.\nbright white bags contain 1 shiny gold bag.\nmuted yellow bags contain 2 shiny gold bags, 9 faded blue bags.\nshiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.\ndark olive bags contain 3 faded blue bags, 4 dotted black bags.\nvibrant plum bags contain 5 faded blue bags, 6 dotted black bags.\nfaded blue bags contain no other bags.\ndotted black bags contain no other bags.'
// let inputTextPromise = Promise.resolve(testText);

allTypes = {}

getRuleForType = (type) => {
  let rule = allTypes[type];
     
  if(!rule){
    rule = {contents: {}, parents: [], parentsObj: {}};
    allTypes[type] = rule;  
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

   allTypes[rulesFor] = ruleForObj;
  
 })


 counter = 0;

 theSet = new Set();
 findParents = (type) => {
  theSet.add(type);
  const typeObj = getRuleForType(type);
  typeObj.parents.forEach(findParents)
 }

 lookingFor = 'shiny gold bag'


 findParents(lookingFor)
 theSet.delete(lookingFor)

 console.log(allTypes)
 console.log(theSet.size)
