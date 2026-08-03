import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { db, collection, addDoc, serverTimestamp } from '@/services/firebase';
import { SubmissionSuccessModal } from '@/components/ui/SubmissionSuccessModal';
import { SubmissionErrorModal } from '@/components/ui/SubmissionErrorModal';
import { getRandomConstitutionQuote } from '@/data/constitutionQuotes';

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched',
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentQuote, setCurrentQuote] = useState(null);

  const onSubmit = async (data) => {
    try {
      const submissionPayload = {
        name: (data.fullName || '').trim(),
        email: (data.email || '').trim(),
        subject: (data.subject || '').trim(),
        message: (data.message || '').trim(),
        submittedAt: serverTimestamp(),
        status: 'New',
        isStarred: false,
        notes: '',
      };

      await addDoc(collection(db, 'contact_submissions'), submissionPayload);

      // Select random quote for Thank You modal
      setCurrentQuote(getRandomConstitutionQuote());
      setShowSuccessModal(true);
      reset();
    } catch (err) {
      console.error('Contact Form Firestore error:', err);
      setErrorMessage(err.message || 'Something went wrong while sending your message. Please try again after a few moments.');
      setShowErrorModal(true);
    }
  };

  return (
    <>
      <div className="bg-surface-container rounded-3xl p-5 sm:p-8 lg:p-12 border border-surface-variant shadow-premium h-fit font-body">
        <h3 className="font-display font-bold text-xl sm:text-2xl text-primary mb-6">Send a Message</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          {/* 1. Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-primary uppercase tracking-wider block">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('fullName', {
                required: 'Full Name is required',
              })}
              placeholder="Enter your full name"
              className={`w-full bg-white border ${
                errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-outline-variant focus:ring-[#000d25]'
              } rounded-xl p-3.5 text-xs sm:text-sm outline-none focus:ring-2 transition-all text-on-surface`}
            />
            {errors.fullName && (
              <p className="text-[11px] font-medium text-red-500 mt-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* 2. Email Address */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-primary uppercase tracking-wider block">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register('email', {
                required: 'Email Address is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Enter a valid email address',
                },
              })}
              placeholder="Enter your email address"
              className={`w-full bg-white border ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-outline-variant focus:ring-[#000d25]'
              } rounded-xl p-3.5 text-xs sm:text-sm outline-none focus:ring-2 transition-all text-on-surface`}
            />
            {errors.email && (
              <p className="text-[11px] font-medium text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* 3. Subject */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-primary uppercase tracking-wider block">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('subject', {
                required: 'Subject is required',
              })}
              placeholder="Enter subject"
              className={`w-full bg-white border ${
                errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-outline-variant focus:ring-[#000d25]'
              } rounded-xl p-3.5 text-xs sm:text-sm outline-none focus:ring-2 transition-all text-on-surface`}
            />
            {errors.subject && (
              <p className="text-[11px] font-medium text-red-500 mt-1">{errors.subject.message}</p>
            )}
          </div>

          {/* 4. Message */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-primary uppercase tracking-wider block">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              {...register('message', {
                required: 'Message is required',
              })}
              placeholder="Write your message..."
              className={`w-full bg-white border ${
                errors.message ? 'border-red-500 focus:ring-red-500' : 'border-outline-variant focus:ring-[#000d25]'
              } rounded-xl p-3.5 text-xs sm:text-sm outline-none focus:ring-2 transition-all resize-none text-on-surface`}
            ></textarea>
            {errors.message && (
              <p className="text-[11px] font-medium text-red-500 mt-1">{errors.message.message}</p>
            )}
          </div>

          {/* 5. Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-[#000d25] hover:bg-[#002256] disabled:bg-opacity-60 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#ffe08d]" />
                <span>Sending...</span>
              </>
            ) : (
              <span>Send Message</span>
            )}
          </button>
        </form>
      </div>

      {/* Thank You Success Modal with Random Quote */}
      <SubmissionSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        quote={currentQuote}
      />

      {/* Submission Error Modal */}
      <SubmissionErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default ContactForm;
