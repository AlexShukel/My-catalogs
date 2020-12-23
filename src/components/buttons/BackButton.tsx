import React from "react";
import { Box, Icon, Tooltip } from "@material-ui/core";

import { RouterContext } from "../router/Router";
import { useI18n } from "../i18n/I18nContext";
import { StyledIconButton } from "../../App";

const defaultI18n = {
    back: "Back",
};

const BackButton = () => {
    const { back, page } = React.useContext(RouterContext);
    const i18n = useI18n(defaultI18n, "BackButton");
    return page !== "catalogs" ? (
        <Tooltip title={i18n.back}>
            <Box className="button-margin">
                <StyledIconButton onClick={back}>
                    <Icon>arrow_back</Icon>
                </StyledIconButton>
            </Box>
        </Tooltip>
    ) : null;
};

export default BackButton;
