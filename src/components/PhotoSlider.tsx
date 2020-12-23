import React from "react";
import {
    IconButton,
    Icon,
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails,
} from "@material-ui/core";

import { useI18n } from "./i18n/I18nContext";
import { Photo } from "../objects/Photo";

import css from "./PhotoSlider.module.css";

const defaultI18n = {
    description: "Description",
};

interface Props {
    photos: Photo[];
    initialIndex: number;
    closeSlider: () => void;
}

const PhotoSlider = ({ closeSlider, initialIndex, photos }: Props) => {
    const [index, setIndex] = React.useState(initialIndex);

    const i18n = useI18n(defaultI18n, "PhotoSlider");

    const nextPhoto = () => photos.length - 1 > index && setIndex(index + 1);
    const prevPhoto = () => index > 0 && setIndex(index - 1);

    const containerRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        const listener = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                closeSlider();
            }
        };
        document.addEventListener("click", listener);
        return () => document.removeEventListener("click", listener);
    });

    return (
        <div ref={containerRef} className={css["slider"]}>
            <div className={css["slider__container"]}>
                <IconButton
                    className={css["slider__btn"]}
                    onClick={prevPhoto}
                    disabled={index === 0}
                >
                    <Icon>arrow_back</Icon>
                </IconButton>
                <img src={photos[index].photo} width={600} height={400} />
                <IconButton
                    onClick={nextPhoto}
                    disabled={index === photos.length - 1}
                >
                    <Icon>arrow_forward</Icon>
                </IconButton>
            </div>
            {photos[index].description && (
                <Accordion className={css["slider__description"]}>
                    <AccordionSummary
                        expandIcon={<Icon fontSize="small">expand_more</Icon>}
                    >
                        <Typography>{i18n.description}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{photos[index].description}</Typography>
                    </AccordionDetails>
                </Accordion>
            )}
        </div>
    );
};

export default PhotoSlider;
