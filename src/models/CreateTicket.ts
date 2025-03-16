export interface CreateTicket {
    title?: string;
    applicationId: number;
    applicationName?: string;
    description?: string;
    url?: string;
    stackTrace?: string;
    device?: string;
    browser?: string;
    resolution?: string;
    priorityId: number;
    statusId: number;
    userId?: number;
    userOid?: string;
    installedEnvironmentId: number;
    ticketTypeId: number;
    createdByOid?: string;
}
