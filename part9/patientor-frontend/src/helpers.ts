export const assertNever = (value: never): never => {
  throw new Error(
    `Not sure what to do with this value: ${JSON.stringify(value)}`
  );
};