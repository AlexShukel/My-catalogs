import React from "react";

function useEditMode(onSwitchToReadonly?: () => void) {
    const [isEditing, setIsEditing] = React.useState(false);

    const toggleEditing = React.useCallback(
        () =>
            setIsEditing((isEditing) => {
                if (isEditing && onSwitchToReadonly) onSwitchToReadonly();
                return !isEditing;
            }),
        [onSwitchToReadonly]
    );

    return { isEditing, toggleEditing };
}

export default useEditMode;
