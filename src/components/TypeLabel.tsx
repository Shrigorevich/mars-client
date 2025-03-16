import { BadgedProperty } from "../shared/BadgedProperty";
import { ticketType } from "../shared/TicketType";
import { Badge } from "./badge";

function TypeLabel({ propId }: { propId: number }) {
    const prop: BadgedProperty = ticketType[propId] ?? {
        title: "undefined",
        color: "zinc",
    };

    return <Badge color={prop.color}>{prop.title}</Badge>;
}

export default TypeLabel;
