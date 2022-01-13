import { useContext, useEffect } from "react";
import Router from "next/router";
import ThemeContext from "../../utils/ThemeContext";

interface TransitionOptions { 
  shallow?: boolean 
  locale?: string | false 
  scroll?: boolean 
} 

interface Props {
  as?: string
  href: string
  options?: TransitionOptions
  push?: boolean
}

const Redirect: React.FC<Props> = ({ as, href, options, push }) => {
  const { lang } = useContext(ThemeContext);

  useEffect(() => {
   const method = push ? Router.push : Router.replace;
   method(`/${lang}${href}`, as, options);
  }, []);

  return null;
};

export default Redirect;