import { ApiError } from "../models/ApiError";
import { ApiResponse } from "../models/ApiResponse";
import { CreateTicket } from "../models/CreateTicket";
import { TicketReply } from "../models/TicketReply";
import { Ticket } from "../models/Ticket";
import { UpdateTicket } from "../models/UpdateTicket";
import { UpdateReply } from "../models/UpdateReply";
import { CreateReply } from "../models/CreateReply";

const baseUrl = import.meta.env.VITE_API_URL;

export async function getTickets(): Promise<ApiResponse<Ticket[]>> {
    try {
        const response = await fetch(`${baseUrl}/tickets`, {
            method: "GET",
        });
        return await prepareResponse<Ticket[]>(response);
    } catch (ex) {
        return failureResponse(unhandledError());
    }
}

export async function getTicket(id: number): Promise<ApiResponse<Ticket>> {
    try {
        const response = await fetch(`${baseUrl}/tickets/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        return await prepareResponse<Ticket>(response);
    } catch (ex) {
        return failureResponse(unhandledError());
    }
}

export async function updateTicket(
    id: number,
    ticket: UpdateTicket
): Promise<ApiResponse<null>> {
    try {
        const response = await fetch(`${baseUrl}/tickets/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ticket),
        });

        return await prepareResponse<null>(response);
    } catch (ex) {
        console.log(ex);
        return failureResponse(unhandledError());
    }
}

export async function createTicket(
    ticket: CreateTicket
): Promise<ApiResponse<number>> {
    try {
        const response = await fetch(`${baseUrl}/tickets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ticket),
        });

        return await prepareResponse<number>(response);
    } catch (ex) {
        return failureResponse(unhandledError());
    }
}

export async function getReplies(
    ticketId: number
): Promise<ApiResponse<TicketReply[]>> {
    try {
        const response = await fetch(`${baseUrl}/tickets/${ticketId}/replies`, {
            method: "GET",
        });
        return await prepareResponse<TicketReply[]>(response);
    } catch (ex) {
        return failureResponse(unhandledError());
    }
}

export async function updateReply(
    ticketId: number,
    replyId: number,
    reply: UpdateReply
): Promise<ApiResponse<null>> {
    try {
        const response = await fetch(
            `${baseUrl}/tickets/${ticketId}/replies/${replyId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reply),
            }
        );
        return await prepareResponse<null>(response);
    } catch (ex) {
        return failureResponse(unhandledError());
    }
}

export async function createReply(
    ticketId: number,
    reply: CreateReply
): Promise<ApiResponse<null>> {
    try {
        const response = await fetch(`${baseUrl}/tickets/${ticketId}/replies`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reply),
        });
        return await prepareResponse<null>(response);
    } catch (ex) {
        return failureResponse(unhandledError());
    }
}

async function prepareResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (response.status === 204) return successResponse(null);

    const payload = await response.json();
    if (response.ok) {
        return successResponse(payload);
    }
    return failureResponse(payload);
}

function successResponse(payload: any): ApiResponse<any> {
    return {
        isSuccess: true,
        payload: payload,
    };
}

function failureResponse(error: ApiError): ApiResponse<any> {
    return {
        isSuccess: false,
        payload: error,
    };
}

function unhandledError(): ApiError {
    return {
        code: "unhandled",
        message: "Unhandled API error",
    };
}
