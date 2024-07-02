import {useSearchParams} from "react-router-dom";
import {Select} from "@/ui/Select.tsx";
import {ChangeEvent} from "react";


interface SortByProps {
  options: Array<{value: string, label: string}>
}

export const SortBy = ({options}: SortByProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select options={options} value={sortBy} $type={'white'} onChange={handleChange} />
  )
}