// Ahwenepa Gold Beauty Palace — site scripts

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Generate time slots ----------
  const timeSlotsContainer = document.getElementById('timeSlots');
  const slots = ['9:00 AM', '10:30 AM', '12:00 PM', '1:30 PM', '3:00 PM', '4:30 PM'];
  let selectedTime = null;

  slots.forEach(slot => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = slot;
    btn.addEventListener('click', () => {
      document.querySelectorAll('#timeSlots button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedTime = slot;
    });
    timeSlotsContainer.appendChild(btn);
  });

  // ---------- Service selection ----------
  let selectedService = null;
  const serviceButtons = document.querySelectorAll('#serviceSelect button');

  serviceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      serviceButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedService = btn.dataset.service;
    });
  });

  // ---------- Form submit -> WhatsApp ----------
  const form = document.getElementById('bookingForm');
  const note = document.getElementById('bookingNote');
  const SALON_WHATSAPP_NUMBER = '233509275286'; // 050 927 5286 in international format

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const date = document.getElementById('date').value;
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!selectedService || !selectedTime || !date || !name || !phone) {
      note.textContent = 'Please fill in every field and pick a service + time.';
      note.classList.add('error');
      return;
    }

    note.classList.remove('error');

    const message =
      `Hi Ahwenepa Gold, I'd like to book an appointment.%0A` +
      `Service: ${selectedService}%0A` +
      `Date: ${date}%0A` +
      `Time: ${selectedTime}%0A` +
      `Name: ${name}%0A` +
      `Phone: ${phone}`;

    const url = `https://wa.me/${SALON_WHATSAPP_NUMBER}?text=${message}`;
    window.open(url, '_blank');
  });

});