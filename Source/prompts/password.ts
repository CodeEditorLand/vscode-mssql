// This code is originally from https://github.com/DonJayamanne/bowerVSCode
// License: https://github.com/DonJayamanne/bowerVSCode/blob/master/LICENSE
import VscodeWrapper from "../controllers/vscodeWrapper";
import InputPrompt from "./input";

export default class PasswordPrompt extends InputPrompt {
	constructor(
		question: any,
		vscodeWrapper: VscodeWrapper,
		ignoreFocusOut?: boolean,
	) {
		super(question, vscodeWrapper, ignoreFocusOut);

		this._options.password = true;
	}
}
