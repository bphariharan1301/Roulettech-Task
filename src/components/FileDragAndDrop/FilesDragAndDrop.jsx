import React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";

// Custom CSS
import "./FilesDragAndDrop.css";

function FilesDragAndDrop({ children, count, formats }) {
    const drop = useRef(null);
    const drag = useRef(null);
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        drop.current.addEventListener("dragover", handleDragOver);
        drop.current.addEventListener("drop", handleDrop);
        drop.current.addEventListener("dragenter", handleDragEnter);
        drop.current.addEventListener("dragleave", handleDragLeave);

        return () => {
            drop.current.removeEventListener("dragover", handleDragOver);
            drop.current.removeEventListener("drop", handleDrop);
            drop.current.removeEventListener("dragenter", handleDragEnter);
            drop.current.removeEventListener("dragleave", handleDragLeave);
        };
    }, []);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.target !== drag.current) {
            setDragging(true);
        }
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.target === drag.current) {
            setDragging(false);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        // this is required to convert FileList object to array
        const files = [...e.dataTransfer.files];
        setDragging(false);
        // check if the provided count prop is less than uploaded count of files
        if (count && count < files.length) {
            console.log(
                `Only ${count} file${
                    count !== 1 ? "s" : ""
                } can be uploaded at a time`
            );
            return;
        }

        // check if some uploaded file is not in one of the allowed formats
        if (
            formats &&
            files.some(
                (file) =>
                    !formats.some((format) =>
                        file.name.toLowerCase().endsWith(format.toLowerCase())
                    )
            )
        ) {
            console.log(
                `Only following file formats are acceptable: ${formats.join(
                    ", "
                )}`
            );
            return;
        }

        if (files && files.length) {
            onUpload(files);
        }
    };

    const onUpload = (files) => {
        console.log("files", files);
    };
    return (
        <div ref={drop} className="FilesDragAndDrop">
            {dragging && (
                <div className="FilesDragAndDrop__placeholder">
                    Drop that file down low
                    <span role="img" aria-label="emoji" className="area__icon">
                        &#128526;
                    </span>
                </div>
            )}
            {children}
        </div>
    );
}

export default FilesDragAndDrop;
