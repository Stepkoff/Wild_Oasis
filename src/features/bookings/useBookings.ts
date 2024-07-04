import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getBookings} from "@/services/apiBookings.ts";
import {BookingDataType} from "@/app/Types.ts";
import {useSearchParams} from "react-router-dom";
import {PAGE_SIZE} from "@/utils/constants.ts";

export const useBookings = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // FILTER
  const filterValue = searchParams.get('status')
  const filter = !filterValue || filterValue === 'all'
    ? null
    : {field: 'status', value: filterValue};
    // : {field: 'totalPrice', value: 5000, method: 'gte' as MethodSupabase}
    // to implement multiple filters just pass an array of objects and loop over that array in "apiBookings" to apply all filters

  // SORT
  const sortByRow = searchParams.get('sortBy') || 'startDate-desc'
  const [field, direction] = sortByRow.split('-')
  const sortBy = {field, direction}

  // PAGINATION
  const currentPage = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // QUERY
  const {
    isLoading,
    error,
    data: { data: bookings, count } = {}
  } = useQuery<{data: BookingDataType[], count: number | null}>({
    queryKey: ['bookings', filter, sortBy, currentPage],
    queryFn: () => getBookings({filter, sortBy, currentPage})
  })

  //PRE-FETCHING
  if(count && (Math.ceil(count / PAGE_SIZE) > currentPage)) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, currentPage+1],
      queryFn: () => getBookings({filter, sortBy, currentPage: currentPage+1})
    })
  }

  return {isLoading, error, bookings, count}
}