const parseBoolean = (value) => {
  if (typeof value !== 'string') return undefined;

  const lower = value.toLowerCase();
  if (lower === 'true') return true;
  if (lower === 'false') return false;

  return undefined;
};

const parsetype = (type) => {
  const keysOfContactType = ['work', 'home', 'personal'];

  return keysOfContactType.includes(type) ? type : undefined;
};

export const parseFilterParams = (query) => {
  const { isFavourite, type } = query;
  const filter = {};

  const parsedIsFavourite = parseBoolean(isFavourite);
  const parsedType = parsetype(type);

  if (typeof parsedIsFavourite === 'boolean') {
    filter.isFavourite = parsedIsFavourite;
  }

  if (parsedType) {
    filter.contactType = parsedType;
  }

  return { filter };
};
