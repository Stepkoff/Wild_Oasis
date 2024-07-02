import {useQuery} from "@tanstack/react-query";
import {getCabins} from "@/services/apiCabins.ts";
import {Cabin} from "@/app/Types.ts";
import {Spinner} from "@/ui/Spinner.tsx";
import {CabinRow} from "@/features/cabins/CabinRow.tsx";
import {Table} from "@/ui/Table.tsx";
import {Menus} from "@/ui/Menus.tsx";
import {useSearchParams} from "react-router-dom";
import {Empty} from "@/ui/Empty.tsx";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);
//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

export const CabinTable = () => {
  const [searchParams] = useSearchParams();

  const {data: cabins, isLoading} = useQuery<Cabin[]>({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });

  if(isLoading) return (
    <Spinner/>
  )

  if (!cabins?.length) return <Empty resource="cabins" />;
  // 1. Filtering
  const filterValue = searchParams.get('discount') || 'all'

  let filteredCabins:Cabin[] | undefined = []

  if(filterValue === 'all') {
    filteredCabins = cabins
  }
  if(filterValue === 'withDiscount') {
    filteredCabins = cabins.filter(cabin => cabin.discount)
  }
  if(filterValue === 'noDiscount') {
    filteredCabins = cabins.filter(cabin => !cabin.discount)
  }

  // 2. Sorting
  type Field = keyof Cabin
  const sortBy = searchParams.get('sortBy') || 'cabinName-asc';
  const [field, direction] = sortBy.split('-') as [Field, string]

  const modifier = direction === 'asc' ? 1 : -1;

  const sortedCabins = filteredCabins?.sort((a, b) => {
    if(field !== 'cabinName') {
      //eslint-disable-next-line
      //@ts-ignore
      return (a[field] - b[field]) * modifier
    }
    if (a.cabinName < b.cabinName) {
      return -modifier;
    } else if (a.cabinName > b.cabinName) {
      return modifier;
    } else {
      return 0;
    }
  })
  return (
    <Menus>
      <Table columns={'0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'}>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body data={sortedCabins} render={(cabin) => (<CabinRow key={cabin.id} cabin={cabin} />)} />
      </Table>
    </Menus>
  )
}