import {BookingRow} from "./BookingRow";
import {Menus} from '@/ui/Menus.tsx'
import {Table} from "@/ui/Table.tsx";
import {Empty} from "@/ui/Empty.tsx";
import {useBookings} from "@/features/bookings/useBookings.ts";
import {Spinner} from "@/ui/Spinner.tsx";
import {Pagination} from "@/ui/Pagination.tsx";

export const BookingTable = () => {
  const {bookings, isLoading} = useBookings();

  if(isLoading) return (
    <Spinner/>
  )

  if(bookings === undefined || !bookings.length) return (
    <Empty resource={'Bookings'}/>
  )

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={5}/>
        </Table.Footer>
      </Table>
    </Menus>
  );
}

