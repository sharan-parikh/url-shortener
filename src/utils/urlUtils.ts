import { nanoid } from 'nanoid';

const regex =
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

export function getRandomShortId(): string {
  const randomId = nanoid(8);
  return randomId;
}

export function validateFormat(url: string): boolean {
  return regex.test(url);
}
