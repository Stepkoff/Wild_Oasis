import {TableOperations} from "@/ui/TableOperations.tsx";
import {Filter} from "@/ui/Filter.tsx";
import {cabinTableOperationsValues, cabinSortOptions} from "@/features/cabins/cabinConsts.ts";
import {SortBy} from "@/ui/SortBy.tsx";

export const CabinTableOperations = () => {

  return (
    <TableOperations>
      <Filter filterField={'discount'} options={cabinTableOperationsValues} />
      <SortBy options={cabinSortOptions}/>
    </TableOperations>
  )
}