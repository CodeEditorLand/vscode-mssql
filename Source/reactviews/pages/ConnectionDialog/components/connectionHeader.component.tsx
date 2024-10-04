/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Image, Text, webLightTheme } from "@fluentui/react-components";
import { useContext } from "react";

import { locConstants } from "../../../common/locConstants";
import { ConnectionDialogContext } from "../connectionDialogStateProvider";

const sqlServerImage = require("../../../../../media/sqlServer_light.svg");
const sqlServerImageDark = require("../../../../../media/sqlServer_dark.svg");

export const ConnectionHeader = () => {
	const connectionDialogContext = useContext(ConnectionDialogContext);
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
			}}>
			<Image
				style={{
					padding: "10px",
				}}
				src={
					connectionDialogContext?.theme === webLightTheme
						? sqlServerImage
						: sqlServerImageDark
				}
				alt="SQL Server"
				height={60}
				width={60}
			/>
			<Text
				size={500}
				style={{
					lineHeight: "60px",
				}}
				weight="medium">
				{locConstants.connectionDialog.connectToSQLServer}
			</Text>
		</div>
	);
};
