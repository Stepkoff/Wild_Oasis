import { getToday } from "../utils/helpers.js";
import supabase from "./supabase";

// export type MethodSupabase = 'gte' | 'lte' | 'eq'

type GetBookings = {
  filter: {
    field: string,
    value: string | number,
    // method: MethodSupabase
  } | null,
  sortBy: {
    field: string,
    direction: string,
  }
}
export const getBookings = async({filter, sortBy}: GetBookings) => {
  // const {data, error} = await supabase
  //   .from('bookings')
  //   .select('*, cabins(*), guests(*)')
  //   .select('id, created_at, startDate, endDate, numNights, status, totalPrice, cabins(cabinName), guests(fullName, email)')
  //   .select('*, cabins(cabinName), guests(fullName, email)')
  //   .order('created_at', {ascending: true});
  //   .eq(filter?.field, filter?.value)
  //   .lte('totalPrice', 5000)
  //   .gte('totalPrice', 5000)

  let query  = supabase
    .from('bookings')
    .select('*, cabins(cabinName), guests(fullName, email)')
    // .order(sortBy.field, {ascending: false});

  // Filter
  if(filter) {
    query = query.eq(filter.field, filter.value)
  }
  // if(filter !== null) {
  //   query = query[filter.method || 'eq'](filter.field, filter.value)
  // }

  // SORTING
  if(sortBy) {
    query = query.order(sortBy.field, {ascending: sortBy.direction === 'asc'})
  }

  const {data, error} = await query
  if(error) {
    console.error(error);
    throw new Error('Bookings could not be leaded.')
  }
  return data;
}

export const getBooking = async (id: number) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();
  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }
  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export const getBookingsAfterDate = async(date: Date) =>  {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("BookingsPage could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export const getStaysAfterDate = async (date: Date) => {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("BookingsPage could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check-out today
export const getStaysTodayActivity = async() => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("BookingsPage could not get loaded");
  }
  return data;
}

export const updateBooking = async (id: number, obj: {'s': string}) => {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export const deleteBooking = async (id: number) => {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
