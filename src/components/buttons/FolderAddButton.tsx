import React, { useCallback } from "react";
import {
    Box,
    Button,
    ClickAwayListener,
    Fade,
    Paper,
    Popper,
} from "@material-ui/core";
import { useI18n } from "../i18n/I18nContext";

import { useCatalogArrayContext } from "../hooks/UseCatalogArrayContext";
import { IFolder } from "../../objects/IFolder";
import { Photo } from "../../objects/Photo";
import useOpenDialogState from "../hooks/UseOpenDialogState";
import { getUniqueId } from "../../utils/utils";
import NewFolderForm from "../forms/NewFolderForm";

import css from "./Buttons.module.css";
import { createFolder, saveFile } from "../../utils/electronUtils";

const POPPER_TRANSITION = 200;
const FOLDER_ICON_PATH = "FOLDER_ICON";

const defaultI18n = {
    new: "New...",
    category: "Category",
    photo: "Photo",
};

interface Props {
    path: string;
    namedPath: string;
}

const FolderAddButton = ({ path, namedPath }: Props) => {
    const i18n = useI18n(defaultI18n, "FolderAddButton");
    const { add: addPhoto, array: photos } = useCatalogArrayContext<Photo>(
        `${path}.photos`
    );
    const { add: addFolder, array: folders } = useCatalogArrayContext<IFolder>(
        `${path}.folders`
    );

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );
    const closePopper = React.useCallback(() => setAnchorEl(null), []);

    const {
        open: folderFormOpened,
        openDialog: openFolderForm,
        closeDialog: closeFolderForm,
    } = useOpenDialogState();
    const {
        open: photoFormOpened,
        openDialog: openPhotoForm,
        closeDialog: closePhotoForm,
    } = useOpenDialogState();

    const handleAddClick = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(e.currentTarget);
        },
        []
    );

    const open = Boolean(anchorEl);
    const id = open ? "transitions-popper" : undefined;

    const createNewFolder = useCallback(
        async (file: File | null, name: string) => {
            const createdFolder = await createFolder(
                `catalogs/${namedPath}/${name}`
            );
            const iconPath = file
                ? await saveFile(
                      file,
                      `catalogs/${namedPath}/${name}/${FOLDER_ICON_PATH}`
                  )
                : "";
            if (createdFolder) {
                addFolder({
                    id: getUniqueId(folders, "id"),
                    folders: [],
                    photos: [],
                    name,
                    icon: iconPath,
                });
            }
        },
        [addFolder, folders, namedPath]
    );

    return (
        <React.Fragment>
            <Box className={css["add-btn"]}>
                <Button
                    color="secondary"
                    variant="contained"
                    aria-describedby={id}
                    onClick={handleAddClick}
                >
                    {i18n.new}
                </Button>
            </Box>

            <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                placement="top-start"
                transition
            >
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={closePopper}>
                        <Fade {...TransitionProps} timeout={POPPER_TRANSITION}>
                            <Paper
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Button
                                    onClick={openFolderForm}
                                    color="primary"
                                    variant="contained"
                                >
                                    {i18n.category}
                                </Button>
                                <Button onClick={openPhotoForm} color="primary">
                                    {i18n.photo}
                                </Button>
                            </Paper>
                        </Fade>
                    </ClickAwayListener>
                )}
            </Popper>

            <NewFolderForm
                open={folderFormOpened}
                onClose={closeFolderForm}
                onSubmit={createNewFolder}
            />

            {/* <NewPhotoForm
                open={photoFormOpened}
                onClose={closePhotoForm}
                id={photos ? getUniqueId(photos, "id") : 0}
                onSubmit={addPhoto}
            /> */}
        </React.Fragment>
    );
};

export default FolderAddButton;
