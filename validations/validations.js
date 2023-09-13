import { body } from 'express-validator';

export const regValidation = [
  body('email', 'Incorrect email types').isEmail(),
  body('password', 'Password must be greater than 5 symbols').isLength({
    min: 5,
  }),
  body('fullName', 'Name must be greater than 2 symbols').isLength({ min: 2 }),
  body('avatarUrl', 'Incorrect avatar URL').optional().isString(),
];

export const loginValidation = [
  body('email', 'Incorrect email types').isEmail(),
  body('password', 'Password must be greater than 5 symbols').isLength({
    min: 5,
  }),
];

export const messageCreateValidation = [
  body('text', 'Enter an article text').isLength({ min: 10 }).isString(),
  body('imageUrl', 'Incorrect image URL').optional().isString(),
];
