// type array = number[] | string[];
type item = Record<string | number | symbol, never | number | string>;

export function findIndexOf(items: item[], query: item) {
  return items.findIndex((item) =>
    Object.values(query).find((key: string | number) =>
      item[key] === query[key]
    )
  );
}

export function findOne(items: item[], query: item) {
  const index = findIndexOf(items, query);
  return index !== -1 ? items[index] : null;
}

export function find(items: item[], query: item) {
  const index = findIndexOf(items, query);
  return index !== -1 ? [items[index]] : [];
}

export function removeOne(items: item[], query: item) {
  const index = findIndexOf(items, query);
  if (index !== -1) removeIndex(items, index);
  return items;
}

export function removeIndex(items: item[], index: number) {
  if (index === 0) items.shift();
  else if (index === items.length - 1) items.pop();
  else items.splice(index, 1);
  return items;
}

export function removeLongerThan(items: item[], len: number) {
  while (items.length > len) {
    items.shift();
  }
  return items;
}

// protected updateByIndex(item: item, index ?: number) {
//   index = index ?? this.findIndex(item.id);
//   this.items[index] = item;
//   return this;
// }

// export function updateAllByIndex(items: item[]) {
//   items.forEach((item) => {
//     update(item);
//   });
//   return this;
// }

// export function update (items: item[], item: item, index?: number) { return
//   index = index ?? findIndex(items, item.id);
//   items[index] = item;
//   return items;
// };

// // export function = addOrUpdateAll(items: item[]): this {
// //   items.forEach((item) => this.addOrUpdate(item));
// //   return this;
// // }


// protected addOrUpdate(item: item): this {
//   const index = this.findIndex(item.id);
//   !!index && this.update(item, index) || this.add(item);
//   return this;
// }

