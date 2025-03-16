import { useState } from "react";
import { createReply } from "../api/trackerApi";
import { CreateReply } from "../models/CreateReply";

function NewReply({ ticketId }: { ticketId: number }) {
    const [replyForm, setReplyForm] = useState<CreateReply>({
        content: "",
    });

    const handleFormChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReplyForm({
            ...replyForm,
            [e.target.name]: e.target.value,
        });
    };

    const submit = () => {
        createReply(ticketId, replyForm).then((resp) => {
            if (resp.isSuccess) {
                window.location.reload();
            } else {
                alert("Error creating reply");
            }
        });
    };

    return (
        <div className="flex items-start space-x-4 mb-4">
            <div className="min-w-0 flex-1">
                <form action="#" className="relative">
                    <div className="rounded-lg bg-neutral-700 outline outline-1 -outline-offset-1 outline-gray-300 leading-none">
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
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewReply;
