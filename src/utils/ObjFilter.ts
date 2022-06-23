export const ObjFilter = (obj: any, predicate: any) => {
  return Object.fromEntries(Object.entries(obj).filter(predicate));
};
