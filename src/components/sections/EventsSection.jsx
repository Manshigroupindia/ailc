import React from 'react';
import { eventsData } from '@/data/mockData';
import { Timeline } from '../ui/Timeline';
import { useModal } from '@/context/ModalContext';

export const EventsSection = () => {
  const { openModal } = useModal();

  const handleRsvp = (event) => {
    openModal({
      title: `RSVP: ${event.title}`,
      content: (
        <div className="space-y-4">
          <div className="bg-surface-container p-4 rounded-xl border border-surface-variant">
            <span className="text-secondary font-bold text-lg block">{event.date}</span>
            <h4 className="font-headline-sm text-primary text-xl mt-1">{event.title}</h4>
            <p className="text-sm text-outline mt-1">{event.venue} • {event.time}</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              openModal({
                title: 'RSVP Confirmed!',
                content: (
                  <div className="text-center py-4">
                    <p className="text-body-md text-on-surface-variant">
                      Your seat registration for <strong>{event.title}</strong> has been confirmed. An entry badge QR code will be emailed to you prior to the event date.
                    </p>
                  </div>
                ),
              });
            }}
            className="space-y-3"
          >
            <div>
              <label className="block text-xs font-semibold text-primary mb-1">YOUR NAME</label>
              <input type="text" required placeholder="Adv. Prior Registration" className="w-full border border-outline-variant rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-primary mb-1">MOBILE NUMBER</label>
              <input type="tel" required placeholder="+91 98765 43210" className="w-full border border-outline-variant rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-button">
              CONFIRM SEAT
            </button>
          </form>
        </div>
      ),
    });
  };

  return (
    <section id="events" className="py-xl bg-surface-container-low">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-16">
          <span className="font-label-lg text-secondary tracking-widest uppercase mb-4 block">
            Save the Date
          </span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
            Upcoming Events
          </h2>
        </div>

        <Timeline events={eventsData} onRsvp={handleRsvp} />
      </div>
    </section>
  );
};
