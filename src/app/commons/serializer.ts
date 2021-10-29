import { ClassConstructor, classToPlain, plainToClass } from 'class-transformer';

export function serialize<T>(data: any, serializer: ClassConstructor<unknown>):T {
  const obj = classToPlain(plainToClass(
    serializer,
    data,
    { excludeExtraneousValues: true }
  ), { excludeExtraneousValues: true });

  return obj as T;
}