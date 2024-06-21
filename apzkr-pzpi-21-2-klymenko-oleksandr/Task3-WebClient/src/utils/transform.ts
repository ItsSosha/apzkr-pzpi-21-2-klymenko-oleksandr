export const transformToFormData = (obj: object) =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        acc.append(`${key}[]`, item);
      });
    } else {
      acc.append(key, value);
    }
    return acc;
  }, new FormData());
