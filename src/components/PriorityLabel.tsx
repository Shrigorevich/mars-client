import { BadgedProperty } from "../shared/BadgedProperty";
import { ticketPriority } from "../shared/TicketPriority";
import { Badge } from "./badge";

function PriorityLabel({ propId }: { propId: number }) {
    const prop: BadgedProperty = ticketPriority[propId] ?? {
        title: "undefined",
        color: "zinc",
    };

    return <Badge color={prop.color}>{prop.title}</Badge>;
}

export default PriorityLabel;
