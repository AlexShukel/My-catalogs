import { Icon, Typography, useTheme } from "@material-ui/core";
import classNames from "classnames";
import React, { ReactElement } from "react";
import { useI18n } from "../i18n/I18nContext";

import css from "./DropPlace.module.css";

type ZoneState = "hidden" | "shown" | "highlighted";

const defaultI18n = {
    dropPlaceLabel: "Drop files here",
};

interface ZoneProps {
    zoneState: ZoneState;
    onDrop: (e: React.DragEvent) => void;
    onDragEnter: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
    zoneLabel: string;
    className?: string;
}

interface Props {
    handleDrop: (e: React.DragEvent) => void;
    className?: string;
    children?: (zoneProps: ZoneProps) => React.ReactNode;
}

export const DefaultDropPlaceHolder = ({
    className,
    zoneLabel,
    zoneState,
    ...other
}: ZoneProps) => {
    const {
        palette: {
            secondary: { dark },
        },
    } = useTheme();
    return (
        <div className={classNames(css["drop-place"], className)}>
            <div
                {...other}
                className={classNames(
                    css["drop-place__background"],
                    css[zoneState]
                )}
            >
                <Icon style={{ color: dark }}>get_app</Icon>
                <Typography style={{ color: dark }}>{zoneLabel}</Typography>
            </div>
        </div>
    );
};

const DropPlace = ({ handleDrop, children, className }: Props) => {
    const [zone, setZone] = React.useState<ZoneState>("hidden");

    const documentEnterTarget = React.useRef<EventTarget | null>(null);
    const zoneEnterTarget = React.useRef<EventTarget | null>(null);

    const { dropPlaceLabel } = useI18n(defaultI18n, "DropPlace");

    const onDrop = React.useCallback(
        (e: React.DragEvent) => {
            if (!e.dataTransfer) return;
            handleDrop(e);
        },
        [handleDrop]
    );

    const onDragEnter = React.useCallback(
        (e: React.DragEvent) => {
            const target = e.target;
            setTimeout(() => {
                zoneEnterTarget.current = target;
                setZone("highlighted");
            });
        },
        [setZone]
    );

    const onDragLeave = React.useCallback(
        (e: React.DragEvent) => {
            if (
                zoneEnterTarget.current === e.target &&
                zone === "highlighted"
            ) {
                setZone("shown");
            }
        },
        [zone, zoneEnterTarget]
    );

    React.useEffect(() => {
        const onDragOver = (e: DragEvent) => e.preventDefault();
        const onDragEnter = (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            documentEnterTarget.current = e.target;
            setZone("shown");
        };
        const onDragLeave = (e: DragEvent) => {
            if (documentEnterTarget.current === e.target) {
                e.preventDefault();
                e.stopPropagation();
                setZone("hidden");
            }
        };
        const onDrop = (e: DragEvent) => {
            e.preventDefault();
            setZone("hidden");
        };
        document.addEventListener("dragover", onDragOver);
        document.addEventListener("dragenter", onDragEnter);
        document.addEventListener("dragleave", onDragLeave);
        document.addEventListener("drop", onDrop);
        return () => {
            document.removeEventListener("dragover", onDragOver);
            document.removeEventListener("dragenter", onDragEnter);
            document.removeEventListener("dragleave", onDragLeave);
            document.removeEventListener("drop", onDrop);
        };
    }, []);

    return (children ?? DefaultDropPlaceHolder)({
        onDrop,
        onDragEnter,
        onDragLeave,
        zoneState: zone,
        zoneLabel: dropPlaceLabel,
        className,
    }) as ReactElement;
};

export default DropPlace;
