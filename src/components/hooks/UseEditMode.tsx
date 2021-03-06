import React from "react";

function useEditMode() {
    const [isEditing, setIsEditing] = React.useState(false);

    const toggleEditing = React.useCallback(
        () => setIsEditing((isEditing) => !isEditing),
        []
    );

    return { isEditing, setIsEditing, toggleEditing };
}

export default useEditMode;
