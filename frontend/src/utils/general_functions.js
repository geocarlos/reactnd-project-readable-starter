/**
  Capitalize words
*/
export function capitalize(word){
  return word[0].toUpperCase()+word.substring(1);
}

/**
  Make sure no field is blank
*/
export function validateForm(form){
  return new Promise((res, rej)=>{
    const errors = {};
    for(let input of Object.keys(form)){
      if(form[input] === ""){
        errors[input] = `${input} cannot be blank!`;
      }
    }
    if(Object.keys(errors).length === 0) res();
    else rej(errors);
  });
}

/** Receive a date in miliseconds and return it formatted in
  Month, Day, Year, Hours, and Minutes
*/
export function formatDate(miliseconds){
  const date = new Date(Number(miliseconds));
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const h = date.getHours();
  const m = date.getMinutes();
  return `${months[date.getMonth()]} ${date.getDate()},
    ${date.getFullYear()}
    - ${h < 9?'0':''}${h}:${m < 9?'0':''}${m}`;
}

/**
  I have got this from https://gist.github.com/jcxplorer/823878,
  and removed the line that added a dash, dividing the ID into
  blocks.
*/

export function uuid() {
  let uuid = "", i, random;
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;
    uuid += (i === 12 ? 4 : (i === 16 ? (random & (3 | 8)) : random)).toString(16);
  }
  return uuid;
}
