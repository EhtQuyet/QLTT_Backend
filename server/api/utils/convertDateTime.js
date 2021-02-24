export function convertDateTime(valDate, typeDate) {
  if(valDate){
      let date_val = new Date(valDate);
      if(typeDate === 0){
        date_val.setHours(0,0,0,0)
      }else{
        date_val.setHours(23,59,59,999)
      }
      valDate = date_val.toISOString()
    }
    return valDate
}

export function dateFormatterYMD(stringDate) {
  if (stringDate) {
    let dateFormat = new Date(stringDate);
    return `${dateFormat.getFullYear()}${('0' + (dateFormat.getMonth() + 1)).slice(-2)}${('0' + dateFormat.getDate()).slice(-2)}`;
  } else {
    return ''
  }
}

export function formatYMDFromDate(momentDate) {
  let dateFormat = new Date(momentDate);
  return `${dateFormat.getFullYear()}${('0' + (dateFormat.getMonth() + 1)).slice(-2)}${('0' + dateFormat.getDate()).slice(-2)}`;
}

export function dateFormatterFromDate(dateFormat) {
  return `${('0' + dateFormat.getDate()).slice(-2)}/${('0' + (dateFormat.getMonth() + 1)).slice(-2)}/${dateFormat.getFullYear()}`;
}

export function dateFormatter(stringDate) {
  if (stringDate) {
    let dateFormat = new Date(stringDate);
    return `${('0' + dateFormat.getDate()).slice(-2)}/${('0' + (dateFormat.getMonth() + 1)).slice(-2)}/${dateFormat.getFullYear()}`;
  } else {
    return '';
  }
}
