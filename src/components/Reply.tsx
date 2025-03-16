import { useState } from "react";
import { TicketReply } from "../models/TicketReply";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { updateReply } from "../api/trackerApi";

function Reply({ reply }: { reply: TicketReply }) {
    const [replyForm, setReplyForm] = useState<TicketReply>({ ...reply });
    const [editing, setEditing] = useState<boolean>(false);

    const handleFormChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReplyForm({
            ...replyForm,
            [e.target.name]: e.target.value,
        });
    };

    const submit = () => {
        updateReply(reply.ticketId, reply.id, {
            content: replyForm.content,
        }).then((resp) => {
            if (resp.isSuccess) {
                reply.content = replyForm.content;
                setEditing(false);
            } else {
                alert("Error updating reply");
            }
        });
    };

    const cancel = () => {
        setEditing(false);
        setReplyForm({ ...replyForm, content: reply.content });
    };

    if (editing) {
        return (
            <div className="flex items-start space-x-4 mb-4">
                <div className="min-w-0 flex-1">
                    <form action="#" className="relative">
                        <div className="rounded-lg bg-neutral-700 outline outline-1 -outline-offset-1 outline-gray-300 ">
                            <textarea
                                id="content"
                                name="content"
                                rows={2}
                                placeholder="Add your comment..."
                                className="block w-full resize-none px-3 py-1 text-sm text-gray-300 focus:outline-0 sm:text-sm/6"
                                value={replyForm.content}
                                onChange={handleFormChange}
                            />

                            <div aria-hidden="true" className="py-1">
                                <div className="py-px">
                                    <div className="h-9" />
                                </div>
                            </div>
                        </div>

                        <div className="absolute inset-x-0 bottom-0 py-2 pl-3 pr-2">
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    className="rounded-md bg-gray-600 px-3 py-1 text-sm text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
                                    onClick={submit}
                                >
                                    save
                                </button>
                                <XMarkIcon
                                    className="size-5 text-red-400 self-end"
                                    onClick={cancel}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-w-0 flex-1 rounded-lg outline-1 p-2 mb-4 outline-neutral-500 bg-neutral-700 group relative">
            <div>
                <p className="mt-0.5 text-xs text-gray-400">
                    {new Date(reply.publishedAt).toLocaleString()}
                </p>
            </div>
            <div className="mt-2 text-sm text-gray-300">
                <p>{replyForm.content}</p>
            </div>

            <div
                className="absolute bottom-0 right-0 group-hover:block hidden pb-2 pr-2 cursor-pointer"
                onClick={() => setEditing(true)}
            >
                <PencilSquareIcon className="size-5 text-gray-400 hover:text-gray-200 cursor-pointer" />
            </div>
        </div>
    );
}

export default Reply;
