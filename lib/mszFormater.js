const mszFormater = (data) => {
  return `Dear ${data.name},

Thank you for booking your flight with us. We are pleased to confirm your booking details:

- Booking Status: ${data.bookingStatus}
- Flight Date: ${data.date}
- Flight Time: ${data.time}
- Departure City: ${data.departureCity}
- Destination City: ${data.destinationCity}
- Total Price: $${data.totalPrice}
- Number of Seats: ${data.numberOfSeats}
- Flight ID: ${data.flightId}

If you have any questions or need to make changes to your booking, please don't hesitate to reach out to us.

You can contact us at:
- Email: ${data.email}
- Phone: ${data.phone}

We look forward to having you on board!

Best regards,
Your Flight Booking Team
`;
};

module.exports = { mszFormater };
