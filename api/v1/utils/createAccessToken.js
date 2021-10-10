import jwt from 'jsonwebtoken';

export default function createAccessToken(key, payload) {
  return jwt.sign(payload, key, {expiresIn: '1d'});
}