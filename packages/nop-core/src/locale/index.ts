import { useAdapter } from '../adapter';

type TransateFunction = (key: string) => string;

export function useTranslate(module?: string): TransateFunction {
  const { t } = useAdapter().useI18n();
  return key => {
    const keyPath = module ? module + '.' + key : key;
    return t(keyPath) || key;
  };
}
