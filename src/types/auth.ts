import { z } from 'zod';

export const signUpSchema = z.object({
  invitationCode: z.string().optional(),
  tiktokUsername: z.string().min(1, 'TikTok username is required'),
  tiktokUrl: z.string().url('Please enter a valid TikTok URL'),
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  country: z.string().min(1, 'Please select your country'),
  followers: z.string().min(1, 'Number of followers is required'),
  diamonds: z.string().min(1, 'Please enter your diamond earnings'),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

export type SignUpForm = z.infer<typeof signUpSchema>;

export interface ApplicationData extends SignUpForm {
  id: string;
  status?: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}