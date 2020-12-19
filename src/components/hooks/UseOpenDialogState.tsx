import React from "react";

function useOpenDialogState(initialState = false) {
    const [open, setOpen] = React.useState(initialState);
    const openDialog = React.useCallback(() => setOpen(true), []);
    const closeDialog = React.useCallback(() => setOpen(false), []);
    return {
        open,
        openDialog,
        closeDialog,
    };
}

export default useOpenDialogState;
