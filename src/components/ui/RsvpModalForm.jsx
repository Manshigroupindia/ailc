import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { db, collection, addDoc, serverTimestamp } from '@/services/firebase';
import { SubmissionSuccessModal } from '@/components/ui/SubmissionSuccessModal';
import { SubmissionErrorModal } from '@/components/ui/SubmissionErrorModal';
import { getRandomConstitutionQuote } from '@/data/constitutionQuotes';

export const RsvpModalForm = ({ eventTitle, eventDate, eventVenue, onCloseModal }) => {
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
        name: (data.name || '').trim(),
        email: (data.email || '').trim(),
        phone: (data.phone || '').trim(),
        state: (data.state || '').trim(),
        eventTitle: eventTitle || 'AILC Event',
        eventDate: eventDate || '',
        eventVenue: eventVenue || '',
        submittedAt: new Date().toISOString(),
        status: 'New',
        isStarred: false,
        notes: '',
      };

      try {
        await addDoc(collection(db, 'rsvp_submissions'), {
          ...submissionPayload,
          submittedAt: serverTimestamp(),
        });
      } catch (firstErr) {
        await addDoc(collection(db, 'rsvp_submissions'), submissionPayload);
      }

      setCurrentQuote(getRandomConstitutionQuote());
      setShowSuccessModal(true);
      reset();
    } catch (err) {
      console.error('RSVP Form Firestore error:', err);
      setErrorMessage('Permission or connection error. Please ensure Firebase console rules allow public writing to rsvp_submissions.');
      setShowErrorModal(true);
    }
  };

  return (
    <>
      <div className="space-y-4 font-body">
        <div className="bg-surface-container p-4 rounded-xl border border-surface-variant">
          <span className="text-secondary font-bold text-sm block">{eventDate}</span>
          <h4 className="font-display font-bold text-primary text-lg mt-1">{eventTitle}</h4>
          <p className="text-xs text-outline mt-1">{eventVenue}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
          <div>
            <label className="block text-xs font-bold text-primary uppercase mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('name', { required: 'Full Name is required' })}
              placeholder="Adv. Full Name"
              className={`w-full border ${errors.name ? 'border-red-500' : 'border-outline-variant'} rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-[#000d25]`}
            />
            {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-primary uppercase mb-1">
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
              placeholder="advocate@example.com"
              className={`w-full border ${errors.email ? 'border-red-500' : 'border-outline-variant'} rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-[#000d25]`}
            />
            {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-primary uppercase mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                {...register('phone', { required: 'Phone Number is required' })}
                placeholder="+91 98765 43210"
                className={`w-full border ${errors.phone ? 'border-red-500' : 'border-outline-variant'} rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-[#000d25]`}
              />
              {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-primary uppercase mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('state', { required: 'State is required' })}
                placeholder="e.g. Delhi, Maharashtra"
                className={`w-full border ${errors.state ? 'border-red-500' : 'border-outline-variant'} rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-[#000d25]`}
              />
              {errors.state && <p className="text-[11px] text-red-500 mt-1">{errors.state.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#000d25] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#ffe08d]" />
                <span>Submitting RSVP...</span>
              </>
            ) : (
              <span>CONFIRM SEAT RSVP</span>
            )}
          </button>
        </form>
      </div>

      <SubmissionSuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          if (onCloseModal) onCloseModal();
        }}
        quote={currentQuote}
      />

      <SubmissionErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        errorMessage={errorMessage}
      />
    </>
  );
};
