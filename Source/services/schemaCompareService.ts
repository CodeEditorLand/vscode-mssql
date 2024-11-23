/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as mssql from "vscode-mssql";

import SqlToolsServiceClient from "../languageservice/serviceclient";
import * as schemaCompareContracts from "../models/contracts/schemaCompare/schemaCompareContracts";

export class SchemaCompareService implements mssql.ISchemaCompareService {
	constructor(private _client: SqlToolsServiceClient) {}

	public schemaCompareGetDefaultOptions(): Thenable<mssql.SchemaCompareOptionsResult> {
		const params: mssql.SchemaCompareGetOptionsParams = {};

		return this._client.sendRequest(
			schemaCompareContracts.SchemaCompareGetDefaultOptionsRequest.type,
			params,
		);
	}
}
