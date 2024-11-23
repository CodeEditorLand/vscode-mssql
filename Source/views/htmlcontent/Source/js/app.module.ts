/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { NgModule, ValueProvider } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { SlickGrid } from "angular2-slickgrid";

import { AppComponent } from "./components/app.component";
import { ContextMenu } from "./components/contextmenu.component";
import { MessagesContextMenu } from "./components/messagescontextmenu.component";
import { MouseDownDirective } from "./directives/mousedown.directive";
import { ScrollDirective } from "./directives/scroll.directive";

/**
 * Top level angular module, no actual content here
 */
const WINDOW_PROVIDER: ValueProvider = {
	provide: Window,
	useValue: window,
};

@NgModule({
	imports: [BrowserModule, FormsModule],
	providers: [WINDOW_PROVIDER],
	declarations: [
		AppComponent,
		SlickGrid,
		ScrollDirective,
		MouseDownDirective,
		ContextMenu,
		MessagesContextMenu,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
