import {useQuery} from "@tanstack/react-query";
import {getBookings} from "@/services/apiBookings.ts";
import {BookingDataType} from "@/app/Types.ts";
import {useSearchParams} from "react-router-dom";

export const useBookings = () => {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get('status')
  const filter = !filterValue || filterValue === 'all'
      ? null
      : {field: 'status', value: filterValue}
      // : {field: 'totalPrice', value: 5000, method: 'gte' as MethodSupabase}
      // to implement multiple filters just pass an array of objects and loop over that array in "apiBookings" to apply all filters

  const sortByRow = searchParams.get('sortBy') || 'startDate-desc'
  const [field, direction] = sortByRow.split('-')
  const sortBy = {field, direction}

  const {isLoading, error, data: bookings} = useQuery<BookingDataType[]>({
    queryKey: ['bookings', filter, sortBy.field, sortBy.direction],
    queryFn: () => getBookings({filter, sortBy})
  })

  return {isLoading, error, bookings}
}