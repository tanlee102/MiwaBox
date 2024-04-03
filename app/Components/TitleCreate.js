import React, { useContext } from 'react'
import { env_LANG } from '../env_lang';
import { WindowContext } from '../Context/WindowContext';

const TitleCreate = () => {

  const { language } = useContext(WindowContext);

  return (
    <>{env_LANG[language].add_sm[0]}</>
  )
}

export default TitleCreate;