const arraysAreEqual = <T>(a: T[], b: T[]): boolean => {
    return a && b && a.length === b.length && a.every((aValue, index) => aValue === b[index]);
};
