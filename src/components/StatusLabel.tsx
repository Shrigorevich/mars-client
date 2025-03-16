import { BadgedProperty } from "../shared/BadgedProperty";
import { ticketStatus } from "../shared/TicketStatus";
import { Badge } from "./badge";

function StatusLabel({ propId }: { propId: number }) {
    const prop: BadgedProperty = ticketStatus[propId] ?? {
        title: "undefined",
        color: "zinc",
    };

    return <Badge color={prop.color}>{prop.title}</Badge>;
}

export default StatusLabel;
