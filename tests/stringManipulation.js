const print = console.log;
const str = '[ 1]'

let last = str.replace('[', '').replace(']', '').replace(' ', '').replace(',', '');
print(last)
