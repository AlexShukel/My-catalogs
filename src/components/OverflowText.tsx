import React, { useEffect, useRef, useState } from "react";
import { Tooltip, withStyles } from "@material-ui/core";

const StyledTooltip = withStyles({
    tooltip: {
        fontSize: 18,
    },
})(Tooltip);

interface Props {
    text: string;
    maxTextWidth: number;
}

const OverflowText = ({ text, maxTextWidth }: Props) => {
    const hiddenTextRef = useRef<HTMLDivElement | null>(null);
    const textRef = useRef<HTMLDivElement | null>(null);

    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        if (hiddenTextRef.current && textRef.current) {
            if (
                hiddenTextRef.current.offsetWidth >=
                textRef.current.offsetWidth - 5
            )
                setShowTooltip(true);
            else setShowTooltip(false);
        }
    }, [text]);

    return (
        <StyledTooltip
            title={text}
            placement="bottom-start"
            disableHoverListener={!showTooltip}
        >
            <div>
                <div
                    ref={hiddenTextRef}
                    style={{ maxWidth: maxTextWidth }}
                    className="hide"
                >
                    {text}
                </div>
                <div
                    ref={textRef}
                    style={{ maxWidth: maxTextWidth }}
                    className="text-ellipsis"
                >
                    {text}
                </div>
            </div>
        </StyledTooltip>
    );
};

export default OverflowText;
