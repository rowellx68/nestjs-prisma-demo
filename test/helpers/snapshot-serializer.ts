const uuidRegExp =
  /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;

export const ignoreUUIDSerializer = {
  test: (value: any) => typeof value === 'string' && uuidRegExp.test(value),
  serialize: () => '[UUID]',
};
