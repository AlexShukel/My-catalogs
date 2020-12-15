import { ButtonBase, Icon, IconButton, Typography } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { useI18n } from "../i18n/I18nContext";

import css from "./PhotoField.module.css";

const defaultI18n = {
    photoFieldLabel: "Click to browse image or drop file here",
    fullscreen: "Open fullscreen view",
    removePhoto: "Remove photo",
    editDescription: "Edit description",
};

interface Props {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    img: string;
    height: number;
    width: number;
    editable: boolean;
}

const PhotoField = ({ handleChange, img, height, width, editable }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const i18n = useI18n(defaultI18n, "photoField");
    const [showButtons, setShowButtons] = useState(false);

    return (
        <div style={{ height, width }} className={css["photo-field"]}>
            {img ? (
                <div
                    onMouseOver={() => editable && img && setShowButtons(true)}
                    onMouseLeave={() => setShowButtons(false)}
                    style={{
                        backgroundImage: `url(${img})`,
                    }}
                    className={css["image"]}
                >
                    {showButtons && (
                        <IconButton>
                            <Icon>delete</Icon>
                        </IconButton>
                    )}
                </div>
            ) : (
                <ButtonBase
                    onClick={(e) => {
                        e.stopPropagation();
                        inputRef.current?.click();
                    }}
                    className={css["photo-field__placeholder-wrapper"]}
                >
                    <div>
                        <Icon>insert_photo</Icon>
                        <Typography>{i18n.photoFieldLabel}</Typography>
                    </div>
                </ButtonBase>
            )}
            <input
                style={{ display: "none" }}
                type="file"
                accept="image/x-png,image/jpeg"
                onChange={handleChange}
                onClick={(e) => e.stopPropagation()}
                ref={inputRef}
                value=""
                multiple={false}
            />
        </div>
    );
};

export default PhotoField;
