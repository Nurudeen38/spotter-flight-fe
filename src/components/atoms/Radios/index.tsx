import styled from "styled-components";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

type IRadioItem = {
  label: string;
  value: string;
};

interface IProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  items: IRadioItem[];
}

const Radios = <T extends FieldValues>({ control, name, items }: IProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <ToggleContainer className="radios">
          {items.map((item) => (
            <ToggleButton
              key={item.value}
              type="button"
              $isActive={field.value === item.value}
              onClick={() => field.onChange(item.value)}
            >
              {item.label}
            </ToggleButton>
          ))}
        </ToggleContainer>
      )}
    />
  );
};

export { Radios };

const ToggleContainer = styled.div`
  display: flex;
  gap: 0;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--border);
  background: var(--background-elevated);
  width: 100%;
`;

const ToggleButton = styled.button<{ $isActive: boolean }>`
  flex: 1;
  padding: 0.625rem 1.5rem;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
  
  background: ${({ $isActive }) => 
    $isActive ? 'var(--primary)' : 'var(--background-elevated)'};
  color: ${({ $isActive }) => 
    $isActive ? 'var(--background, #0f0f23)' : 'var(--text-secondary)'};
  
  &:hover {
    background: ${({ $isActive }) => 
      $isActive ? 'var(--primary)' : 'var(--background-card)'};
    color: ${({ $isActive }) => 
      $isActive ? 'var(--background, #0f0f23)' : 'var(--text)'};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary);
    z-index: 1;
    position: relative;
  }
  
  &:first-child {
    border-radius: 9px 0 0 9px;
  }
  
  &:last-child {
    border-radius: 0 9px 9px 0;
  }
`;
