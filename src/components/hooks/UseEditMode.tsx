import React from "react";

function useEditMode() {
    const [editable, setEditable] = React.useState(false);

    const handleEditable = React.useCallback(() => setEditable(!editable), [
        editable,
    ]);

    return { editable, handleEditable };
}

export default useEditMode;
