/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { makeStyles, Spinner, Text } from "@fluentui/react-components";
import { ErrorCircleRegular } from "@fluentui/react-icons";
import { useContext } from "react";

import { ApiStatus } from "../../../sharedInterfaces/webview";
import { ExecutionPlanGraph } from "./executionPlanGraph";
import { ExecutionPlanContext } from "./executionPlanStateProvider";

const useStyles = makeStyles({
	outerDiv: {
		height: "100%",
		width: "100%",
		position: "relative",
		overflowY: "auto",
		overflowX: "unset",
	},
	spinnerDiv: {
		height: "100%",
		width: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		padding: "20px",
	},
	errorIcon: {
		fontSize: "100px",
		opacity: 0.5,
	},
});

export const ExecutionPlanPage = () => {
	const classes = useStyles();
	const provider = useContext(ExecutionPlanContext);
	const loadState = provider?.state?.loadState ?? ApiStatus.Loading;
	const renderMainContent = () => {
		switch (loadState) {
			case ApiStatus.Loading:
				return (
					<div className={classes.spinnerDiv}>
						<Spinner
							label="Loading execution plan..."
							labelPosition="below"
						/>
					</div>
				);
			case ApiStatus.Loaded:
				const executionPlanGraphs =
					provider?.state?.executionPlanGraphs ?? [];
				return executionPlanGraphs?.map((_, index) => (
					<ExecutionPlanGraph key={index} graphIndex={index} />
				));
			case ApiStatus.Error:
				return (
					<div className={classes.spinnerDiv}>
						<ErrorCircleRegular className={classes.errorIcon} />
						<Text size={400}>
							{provider?.state?.errorMessage ?? ""}
						</Text>
					</div>
				);
		}
	};

	return <div className={classes.outerDiv}>{renderMainContent()}</div>;
};
