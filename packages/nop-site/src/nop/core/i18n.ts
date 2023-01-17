import { useLocale } from '/@/locales/useLocale'
import { useI18n } from '/@/hooks/web/useI18n'

const currentLocale = useLocale().getLocale
export {
    currentLocale, useI18n,
}