// This code is originally from https://github.com/DonJayamanne/bowerVSCode
// License: https://github.com/DonJayamanne/bowerVSCode/blob/master/LICENSE

import VscodeWrapper from "../controllers/vscodeWrapper";
import CheckboxPrompt from "./checkbox";
import ConfirmPrompt from "./confirm";
import ExpandPrompt from "./expand";
import InputPrompt from "./input";
import ListPrompt from "./list";
import PasswordPrompt from "./password";
import Prompt from "./prompt";

export default class PromptFactory {
	public static createPrompt(
		question: any,
		vscodeWrapper: VscodeWrapper,
		ignoreFocusOut?: boolean,
	): Prompt {
		/**
		 * TODO:
		 *   - folder
		 */
		switch (question.type || "input") {
			case "string":
			case "input":
				return new InputPrompt(question, vscodeWrapper, ignoreFocusOut);
			case "password":
				return new PasswordPrompt(
					question,
					vscodeWrapper,
					ignoreFocusOut,
				);
			case "list":
				return new ListPrompt(question, vscodeWrapper, ignoreFocusOut);
			case "confirm":
				return new ConfirmPrompt(
					question,
					vscodeWrapper,
					ignoreFocusOut,
				);
			case "checkbox":
				return new CheckboxPrompt(
					question,
					vscodeWrapper,
					ignoreFocusOut,
				);
			case "expand":
				return new ExpandPrompt(
					question,
					vscodeWrapper,
					ignoreFocusOut,
				);
			default:
				throw new Error(
					`Could not find a prompt for question type ${question.type}`,
				);
		}
	}
}
