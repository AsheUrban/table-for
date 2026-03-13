import { z } from 'zod';

export const signUpSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least three (3) characters.')
    .max(20, 'Username must be 20 characters or less.')
    .regex(
      /^[a-zA-Z0-9_.]+$/,
      'Username can only contain letters, numbers, underscores, and periods'
    ),
  email: z
    .string()
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least eight (8) characters.')
    .max(72, 'Password must be 72 characters or less.')
});

export type SignUpFormData = z.infer<typeof signUpSchema>;