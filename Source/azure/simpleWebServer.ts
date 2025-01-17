/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as http from "http";
import { AddressInfo } from "net";
import * as url from "url";

export type WebHandler = (
	req: http.IncomingMessage,
	reqUrl: url.UrlWithParsedQuery,
	res: http.ServerResponse,
) => void;

export class AlreadyRunningError extends Error {}

export class SimpleWebServer {
	private hasStarted: boolean;

	private readonly pathMappings = new Map<string, WebHandler>();

	private readonly server: http.Server;

	private lastUsed: number;

	private shutoffInterval: NodeJS.Timeout;

	constructor(private readonly autoShutoffTimer = 5 * 60 * 1000) {
		// Default to five minutes.
		this.bumpLastUsed();

		this.autoShutoff();

		this.server = http.createServer((req, res) => {
			this.bumpLastUsed();

			const reqUrl = url.parse(req.url!, /* parseQueryString */ true);

			const handler = this.pathMappings.get(reqUrl.pathname);

			if (handler) {
				return handler(req, reqUrl, res);
			}

			res.writeHead(404);

			res.end();
		});
	}

	private bumpLastUsed(): void {
		this.lastUsed = Date.now();
	}

	public async shutdown(): Promise<void> {
		clearInterval(this.shutoffInterval);

		return new Promise<void>((resolve, reject) => {
			this.server.close((error) => {
				if (error) {
					reject(error);
				} else {
					resolve();
				}
			});
		});
	}

	public async startup(): Promise<string> {
		if (this.hasStarted) {
			throw new AlreadyRunningError();
		}

		this.hasStarted = true;

		let portTimeout: NodeJS.Timeout;

		const portPromise = new Promise<string>((resolve, reject) => {
			portTimeout = setTimeout(() => {
				reject(new Error("Timed out waiting for the server to start"));
			}, 5000);

			this.server.on("listening", () => {
				// TODO: What are string addresses?
				const address = this.server.address() as AddressInfo;

				if (address!.port === undefined) {
					reject(new Error("Port was not defined"));
				}

				resolve(address.port.toString());
			});

			this.server.on("error", () => {
				reject(new Error("Server error"));
			});

			this.server.on("close", () => {
				reject(new Error("Server closed"));
			});

			this.server.listen(0, "127.0.0.1");
		});

		const clearPortTimeout = () => {
			clearTimeout(portTimeout);
		};

		void portPromise.finally(clearPortTimeout);

		return portPromise;
	}

	public on(pathMapping: string, handler: WebHandler): void {
		this.pathMappings.set(pathMapping, handler);
	}

	private autoShutoff(): void {
		this.shutoffInterval = setInterval(() => {
			const time = Date.now();

			if (time - this.lastUsed > this.autoShutoffTimer) {
				console.log("Shutting off webserver...");

				this.shutdown().catch(console.error);
			}
		}, 1000);
	}
}
