export const assertNever = (value: never): never => {
  throw new Error(
    `Not sure what to do with this value: ${JSON.stringify(value)}`
  );
};

const isValidDate = (date: unknown): boolean => {
  return isString(date) && /\d{4}-\d{2}-\d{2}/.test(date);
};

const isString = (value: unknown): value is string => {
  return typeof value === 'string' || value instanceof String;
};

const isValidText = (text: unknown): boolean => {
  return isString(text);
};



export default {
  isValidDate,
  isValidText,
};