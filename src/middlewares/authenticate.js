import createHttpError from 'http-errors';
import { SessionCollection } from '../models/session.js';
import { UserCollection } from '../models/user.js';

export const authenticate = async (req, res, next) => {
  const autHeader = req.get('Authorization');

  if (!autHeader) {
    next(createHttpError(401, 'Please provide Authorization header'));
    return;
  }

  const bearer = autHeader.split(' ')[0];
  const token = autHeader.split(' ')[1];

  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Auth header should be of type Bearer'));
    return;
  }

  const session = await SessionCollection.findOne({ accessToken: token });

  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    next(createHttpError(401, 'Access token expired'));
  }

  const user = await UserCollection.findById(session.userId);

  if (!user) {
    next(createHttpError(401));
    return;
  }

  req.user = user;

  next();
};
