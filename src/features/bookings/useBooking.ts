import {useQuery} from "@tanstack/react-query";
import {getBooking} from "@/services/apiBookings.ts";
import {useParams} from "react-router-dom";
import {BookingDataType} from "@/app/Types.ts";



export const useBooking = () => {
  const params = useParams()

  const {data: booking, isLoading, error} = useQuery<BookingDataType>({
    queryKey: ['booking'],
    queryFn: () => getBooking(Number(params.bookingId)),
    retry: false,
  })

  return {booking, isLoading, error}
}



