import React from "react";
import { Box, Icon, IconButton, Tooltip } from "@material-ui/core";

import { RouterContext } from "../router/Router";
import { useI18n } from "../i18n/I18nContext";

const defaultI18n = {
    back: "Back",
};

const BackButton = () => {
    const { back, page } = React.useContext(RouterContext);
    const i18n = useI18n(defaultI18n, "BackButton");
    return page !== "catalogs" ? (
        <Tooltip title={i18n.back}>
            <Box className="button-margin">
                <IconButton color="secondary" onClick={back}>
                    <Icon fontSize="large">arrow_back</Icon>
                </IconButton>
            </Box>
        </Tooltip>
    ) : null;
};

export default BackButton;
