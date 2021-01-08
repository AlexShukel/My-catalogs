import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";

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
                className={classNames(
                    { [css["hide"]]: !isEditing },
                    css["edit-text"]
                )}
                onClick={(e) => e.stopPropagation()}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <span className={isEditing ? css["hide"] : undefined}>{text}</span>
        </React.Fragment>
    );
};

export default TextEditor;
