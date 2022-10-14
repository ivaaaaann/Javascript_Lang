export type AnyObject = Record<string, any>;

export type ValidateRule = {
  rule: RegExp;
  match: boolean;
  message: string;
};
