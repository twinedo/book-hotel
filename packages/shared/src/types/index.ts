// types/index.ts
export type User = {
  id?: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  bookings?: Booking[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserLogin = Partial<User>

export type Hotel = {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  price: number;
  classHotel: number;
  rooms?: Room[];
  facilities: string;
  images: string;
  createdAt?: Date;
  bookings?: Booking[];
};

export type Room = {
  id: string;
  type: string;
  description: string;
  price: number;
  capacity: number;
  hotel?: Hotel;
  hotelId: string;
  facilities: string;
  refundable: boolean;
  totalCount: number;
  bookedCount: number;
  bookings?: Booking[];
  // Computed property (not in DB)
  availableCount?: number;
};

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export type Booking = {
  id: string;
  hotel?: Hotel;
  hotelId: string;
  room?: Room;
  roomId: string;
  user?: User | null;
  userId?: string | null;
  guestEmail?: string | null;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
  status: BookingStatus;
  createdAt?: Date;
  guestName: string;
  guestPhone: string;
  paymentMethod?: string | null;
  paymentAccountNumber?: string | null;
  notes?: string | null;
};

// Additional types for forms and UI states
export type BookingFormData = {
  hotelId: string;
  roomId: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  paymentMethod?: string;
  paymentAccountNumber?: string;
  checkIn: string;
  checkOut: string;
  notes?: string | null;
};

export type RoomAvailability = {
  roomId: string;
  availableCount: number;
  totalCount: number;
  bookedCount: number;
};

export type HotelWithRooms = Hotel & {
  rooms: (Room & { availableCount: number })[];
};

export type BookingWithDetails = Booking & {
  hotel: Pick<Hotel, 'name' | 'address' | 'city'>;
  room: Pick<Room, 'type' | 'price' | 'capacity'>;
};