import React, { useCallback, useContext, useRef, useState } from "react";
import {
    IconButton,
    Icon,
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails,
} from "@material-ui/core";
import { set } from "lodash";

import { useI18n } from "./i18n/I18nContext";
import { Photo } from "../objects/Photo";
import EditableText from "./EditableText";

import { CatalogContext } from "./catalog-context/CatalogContext";
import css from "./PhotoSlider.module.css";

const defaultI18n = {
    description: "Description",
};

interface Props {
    photos: Photo[];
    initialIndex: number;
    closeSlider: () => void;
    folderPath: string;
}

const PhotoSlider = ({
    closeSlider,
    initialIndex,
    photos,
    folderPath,
}: Props) => {
    const [index, setIndex] = useState(initialIndex);
    const context = useContext(CatalogContext);

    const i18n = useI18n(defaultI18n, "PhotoSlider");

    const nextPhoto = () => photos.length - 1 > index && setIndex(index + 1);
    const prevPhoto = () => index > 0 && setIndex(index - 1);

    const containerRef = useRef<HTMLDivElement | null>(null);

    const handleSubmit = useCallback(
        (newDescription: string) => {
            context.setValues(
                set(
                    context,
                    `${folderPath}.photos.${index}.description`,
                    newDescription
                )
            );
        },
        [context, folderPath, index]
    );

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
                <img
                    src={photos[index].photo}
                    width={600}
                    height={400}
                    className={css["img"]}
                />
                <IconButton
                    onClick={nextPhoto}
                    disabled={index === photos.length - 1}
                >
                    <Icon>arrow_forward</Icon>
                </IconButton>
            </div>
            <Accordion className={css["slider__description"]}>
                <AccordionSummary
                    expandIcon={<Icon fontSize="small">expand_more</Icon>}
                >
                    <Typography>{i18n.description}</Typography>
                </AccordionSummary>
                <AccordionDetails className={css["accordion-details"]}>
                    <EditableText
                        initialText={photos[index].description}
                        onSubmit={handleSubmit}
                        variant="outlined"
                        fullWidth
                        multiline
                        label={i18n.description}
                    />
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default PhotoSlider;
