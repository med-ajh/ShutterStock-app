import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const lastActivity = Math.floor(Date.now() / 1000);
  const token = jwt.sign({ userId: userId, lastActivity }, process.env.SECRET_KEY, { expiresIn: '30d' });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
  return token;
};

export default generateToken;