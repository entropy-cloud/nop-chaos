import { useAdapter } from '../adapter';

type TranslateFunction = (key: string) => string;

export function useTranslate(module?: string): TranslateFunction {
  const { t } = useAdapter().useI18n();
  return key => {
    const keyPath = module ? module + '.' + key : key;
    return t(keyPath) || key;
  };
}
