import React, { useContext, useEffect, useState } from 'react'
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { env_SMARTCHAIN } from '../env';
import { WindowContext } from '../Context/WindowContext';
import { env_LANG } from '../env_lang';
import { VideoThreadContext } from '../Context/VideoThreadContext';

const SearchBar = ({closeLeft}) => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const {setViParam} = useContext(VideoThreadContext);
    const { currentIndex, setCurrentIndex, language } = useContext(WindowContext);
    const [idSearch, setIdSearch] = useState('');

    useEffect(() => {
      const tempSearchId = searchParams.get('id') ? Number(searchParams.get('id')) : env_SMARTCHAIN.DEFAULT_IDNDEX;
      if(String(tempSearchId) !== String(currentIndex)){
        if(window?.innerWidth < 770) closeLeft();
      }
      setCurrentIndex(tempSearchId);
    }, [searchParams.get('id')]);
  


    useEffect(() => {

      if(searchParams.get('vi')){
        setViParam(Number(searchParams.get('vi')))
      }else{
        setViParam(null);
      }

    }, [searchParams.get('vi')]);

    
  return (
    <div className="search-app">
        <input
            type="number"
            value={idSearch}
            onChange={(e) => {setIdSearch(e.target.value);}}
            placeholder={env_LANG[language]?.placeholder_search}
            min="0"
            onKeyDown={(event) => {
              if (event.keyCode === 13) {
                const tmp = idSearch;
                setIdSearch('')
                router.push('/?id='+tmp);
              }
            }}
        />
        <span onClick={() => {
            const tmp = idSearch;
            setIdSearch('')
            router.push('/?id='+tmp);
        }}>
            <svg viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11ZM11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.125 20 15.078 19.2635 16.6177 18.0319L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L18.0319 16.6177C19.2635 15.078 20 13.125 20 11C20 6.02944 15.9706 2 11 2Z"/></svg>
        </span>
    </div>
  )
}

export default SearchBar