import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  lng: 'pt',
  fallbackLng: 'pt',
  resources: {
    pt: {
      translation: {
        settings: 'Configurações Gerais',
        theme: 'Tema',
        language: 'Idioma',
        location: 'Localização',
        datetime: 'Data e hora',
        alarm: 'Alarme',
        back: '🔙',
      },
    },
    en: {
      translation: {
        settings: 'General Settings',
        theme: 'Theme',
        language: 'Language',
        location: 'Location',
        datetime: 'Date and Time',
        alarm: 'Alarm',
        back: '🔙',
      },
    },
    el: {
  translation: {
    settings: 'Γενικές ρυθμίσεις',
    theme: 'Θέμα',
    language: 'Γλώσσα',
    location: 'Τοποθεσία',
    datetime: 'Ημερομηνία και ώρα',
    alarm: 'Συναγερμός',
    back: '🔙',
  },
},

de: {
  translation: {
    settings: 'Allgemeine Einstellungen',
    theme: 'Thema',
    language: 'Sprache',
    location: 'Standort',
    datetime: 'Datum und Uhrzeit',
    alarm: 'Alarm',
    back: '🔙',
  },
},

pl: {
  translation: {
    settings: 'Ustawienia ogólne',
    theme: 'Motyw',
    language: 'Język',
    location: 'Lokalizacja',
    datetime: 'Data i godzina',
    alarm: 'Alarm',
    back: '🔙',
  },
},


'pt-pt': {
  translation: {
    settings: 'Definições Gerais',
    theme: 'Tema',
    language: 'Idioma',
    location: 'Localização',
    datetime: 'Data e hora',
    alarm: 'Alarme',
    back: '🔙',
  },
},
'en-uk': {
  translation: {
    settings: 'General Settings',
    theme: 'Theme',
    language: 'Language',
    location: 'Location',
    datetime: 'Date and Time',
    alarm: 'Alarm',
    back: '🔙',
  },
},
it: {
  translation: {
    settings: 'Impostazioni generali',
    theme: 'Tema',
    language: 'Lingua',
    location: 'Posizione',
    datetime: 'Data e ora',
    alarm: 'Allarme',
    back: '🔙',
  },
},
ar: {
  translation: {
    settings: 'الإعدادات العامة',
    theme: 'السمة',
    language: 'اللغة',
    location: 'الموقع',
    datetime: 'التاريخ والوقت',
    alarm: 'منبه',
    back: '🔙',
  },
},
fr: {
  translation: {
    settings: 'Paramètres généraux',
    theme: 'Thème',
    language: 'Langue',
    location: 'Localisation',
    datetime: 'Date et heure',
    alarm: 'Alarme',
    back: '🔙',
  },
},
hi: {
  translation: {
    settings: 'सामान्य सेटिंग्स',
    theme: 'थीम',
    language: 'भाषा',
    location: 'स्थान',
    datetime: 'तारीख और समय',
    alarm: 'अलार्म',
    back: '🔙',
  },
},

ja: {
  translation: {
    settings: '一般設定',
    theme: 'テーマ',
    language: '言語',
    location: '場所',
    datetime: '日時',
    alarm: 'アラーム',
    back: '🔙',
  },
},

zh: {
  translation: {
    settings: '通用设置',
    theme: '主题',
    language: '语言',
    location: '位置',
    datetime: '日期和时间',
    alarm: '闹钟',
    back: '🔙',
  },
},

no: {
  translation: {
    settings: 'Generelle innstillinger',
    theme: 'Tema',
    language: 'Språk',
    location: 'Sted',
    datetime: 'Dato og tid',
    alarm: 'Alarm',
    back: '🔙',
  },
},

eo: {
  translation: {
    settings: 'Ĝeneralaj agordoj',
    theme: 'Temo',
    language: 'Lingvo',
    location: 'Loko',
    datetime: 'Dato kaj tempo',
    alarm: 'Alarmo',
    back: '🔙',
  },
},

ru: {
  translation: {
    settings: 'Общие настройки',
    theme: 'Тема',
    language: 'Язык',
    location: 'Местоположение',
    datetime: 'Дата и время',
    alarm: 'Будильник',
    back: '🔙',
  },
},

th: {
  translation: {
    settings: 'การตั้งค่าทั่วไป',
    theme: 'ธีม',
    language: 'ภาษา',
    location: 'ตำแหน่งที่ตั้ง',
    datetime: 'วันที่และเวลา',
    alarm: 'นาฬิกาปลุก',
    back: '🔙',
  },
},

ko: {
  translation: {
    settings: '일반 설정',
    theme: '테마',
    language: '언어',
    location: '위치',
    datetime: '날짜 및 시간',
    alarm: '알람',
    back: '🔙',
  },
},
  },
});

export default i18n;