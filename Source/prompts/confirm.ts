// This code is originally from https://github.com/DonJayamanne/bowerVSCode
// License: https://github.com/DonJayamanne/bowerVSCode/blob/master/LICENSE

import * as LocalizedConstants from "../constants/locConstants";
import VscodeWrapper from "../controllers/vscodeWrapper";
import EscapeException from "../utils/escapeException";
import Prompt from "./prompt";

export default class ConfirmPrompt extends Prompt {
	constructor(
		question: any,
		vscodeWrapper: VscodeWrapper,
		ignoreFocusOut?: boolean,
	) {
		super(question, vscodeWrapper, ignoreFocusOut);
	}

	public render(): any {
		let choices: { [id: string]: boolean } = {};

		choices[LocalizedConstants.msgYes] = true;

		choices[LocalizedConstants.msgNo] = false;

		let options = this.defaultQuickPickOptions;

		options.placeHolder = this._question.message;

		return this._vscodeWrapper
			.showQuickPickStrings(Object.keys(choices), options)
			.then((result) => {
				if (result === undefined) {
					throw new EscapeException();
				}

				return choices[result] || false;
			});
	}
}
