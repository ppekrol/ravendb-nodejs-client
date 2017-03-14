export class Serializer {
  public static fromJSON<T extends Object>(className: { new(): T; }, source: Object | string, target?: T)
  {
    let sourceObject: Object = ("string" === (typeof source))
      ? JSON.parse(source as string) : source;

    let targetObject: T = (target instanceof className)
      ? target : new className();

    const transform: (value: any) => any = (value) => {
      if (Array.isArray(value)) {
        return value.map((item) => transform(item))
      }

      if (value instanceof Object) {
        return Serializer.fromJSON<T>(className, value);
      }

      return value;
    };

    Object.keys(sourceObject).forEach((key: string) => {
      targetObject[key] = transform(sourceObject[key]);
    });

    return targetObject;
  }
}