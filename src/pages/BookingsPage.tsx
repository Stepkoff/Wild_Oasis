import {Heading} from "../ui/Heading.js";
import {Row} from "../ui/Row";
import {BookingTable, BookingTableOperations} from "@/features/bookings";

export const BookingsPage = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations/>
      </Row>
      <BookingTable/>

    </>
  );
}


