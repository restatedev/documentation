export const flightClient = {
  reserve: async (
    customerId: string,
    _req: { flightId: string; passengerName: string }
  ) => {
    console.info(`Flight booked for customer ${customerId}`);
    return "my id";
  },
  cancel: async (bookingId: string) => {
    console.info(`Flight cancelled for customer ${bookingId}`);
  },
  confirm: async (bookingId: string) => {
    console.info(`Flight confirmed for customer ${bookingId}`);
  },
};

export const paymentClient = {
  charge: async (paymentInfo: string, paymentId: string) => {},

  refund: async (paymentId: string) => {},
};
