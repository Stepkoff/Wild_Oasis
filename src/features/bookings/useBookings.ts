import {useQuery} from "@tanstack/react-query";
import {getBookings} from "@/services/apiBookings.ts";
import {BookingDataType} from "@/app/Types.ts";
import {useSearchParams} from "react-router-dom";

export const useBookings = () => {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get('status')
  const filter = !filterValue || filterValue === 'all' ? null : {field: 'status', value: filterValue}

  const {isLoading, error, data: bookings} = useQuery<BookingDataType[]>({
    queryKey: ['bookings', filter],
    queryFn: () => getBookings({filter})
  })

  return {isLoading, error, bookings}
}