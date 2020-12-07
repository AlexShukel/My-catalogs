import { get } from "lodash";

export const getUniqueId = <T>(array: T[], idPath: string) => {
    const uniqueId =
        array.reduce<number>((previousValue, currentValue) => {
            const id = get(currentValue, idPath);
            return id > previousValue ? id : previousValue;
        }, 0) + 1;
    return uniqueId;
};
