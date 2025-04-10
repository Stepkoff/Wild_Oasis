import {TableOperations} from "@/ui/TableOperations.tsx";
import {Filter} from "@/ui/Filter.tsx";
import {SortBy} from "@/ui/SortBy.tsx";
import {bookingSortOptions, bookingTableOperationsValues} from "./bookingsConsts.ts";

export const BookingTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={bookingTableOperationsValues}
      />

      <SortBy
        options={bookingSortOptions}
      />
    </TableOperations>
  );
}

