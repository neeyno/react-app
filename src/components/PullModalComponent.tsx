import React, { useState } from "react";

interface PullModalProps {
    pullModal: string[] | null;
    onClose: () => void;
}

function PullModalComponent({ pullModal, onClose }: PullModalProps) {
    const [showModal, setShowModal] = useState(pullModal !== null);

    const closeModal = () => {
        setShowModal(false);
        onClose();
    };

    return (
        <>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 ">
                    <div className="bg-white rounded p-4">
                        <div className="flex ">
                            <button
                                className="bg-red-500 text-white px-4 py-2 my-2 rounded ml-auto mr-1"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                        <div className="flex flex-wrap">
                            {pullModal?.map((item, index) => (
                                <div
                                    className="m-1 border border-gray-500 p-2 rounded"
                                    key={index}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default PullModalComponent;
