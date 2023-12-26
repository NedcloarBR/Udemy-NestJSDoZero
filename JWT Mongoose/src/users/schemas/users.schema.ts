import { NextFunction } from 'express';
import { Schema, SchemaTypes } from 'mongoose';
import { hash } from 'bcrypt';

export const UsersSchema = new Schema({
  name: {
    type: SchemaTypes.String,
  },
  email: {
    type: SchemaTypes.String,
  },
  password: {
    type: SchemaTypes.String,
  },
});

UsersSchema.pre('save', async function (next: NextFunction) {
  try {
    if (!this.isModified('password')) return next();

    this['password'] = await hash(this['password'], 10);
  } catch (error) {
    return next(error);
  }
});
