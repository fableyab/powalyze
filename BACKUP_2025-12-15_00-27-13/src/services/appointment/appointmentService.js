
const APPOINTMENTS_KEY = 'powalyze_appointments';

// Helper to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getStoredAppointments = () => {
  try {
    return JSON.parse(localStorage.getItem(APPOINTMENTS_KEY) || '[]');
  } catch {
    return [];
  }
};

const saveAppointments = (appointments) => {
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
};

export const appointmentService = {
  getAvailableSlots: async (date, consultantId) => {
    await delay(500);
    // Mock logic: randomly disable some slots for realism based on date hash
    const dateHash = date.getDate() + date.getMonth();
    const allSlots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
    
    // Simple mock availability logic
    const existingApps = getStoredAppointments().filter(a => 
      a.consultantId === consultantId && 
      new Date(a.date).toDateString() === date.toDateString() &&
      a.status !== 'cancelled'
    );
    
    const busySlots = existingApps.map(a => a.time);
    
    return allSlots.map(time => ({
      time,
      available: !busySlots.includes(time) && (dateHash + parseInt(time)) % 5 !== 0 // Random unavailable
    }));
  },

  createAppointment: async (data) => {
    await delay(800);
    
    const newAppointment = {
      id: `apt_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      ...data
    };

    const appointments = getStoredAppointments();
    appointments.push(newAppointment);
    saveAppointments(appointments);

    return newAppointment;
  },

  updateAppointment: async (id, updates) => {
    await delay(500);
    const appointments = getStoredAppointments();
    const index = appointments.findIndex(a => a.id === id);
    
    if (index === -1) throw new Error("Appointment not found");
    
    const updated = { ...appointments[index], ...updates, updatedAt: new Date().toISOString() };
    appointments[index] = updated;
    saveAppointments(appointments);
    
    return updated;
  },

  cancelAppointment: async (id, reason) => {
    return appointmentService.updateAppointment(id, { status: 'cancelled', cancellationReason: reason });
  },

  getAppointments: async (userId) => {
    await delay(600);
    // In demo mode or public booking, we might not have a userId for guest bookings
    // For authenticated client portal, we filter.
    const all = getStoredAppointments();
    if (!userId) return [];
    // Demo user sees all for demo purposes if ID is 'demo'
    if (userId === 'demo' || userId === 'demo-1') return all;
    return all.filter(a => a.userId === userId || a.email === userId); // Allow email lookup mock
  },

  getAppointmentById: async (id) => {
    await delay(300);
    return getStoredAppointments().find(a => a.id === id);
  }
};
