import React, { useRef } from "react";

interface Props {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    photoPath: string;
}

const PhotoField = ({ handleChange }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div>
            <input
                style={{ display: "none" }}
                type="file"
                accept="image/x-png,image/jpeg"
                onChange={handleChange}
                onClick={(e) => e.stopPropagation()}
                ref={inputRef}
                value=""
                multiple={false}
            />
        </div>
    );
};

export default PhotoField;
