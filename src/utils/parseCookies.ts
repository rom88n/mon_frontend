import cookie from 'cookie';
import { IncomingMessage } from 'http';

export function parseCookies(req: IncomingMessage | undefined) {
  if (!req && typeof document === 'undefined') return {}
  return cookie.parse(req ? (req.headers?.cookie || '') : document.cookie);
}