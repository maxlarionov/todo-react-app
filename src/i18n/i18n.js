import en from '../langs/en.json'
import ua from '../langs/ua.json'

import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'

const resources = {
	en: {
		translation: en
	},
	ua: {
		translation: ua
	}
}

i18n
	.use(initReactI18next)
	.init({
		fallbackLng: 'en',
		resources,
		lng: JSON.parse(localStorage.getItem('language'))

	})

export default i18n