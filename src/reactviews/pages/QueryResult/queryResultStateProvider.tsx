/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ReactNode, createContext } from "react";
import * as qr from "../../../sharedInterfaces/queryResult";
import { useVscodeWebview } from "../../common/vscodeWebviewProvider";
import { Theme } from "@fluentui/react-components";

export interface QueryResultState {
    provider: qr.QueryResultReactProvider;
    state: qr.QueryResultWebviewState;
    theme: Theme;
}

const QueryResultContext = createContext<QueryResultState | undefined>(
    undefined,
);

interface QueryResultContextProps {
    children: ReactNode;
}

const QueryResultStateProvider: React.FC<QueryResultContextProps> = ({
    children,
}) => {
    const webViewState = useVscodeWebview<
        qr.QueryResultWebviewState,
        qr.QueryResultReducers
    >();
    // const queryResultState = webViewState?.state as qr.QueryResultWebviewState;
    return (
        <QueryResultContext.Provider
            value={{
                provider: {
                    setResultTab: function (
                        tabId: qr.QueryResultPaneTabs,
                    ): void {
                        webViewState?.extensionRpc.action("setResultTab", {
                            tabId: tabId,
                        });
                    },
                },
                state: webViewState?.state as qr.QueryResultWebviewState,
                theme: webViewState?.theme,
            }}
        >
            {children}
        </QueryResultContext.Provider>
    );
};

export { QueryResultContext, QueryResultStateProvider };
