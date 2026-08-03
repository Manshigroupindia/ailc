import React from 'react';
import { eventsData } from '@/data/mockData';
import { Timeline } from '../ui/Timeline';
import { useModal } from '@/context/ModalContext';
import { RsvpModalForm } from '@/components/ui/RsvpModalForm';

export const EventsSection = () => {
  const { openModal, closeModal } = useModal();

  const handleRsvp = (event) => {
    openModal({
      title: `RSVP Registration: ${event.title}`,
      content: (
        <RsvpModalForm
          eventTitle={event.title}
          eventDate={event.date}
          eventVenue={`${event.venue || ''} ${event.time ? `• ${event.time}` : ''}`}
          onCloseModal={closeModal}
        />
      ),
    });
  };

  return (
    <section id="events" className="py-xl bg-surface-container-low font-body">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-16 space-y-2">
          <span className="font-label-lg text-secondary tracking-widest uppercase block">
            Save the Date
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary">
            Upcoming Events & Summits
          </h2>
        </div>

        <Timeline events={eventsData} onRsvp={handleRsvp} />
      </div>
    </section>
  );
};

export default EventsSection;
