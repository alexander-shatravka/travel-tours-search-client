type ClassValue = string | undefined | null | false | ClassValue[];

function flattenClasses(value: ClassValue): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.flatMap(flattenClasses);
  return [value];
}

export function cn(...classes: ClassValue[]): string {
  return classes.flatMap(flattenClasses).filter(Boolean).join(' ');
}