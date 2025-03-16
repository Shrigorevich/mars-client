import { useState } from "react";
import { Ticket } from "../models/Ticket";
import {
    Pagination,
    PaginationGap,
    PaginationList,
    PaginationNext,
    PaginationPage,
    PaginationPrevious,
} from "./pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./table";
import StatusLabel from "./StatusLabel";
import PriorityLabel from "./PriorityLabel";
import TypeLabel from "./TypeLabel";
import { Link } from "./link";

function TicketsTable({ tickets }: { tickets: Ticket[] }) {
    const pageSize = 10;
    const pages = Array.from(
        { length: Math.ceil(tickets.length / pageSize) },
        (_, i) => tickets.slice(i * pageSize, i * pageSize + pageSize)
    );

    const [currentPage, setCurrentPage] = useState<number>(0);

    const handlePaginatorClick = (pageNumber: number): void => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeader>Number</TableHeader>
                        <TableHeader>Title</TableHeader>
                        <TableHeader>Type</TableHeader>
                        <TableHeader>Priority</TableHeader>
                        <TableHeader>Status</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pages.length > 0
                        ? pages[currentPage].map((ticket) => (
                              <TableRow key={ticket.id}>
                                  <TableCell className="font-medium">
                                      {ticket.id}
                                  </TableCell>
                                  <TableCell className="font-medium">
                                      <Link
                                          href={`/ticket/${ticket.id}`}
                                          state={ticket}
                                      >
                                          {ticket.title}
                                      </Link>
                                  </TableCell>
                                  <TableCell>
                                      <TypeLabel propId={ticket.ticketTypeId} />
                                  </TableCell>
                                  <TableCell>
                                      <PriorityLabel
                                          propId={ticket.priorityId}
                                      />
                                  </TableCell>
                                  <TableCell>
                                      <StatusLabel propId={ticket.statusId} />
                                  </TableCell>
                              </TableRow>
                          ))
                        : null}
                </TableBody>
            </Table>
            <Pagination className="mt-6">
                <PaginationPrevious
                    number={currentPage - 1}
                    isDisabled={currentPage <= 0}
                    onClick={handlePaginatorClick}
                />
                <PaginationList>
                    {pages.map((_, i) => (
                        <PaginationPage
                            key={i}
                            number={i}
                            onClick={handlePaginatorClick}
                        >
                            {i + 1}
                        </PaginationPage>
                    ))}
                </PaginationList>
                <PaginationNext
                    number={currentPage + 1}
                    isDisabled={currentPage >= pages.length - 1}
                    onClick={handlePaginatorClick}
                />
            </Pagination>
        </div>
    );
}

export default TicketsTable;
