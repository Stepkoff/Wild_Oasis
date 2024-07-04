
export interface Cabin {
  id: number
  created_at: string
  cabinName: string
  maxCapacity: number
  regularPrice: number
  discount: number
  description: string
  imageUrl: string
  isCopy: boolean
}

export interface Guest {
  id: number
  created_at: string
  fullName: string
  email: string
  nationalID: string
  nationality: string
  countryFlag: string
}

export interface Settings {
  id: number
  created_at: string
  minBookingLength: number
  maxBookingLength: number
  maxGuestsPerBooking: number
  breakfastPrice: number
}

export interface Booking {
  id: number
  created_at: string
  startDate: string
  endDate: string
  numNights: number
  numGuests: number
  cabinPrice: number
  extrasPrice: number
  totalPrice: number
  status: 'unconfirmed' | 'checked-in' | 'checked-out',
  hasBreakfast: boolean
  isPaid: boolean
  observations: string
  cabinId: number
  guestId: number
}

export interface BookingDataType extends Booking{
  cabins: Pick<Cabin, 'cabinName'>,
  guests: Pick<Guest, 'fullName' | 'email'>,
}
