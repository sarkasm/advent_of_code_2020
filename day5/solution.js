

finder = (directions, lowchar, min, max) => {
  let curr = directions.shift();
  const mid = Math.floor(min + ((max - min) / 2));
  if(curr === lowchar){
    min = min;
    max = mid;
  } else {
    min = mid + 1
    max = max;
  }

  if(directions.length === 0){
    return min;
  }

  return finder(directions, lowchar, min, max)
}

calcId = (row, seat) => {
  return row * 8 + seat
}

findSeatId = (input) => {
  row = finder(input.slice(0, 7).split(''), 'F', 0, 127)
  seat = finder(input.slice(7, 11).split(''), 'L', 0, 7);
  return calcId(row, seat);
}

let input = await fetch('https://adventofcode.com/2020/day/5/input').then((response) => response.text()).then((t) =>  t.split(/\n+/)).then((t) => {t.pop(); return t})

let seats = input.map(findSeatId).sort((a, b) => a - b);


let missingSeats = seats.filter((seat, idx) => seat + 2 === seats[idx + 1])

console.log(`Max seat: ${seats.pop()}`);
console.log(`Missing Seat: ${missingSeats[0] + 1}`)
