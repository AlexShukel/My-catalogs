import React, { useRef, useState } from "react";
import { Box, ButtonBase, Icon, Tooltip, Typography } from "@material-ui/core";
import classNames from "classnames";

import { StyledIconButton } from "../../App";
import DropPlace from "../containers/DropPlace";
import { useI18n } from "../i18n/I18nContext";
import PhotoView from "../containers/PhotoView";

import css from "./PhotoField.module.css";

const defaultI18n = {
    photoFieldLabel: "Click to browse image or drop file here",
    fullscreen: "Open fullscreen view",
    removePhoto: "Remove photo",
    editDescription: "Edit description",
};

interface Props {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDrop: (e: React.DragEvent) => void;
    handleDelete: () => void;
    img: string;
    height: number;
    width: number;
    editable: boolean;
    handleFullscreen?: () => void;
    label?: string;
    className?: string;
}

const PhotoField = ({
    handleChange,
    handleDrop,
    handleDelete,
    img,
    height,
    width,
    editable,
    handleFullscreen,
    label,
    className,
}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const i18n = useI18n(defaultI18n, "PhotoField");
    const [showButtons, setShowButtons] = useState(false);
    return (
        <div
            style={{ height, width }}
            className={classNames(className, css["photo-field"])}
        >
            {editable && !img ? (
                <React.Fragment>
                    <ButtonBase
                        onClick={(e) => {
                            e.stopPropagation();
                            inputRef.current?.click();
                        }}
                        className={css["photo-field__placeholder-wrapper"]}
                    >
                        <div>
                            <Icon>insert_photo</Icon>
                            <Typography>
                                {label ?? i18n.photoFieldLabel}
                            </Typography>
                        </div>
                    </ButtonBase>
                    <DropPlace handleDrop={handleDrop} />
                </React.Fragment>
            ) : (
                <PhotoView
                    onMouseOver={() => img && setShowButtons(true)}
                    onMouseLeave={() => setShowButtons(false)}
                    path={img}
                >
                    {showButtons && (
                        <div className={css["image__buttons"]}>
                            {editable && (
                                <Box className="button-margin">
                                    <Tooltip title={i18n.removePhoto}>
                                        <StyledIconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete();
                                            }}
                                        >
                                            <Icon>delete</Icon>
                                        </StyledIconButton>
                                    </Tooltip>
                                </Box>
                            )}

                            {handleFullscreen && (
                                <Box className="button-margin">
                                    <Tooltip title={i18n.fullscreen}>
                                        <StyledIconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleFullscreen();
                                            }}
                                        >
                                            <Icon>fullscreen</Icon>
                                        </StyledIconButton>
                                    </Tooltip>
                                </Box>
                            )}
                        </div>
                    )}
                </PhotoView>
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
