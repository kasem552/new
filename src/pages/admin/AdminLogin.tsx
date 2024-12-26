import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import SplineBackground from '../../components/SplineBackground';
import { loginAdmin } from '../../utils/auth/api';
import type { LoginCredentials } from '../../utils/auth/types';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await loginAdmin(data);
      setAuth(response.token, response.user);
      navigate('/admin');
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'Invalid email or password'
      });
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <SplineBackground />
      
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="animate-gradient-shine backdrop-blur-xl bg-gradient-to-br from-black/40 via-primary/40 to-accent/20 rounded-3xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-white/80">Enter your credentials to access the dashboard</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register('email')}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="admin@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-1">
                Password
              </label>
              <input
                type="password"
                {...register('password')}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>

            {errors.root && (
              <p className="text-sm text-red-400 text-center">{errors.root.message}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-accent text-white rounded-xl hover:bg-accent-hover transition-colors duration-300"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}