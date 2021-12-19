export type ValidationEvent = (validation: ValidationEventProps) => void;
export type ValidationEventProps = { confirm: ValidationFct; deny: ValidationFct };
export type ValidationFct = () => void;
