import React, { useCallback, useContext } from "react";
import { Box, Button, Icon } from "@material-ui/core";

import { useI18n } from "../../i18n/I18nContext";
import { Catalog } from "../../../objects/Catalog";
import { createFolder, saveFile } from "../../../utils/electronUtils";
import { getUniqueId } from "../../../utils/utils";
import NewCatalogForm from "../../forms/NewCatalogForm";
import { useCatalogArrayContext } from "../../hooks/useCatalogArrayContext";
import { PopupContext } from "../../Popups/PopupController";

const defaultI18n = {
    createNewCatalog: "Create new catalog",
    newCatalog: "New catalog",
    name: "Name",
};

const NewCatalogButton = () => {
    const i18n = useI18n(defaultI18n, "NewCatalogButton");
    const { setConfig } = useContext(PopupContext);
    const { array, add } = useCatalogArrayContext<Catalog>("catalogs");

    const createNewCatalog = useCallback(
        async (file: File | null, catalogName: string) => {
            const createdFolder = await createFolder(`catalogs/${catalogName}`);
            const coverUrl = file
                ? await saveFile(file, `catalogs/${catalogName}/${file.name}`)
                : "";
            if (createdFolder) {
                add({
                    id: getUniqueId(array, "id"),
                    name: catalogName,
                    coverUrl,
                    folders: [],
                    photos: [],
                });
            }
        },
        [array, add]
    );

    const openCatalogForm = useCallback(
        () =>
            setConfig({
                title: i18n.newCatalog,
                dialogContent: NewCatalogForm(i18n.name),
                handleSubmit: createNewCatalog,
            }),
        [createNewCatalog, i18n, setConfig]
    );

    return (
        <Box className="add-btn">
            <Button
                color="secondary"
                variant="contained"
                startIcon={<Icon>add</Icon>}
                onClick={openCatalogForm}
            >
                {i18n.createNewCatalog}
            </Button>
        </Box>
    );
};

export default NewCatalogButton;
