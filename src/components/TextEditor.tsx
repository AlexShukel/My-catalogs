import React, { useEffect, useRef, useState } from "react";

import OverflowText from "./OverflowText";

import css from "./TextEditor.module.css";

interface Props {
    isEditing: boolean;
    initialText: string;
    onSubmit: (newText: string) => void;
}

const TextEditor = ({ isEditing, initialText, onSubmit }: Props) => {
    const isInitialRender = useRef(true);
    const [text, setText] = useState(initialText);

    useEffect(() => {
        if (!isEditing && !isInitialRender.current) {
            onSubmit(text);
        }
        isInitialRender.current = false;
        // WARNING: may be bugs
    }, [isEditing, text]);

    return (
        <React.Fragment>
            <input
                className={css["edit-text"]}
                onClick={(e) => e.stopPropagation()}
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ display: isEditing ? "inline-block" : "none" }}
            />
            <span className={isEditing ? "hide" : undefined}>
                <OverflowText text={initialText} maxTextWidth={300} />
            </span>
        </React.Fragment>
    );
};

export default TextEditor;
