// deno-lint-ignore no-explicit-any
type item = any;

export const removeLongerThan = (items: item[], len: number) => {
  while (items.length > len) {
    items.shift();
  }
  return items;
};

/**
 * Get item by index
 */
export const getByIndex = (items: item[], index: number): item | undefined =>
  items[index];

export const getLast = (items: item[]): item => items[items.length - 1];

export const getFirst = (items: item[]): item => items[0];

/**
 * Get item by a search
 */
export const findByIndex = (items: item[], index: number): item | undefined => {
  return items.find((i) => i.index === index);
}

export const findFirst = (items: item[]): item | undefined => {
  return items.findIndex((i) => i.index === 0);
}

export const findLast = (items: item[]): item | undefined => {
  return items.findIndex((i) => i.index === items.length - 1);
}

export const findIndexById = (items: item[], id: number | string): number =>
  items.findIndex((i) => i.id === id);

export const findIndexByName = (items: item[], name: string): number =>
  items.findIndex((i) => i.name === name);

export const findById = (
  items: item[],
  id: number | string,
): item | undefined => items.find((b) => b.id === id);

export const remove = (items: item[], index: number) => {
  if (index === 0) items.shift();
  else if (index === items.length - 1) items.pop();
  else items.splice(index, 1);
  return this;
};

// export const update = (items: item[], item: item, index?: number) => {
//   index = index ?? findIndex(items, item.id);
//   items[index] = item;
//   return items;
// };

export const removeOne = (items: item[], item: item) => {
  return items.filter((i) => i !== item);
};

export const add = (items: item[], item: item) => {
  return items.push(item);
};

export const addAll = (items: item[], add: item[]) => {
  add.forEach((i) => items.push(i));
  return items;
};

// export const = addOrUpdate(item: item): this {
//   const index = this.findIndex(item.id);
//   !!index && this.update(item, index) || this.add(item);
//   return this;
// }

// // export const = addOrUpdateAll(items: item[]): this {
// //   items.forEach((item) => this.addOrUpdate(item));
// //   return this;
// // }

export const find = (
  items: item[],
  what: Record<string | number, string | number> | number,
) => {
  if (typeof what === "number") return items[what];
  // deno-lint-ignore no-explicit-any
  return items.find((item: any) => {
    return Object.values(what).find((key: string | number) =>
      item[key] === what[key]
    );
  });
};

export const findIndex = (
  items: item[],
  what: Record<string | number, string | number>,
) => {
  // deno-lint-ignore no-explicit-any
  return items.findIndex((item: any) =>
    Object.values(what).find((key: string | number) => item[key] === what[key])
  );
};


export const sortById = (items: item[]) => {
  return items.sort((a, b) => a.id - b.id);
};

// // reverse sort
export const sortByReverseId = (items: item[]) => {
  return items.sort((a, b) => b.id - a.id);
};

export const getByReverseIndex = (items: item[], index: number) => {
  return items[items.length - 1 - index];
};
