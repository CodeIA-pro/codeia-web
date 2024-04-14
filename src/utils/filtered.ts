export function Filtered(Elemet: any, attribute: string, name: string) {
  if (name.trim() === '') return Elemet;
  return Elemet?.filter((x:any) => x[attribute]?.toLowerCase().includes(name.toLowerCase()));
}

export function convertTimestampToDate(timestamp: number): string {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

export function timeSince(dateString: string): string {
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