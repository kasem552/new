import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { signUpSchema, type SignUpForm } from '../../types/auth';
import { submitSignup } from '../../services/signupService';
import { useTranslation } from '../../hooks/useTranslation';
import { FormField } from './FormField';
import { SelectField } from './SelectField';
import { countries } from '../../utils/constants';

export function SignUpFormComponent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data: SignUpForm) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      const response = await submitSignup(data);
      
      if (response.success) {
        navigate('/thank-you');
      } else {
        setError(response.error || 'Failed to submit application');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormField
          label={t.signup.form.invitationCode}
          name="invitationCode"
          register={register}
          placeholder={t.signup.form.invitationCodePlaceholder}
        />
        
        <FormField
          label={t.signup.form.tiktokUsername}
          name="tiktokUsername"
          register={register}
          error={errors.tiktokUsername}
          required
        />

        <FormField
          label={t.signup.form.tiktokProfileUrl}
          name="tiktokUrl"
          register={register}
          error={errors.tiktokUrl}
          required
        />

        <FormField
          label={t.signup.form.fullName}
          name="fullName"
          register={register}
          error={errors.fullName}
          required
        />

        <FormField
          label={t.signup.form.emailAddress}
          name="email"
          type="email"
          register={register}
          error={errors.email}
          required
        />

        <FormField
          label={t.signup.form.mobileNumber}
          name="phone"
          type="tel"
          register={register}
          error={errors.phone}
          required
        />

        <SelectField
          label={t.signup.form.country}
          name="country"
          register={register}
          options={countries}
          error={errors.country}
          placeholder={t.signup.form.countryPlaceholder}
          required
        />

        <FormField
          label={t.signup.form.tiktokFollowers}
          name="followers"
          type="number"
          register={register}
          error={errors.followers}
          required
        />

        <FormField
          label={t.signup.form.diamondsEarned}
          name="diamonds"
          type="number"
          register={register}
          error={errors.diamonds}
          required
        />
      </div>

      <div className="mt-8">
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register('terms')}
            id="terms"
            className="w-4 h-4 border-white/20 rounded focus:ring-accent text-accent"
          />
          <label htmlFor="terms" className="ml-2 text-sm text-white/90">
            {t.signup.form.terms}
          </label>
        </div>
        {errors.terms && (
          <p className="mt-1 text-sm text-red-400">{errors.terms.message}</p>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-400 text-center mt-4">{error}</p>
      )}

      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-4 bg-accent text-white rounded-xl hover:bg-accent-hover transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Submitting...</span>
            </>
          ) : (
            t.signup.form.submit
          )}
        </button>
      </div>
    </form>
  );
}