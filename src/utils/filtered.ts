export function Filtered(Elemet: any, attribute: string, name: string) {
  if (name.trim() === '') return Elemet;
  return Elemet?.filter((x:any) => x[attribute]?.toLowerCase().includes(name.toLowerCase()));
}

export function replaceSpaces(frase: string): string {
  return frase.trim().replace(/\s+/g, '-');
}

export function arrayToString(array: string[], order: string[]): string {
  const orderedArray = array.sort((a, b) => {
    return order.indexOf(a) - order.indexOf(b);
  });
  
  return orderedArray.join(', ');
}

export function deteleObject(arr: any, title: string) {
  return arr.filter((objeto: any) => objeto.title !== title);
}

export function sortArray(obj: any) {
  if (!obj) return [];
  return obj.sort((a: any, b: any) => b.id - a.id);
}

export function validateNumber(numero: number): boolean {
  const numeroComoString: string = numero.toString();
  return !(numeroComoString.length === 6 && /^\d+$/.test(numeroComoString));
}

export function validateEmail(correo: string): boolean {
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !regexCorreo.test(correo);
}


export function sortDataDesc(data:any) {
  const sortedData = data.slice().sort((a: any, b: any) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateB - dateA; // Orden descendente
  });
  return sortedData;
}

export function convertTimestampToDate(timestamp: number): string {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

export function timeSince(dateString: string): string {
  if (!dateString) return 'uncompiled'; 
  const now = new Date();
  const pastDate = new Date(dateString);
  const utcOffset = now.getTimezoneOffset() / 60;
  const diffInMs = now.getTime() - pastDate.getTime() - utcOffset * 60 * 1000;
  const diffInSeconds = Math.floor(diffInMs / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  } else if (diffInSeconds < 2592000) {
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  } else if (diffInSeconds < 31536000) {
    return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  } else {
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  }
}