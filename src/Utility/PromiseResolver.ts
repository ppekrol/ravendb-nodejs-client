import {AbstractCallback, EntityCallback, EntitiesArrayCallback, EntitiesCountCallback} from './Callbacks';

export interface PromiseThenable<R> {
  then<U>(onFulfilled: (value: R) => U | PromiseThenable<U>, onRejected?: (error: any) => U | PromiseThenable<U>): PromiseThenable<U>;
  then<U>(onFulfilled: (value: R) => U | PromiseThenable<U>, onRejected?: (error: any) => void | PromiseThenable<void>): PromiseThenable<U>;
}

export type PromiseResolve<T> = (thenableOrResult?: PromiseThenable<T | T[] | number> | T | T[] | number) => void;
export type PromiseReject = (error: Error) => void;

export class PromiseResolver {
  public static resolve<T>(result: T | T[] | number, resolve: PromiseResolve<T>, callback?: EntityCallback<T> | EntitiesArrayCallback<T> | EntitiesCountCallback) {
    resolve(result);

    if (callback) {
      if ("number" == (typeof result)) {
        (callback as EntitiesCountCallback)(result as number);
      } else if (Array.isArray(result)) {
        (callback as EntitiesArrayCallback<T>)(result as T[]);
      } else {
        (callback as EntityCallback<T>)(result as T);
      }
    }
  }

  public static reject(error: Error, reject: PromiseReject, callback?: AbstractCallback<null>) {
    reject(error);

    if (callback) {
      callback(null, error);
    }
  }
}