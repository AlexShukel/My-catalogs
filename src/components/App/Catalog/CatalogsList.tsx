import React, { useCallback, useContext } from "react";
import { Box, List } from "@material-ui/core";
import { set } from "lodash";

import { Catalog } from "../../../objects/Catalog";
import CatalogItem from "./CatalogItem";
import useEditMode from "../../hooks/useEditMode";
import EditButton from "../../buttons/EditButton";
import { deleteFolder } from "../../../utils/electronUtils";
import { showConfirmPopup } from "../../Popups/Utils";
import { PopupContext } from "../../Popups/PopupController";
import { useCatalogArrayContext } from "../../hooks/useCatalogArrayContext";
import { useI18n } from "../../i18n/I18nContext";
import { CatalogContext } from "../../catalog-context/CatalogContext";

const defaultI18n = {
    confirmationMessage: "Are you sure you want to delete catalog?",
};

const CatalogsList = () => {
    const catalogContext = useContext(CatalogContext);
    const { dismiss, setConfig } = useContext(PopupContext);
    const { remove, array } = useCatalogArrayContext<Catalog>("catalogs");

    const { isEditing, toggleEditing } = useEditMode();
    const i18n = useI18n(defaultI18n, "CatalogsList");

    const updateCoverUrl = useCallback(
        (index: number, newPath: string) =>
            catalogContext.setValues(
                set(catalogContext, `catalogs.${index}.coverUrl`, newPath)
            ),
        [catalogContext]
    );

    const handleCatalogRemove = useCallback(
        async (index: number) => {
            if (
                await showConfirmPopup(
                    i18n.confirmationMessage,
                    setConfig,
                    dismiss
                )
            ) {
                deleteFolder(`catalogs/${array[index].name}`);
                remove(index);
            }
        },
        [remove, array, i18n, setConfig, dismiss]
    );

    return (
        <div>
            <List className="list">
                {array &&
                    array.map((catalog: Catalog, index) => (
                        <CatalogItem
                            key={catalog.id}
                            catalog={catalog}
                            index={index}
                            isEditing={isEditing}
                            remove={handleCatalogRemove}
                            updateCoverUrl={updateCoverUrl}
                        />
                    ))}
            </List>
            <Box className="edit-btn">
                <EditButton
                    isEditing={isEditing}
                    toggleEditing={toggleEditing}
                />
            </Box>
        </div>
    );
};

export default CatalogsList;
