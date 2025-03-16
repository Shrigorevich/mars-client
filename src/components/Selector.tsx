import { SelectorOption } from "../models/SelectorOption";
import { Field, Label } from "./fieldset";
import { Select } from "./select";

function Selector({
    name,
    options,
    label,
    onChange,
    defaultValue,
}: {
    name?: string;
    options: SelectorOption[];
    label?: string;
    defaultValue?: number;
    onChange?: (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => void;
}) {
    return (
        <Field>
            {label && <Label>{label}</Label>}
            <Select defaultValue={defaultValue} onChange={onChange} name={name}>
                {options.map((option) => (
                    <option value={option.id} key={option.id}>
                        {option.value}
                    </option>
                ))}
            </Select>
        </Field>
    );
}

export default Selector;
