import styled from "styled-components";
import {ChangeEvent} from "react";

const StyledSelect = styled.select<{$type?: 'white'}>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
  ${(props) =>
    props?.$type === "white"
      ? "var(--color-grey-100)"
      : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

type SelectOption = {value: string, label: string}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  $type?: 'white' | undefined;
}

export const Select = ({ options, value, onChange, ...props }: SelectProps) => {
    return (
        <StyledSelect value={value} onChange={onChange} {...props}>
            {options.map((option) => (
                <option value={option.value} key={option.value}>
                    {option.label}
                </option>
            ))}
        </StyledSelect>
    );
}