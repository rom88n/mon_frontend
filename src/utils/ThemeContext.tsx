import * as React from 'react';

export interface IThemeContext {
  lang: string;
  locale: (path: string) => string
}

const initialValues = {
  lang: "",
  locale: () => ''
}

const ThemeContext = React.createContext<IThemeContext>(initialValues);

export default ThemeContext;
