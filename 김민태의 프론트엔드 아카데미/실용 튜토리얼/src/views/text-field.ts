import { ValidateRule } from "../types";
import { nextTick } from "../utils";
import template from "./text-field.template";

type Props = {
  id: string;
  label: string;
  type: "text" | "email" | "number";
  placeholder?: string;
  text?: string;
  require: boolean;
};

const DefaultProps: Props = {
  id: "",
  text: "",
  label: "label",
  type: "text",
  placeholder: "",
  require: false,
};

export default class TextField {
  private template = template;
  private container: string;
  private data: Props;
  private updated: boolean = false;
  private validateRules: ValidateRule[] = [];

  constructor(container: string, data: Props) {
    this.container = container;
    this.data = { ...DefaultProps, ...data };

    if (this.data.require) {
      this.addValidateRule(RequireRule);
    }

    nextTick(this.attachEventHandler);
  }

  private validate = (): ValidateRule | null => {
    const target = this.data.text ? this.data.text.trim() : "";

    const invalidateRules = this.validateRules.filter((validateRule) =>
      validateRule.rule.test(target)
    );

    return invalidateRules.length > 0 ? invalidateRules[0] : null;
  };
}
