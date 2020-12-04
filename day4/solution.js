let passportSplit = /^\s*$/gm
let input = await fetch('https://adventofcode.com/2020/day/4/input').then((response) => response.text()).then((t) =>  t.split(passportSplit)).then((t) => {t.pop(); return t})

toObject= (str) => {
  const obj = {};
  str.match(/\S+/gm).forEach((x)=> {
    xsplit = x.split(':');
    obj[xsplit[0]] = xsplit[1]
  })
  return obj;
}

let requirements = {
  'byr': (input) => {
    if(input.match(/^\d{4}$/)){
      year = parseInt(input);
      return year >= 1920 && year <= 2002
    }
  },
  'iyr': (input) => {
    if(input.match(/^\d{4}$/)){
      year = parseInt(input);
      return year >= 2010 && year <= 2020
    }    
  }, 
  'eyr': (input) => {
    if(input.match(/^\d{4}$/)){
      year = parseInt(input);
      return year >= 2020 && year <= 2030
    }      
  }, 
  'hgt': (input) => {
    if(input.indexOf('cm') > 0){
      val = parseInt(input);
      return val >= 150 && val <= 193
    }
    if(input.indexOf('in') > 0){
      val = parseInt(input);
      return val >= 59 && val <= 76
    }
  }, 
  'hcl': (input) => {
    return input.match(/^#[a-f0-9]{6}$/);
  }, 
  'ecl': (input) => {
    return input.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/)
  }, 
  'pid': (input) => {
    return input.match(/^[0-9]{9}$/);    
  }
}

let requiredFields = Object.keys(requirements);

filtered = input.filter((passport) => {
  const passportObj = toObject(passport)
  const keys = Object.keys(passportObj).filter((k) => requiredFields.includes(k))
  if(keys.length !== requiredFields.length){
    return false;
  };
  const validKeys = keys.filter((key) => requirements[key](passportObj[key]));
  if(validKeys.length === keys.length){
    return true;
  } else {
    return false;
  }
})

console.table(filtered.length)
