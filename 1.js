var str = 'data:image/gif;base64,R0lGODlhHAAmAKIHAKqqqsvLy0hISObm'

let x = str.split(',')[1];
let y = str.substring(str.indexOf(',')+1)

console.log(x);
console.log(y);