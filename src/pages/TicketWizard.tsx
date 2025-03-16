import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Ticket } from "../models/Ticket";
import { Field, Label } from "../components/fieldset";
import { Textarea } from "../components/textarea";
import { Text } from "../components/text";
import Selector from "../components/Selector";
import { ticketStatus } from "../shared/TicketStatus";
import { SelectorOption } from "../models/SelectorOption";
import { ticketType } from "../shared/TicketType";
import { BadgedProperty } from "../shared/BadgedProperty";
import { ticketPriority } from "../shared/TicketPriority";
import { Heading } from "../components/heading";
import {
    createTicket,
    getReplies,
    getTicket,
    updateTicket,
} from "../api/trackerApi";
import { CreateTicket } from "../models/CreateTicket";
import { ApiError } from "../models/ApiError";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { TicketReply } from "../models/TicketReply";
import Reply from "../components/Reply";
import NewReply from "../components/NewReply";

function TicketWizard() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [ticket, setTicket] = useState<Ticket | CreateTicket>(getNewTicket());
    const [replies, setReplies] = useState<TicketReply[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ApiError | null>(null);
    const [mode, setMode] = useState<"create" | "update">("create");

    useEffect(() => {
        console.log("use effect");
        if (location.state) {
            setTicket(location.state as Ticket);
            setMode("update");
        } else {
            if (!id) return;
            setLoading(true);

            Promise.all([
                getTicket(Number(id)).then((response) => {
                    if (response.isSuccess) {
                        setTicket(response.payload as Ticket);
                        setMode("update");
                    } else {
                        setError(response.payload as ApiError);
                    }
                }),
                getReplies(Number(id)).then((response) => {
                    if (response.isSuccess) {
                        console.log(response.payload);
                        setReplies(response.payload as TicketReply[]);
                    } else {
                        setError(response.payload as ApiError);
                    }
                }),
            ]).finally(() => setLoading(false));
        }
    }, []);

    const handleFormChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setTicket(
            ticket && {
                ...ticket,
                [e.target.name]: isNumericSelect(e.target.name)
                    ? Number(e.target.value)
                    : e.target.value,
            }
        );
    };

    const submitForm = () => {
        if (mode === "create") {
            setLoading(true);
            createTicket(ticket)
                .then((resp) => {
                    if (resp.isSuccess) {
                        navigate(`/ticket/${resp.payload}`);
                        window.location.reload();
                    } else {
                        alert("Error creating ticket");
                    }
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(true);
            updateTicket(Number(id), ticket)
                .then((resp) => {
                    if (resp.isSuccess) {
                        navigate(`/ticket/${id}`);
                        window.location.reload();
                    } else {
                        alert("Error updating ticket");
                    }
                })
                .finally(() => setLoading(false));
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div className="text-red-500">{error.message}</div>;
    }
    return (
        <div className="w-full lg:w-2/3 mx-auto mt-8">
            <div className="flex w-full items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10">
                {mode === "create" ? (
                    <Input
                        className="basis-4/5"
                        placeholder="Title"
                        onChange={handleFormChange}
                        name="title"
                    />
                ) : (
                    <div>
                        <Heading>
                            #{(ticket as Ticket).id} - {ticket.title}
                        </Heading>
                    </div>
                )}
                <Button color="sky" onClick={submitForm}>
                    Save changes
                </Button>
            </div>
            <div className="mt-4">
                {mode === "update" ? <NewReply ticketId={Number(id)} /> : null}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <Text>Type</Text>
                            <Selector
                                name="ticketTypeId"
                                defaultValue={ticket.ticketTypeId}
                                options={toOptions(ticketType)}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <Text>Priority</Text>
                            <Selector
                                name="priorityId"
                                defaultValue={ticket.priorityId}
                                options={toOptions(ticketPriority)}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <Text>Status</Text>
                            <Selector
                                name="statusId"
                                defaultValue={ticket.statusId}
                                options={toOptions(ticketStatus)}
                                onChange={handleFormChange}
                            />
                        </div>
                        {mode === "update" && (
                            <div className="flex justify-between items-center mb-4">
                                <Text>Created</Text>
                                <Text>
                                    {new Date(
                                        (ticket as Ticket).createdAt
                                    ).toLocaleString()}
                                </Text>
                            </div>
                        )}
                        {mode === "update" && (
                            <div className="flex justify-between items-center mb-4">
                                <Text>Updated</Text>
                                <Text>
                                    {new Date(
                                        (ticket as Ticket).updatedAt
                                    ).toLocaleString()}
                                </Text>
                            </div>
                        )}
                        <div className="mb-4">
                            <Field>
                                <Label>
                                    <Text>Description</Text>
                                </Label>
                                <Textarea
                                    name="description"
                                    onChange={handleFormChange}
                                    defaultValue={ticket.description}
                                />
                            </Field>
                        </div>
                    </div>
                    <div>
                        {replies.map((reply) => (
                            <Reply key={reply.id} reply={reply} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function isNumericSelect(name: string): boolean {
    return ["ticketTypeId", "priorityId", "statusId"].includes(name);
}

function toOptions(dict: { [key: number]: BadgedProperty }): SelectorOption[] {
    return Object.entries(dict).map(([key, value]) => ({
        id: Number(key),
        value: value.title,
    }));
}

function getNewTicket(): CreateTicket {
    return {
        title: "",
        applicationId: 1,
        installedEnvironmentId: 1,
        description: "",
        ticketTypeId: 1,
        priorityId: 1,
        statusId: 1,
    };
}

export default TicketWizard;
