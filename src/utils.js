export function assertOrThrow(statement, errorType, ...errorArgs) {
  if (!statement) {
    throw new errorType(...errorArgs);
  }
}

export function errorWrap(handler) {
  return function (...args) {
    handler(...args).catch(args[args.length - 1]);
  }
}
