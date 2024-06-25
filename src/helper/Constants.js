import viLocale from 'date-fns/locale/vi'
import format from 'date-fns/format'

const ConvertToViDateTime = (date) => {
  if (date == null) return ''

  const formatedDate = format(date, 'MM/dd/yyyy', { locale: viLocale })
  return formatedDate
}

export { ConvertToViDateTime }
