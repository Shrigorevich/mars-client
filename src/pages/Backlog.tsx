import { useEffect, useState } from "react";
import TicketsTable from "../components/TicketsTable";
import { Ticket } from "../models/Ticket";
import { getTickets } from "../api/trackerApi";
import { ApiError } from "../models/ApiError";
import { Heading } from "../components/heading";
import { Button } from "../components/button";
import { useNavigate } from "react-router-dom";

function Backlog() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ApiError | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getTickets()
            .then((resp) => {
                if (resp.isSuccess) {
                    setTickets(resp.payload as Ticket[]);
                } else {
                    setError(resp.payload as ApiError);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    const createTicket = () => {
        navigate("/ticket/new");
        window.location.reload();
    };

    return (
        <div className="w-full lg:w-2/3 mx-auto mt-8">
            {error ? (
                <div className="text-red-500">{error.message}</div>
            ) : (
                <div>
                    <div className="flex w-full items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10">
                        <Heading>Backlog</Heading>
                        <Button color="sky" onClick={createTicket}>
                            Create ticket
                        </Button>
                    </div>

                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <TicketsTable tickets={tickets} />
                    )}
                </div>
            )}
        </div>
    );
}

export default Backlog;
