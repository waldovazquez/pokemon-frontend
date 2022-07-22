import {
  useSearchParams,
} from 'react-router-dom';

function useHandleUrl() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleUrl(value = null, param = null) {
    const newSearch = {};
    const typeQuery = searchParams.get('type');
    const nameQuery = searchParams.get('name');
    const attackQuery = searchParams.get('attack');
    if (param) {
      switch (param) {
        case 'page':
          if (value) {
            newSearch.page = value;
          }
          if (typeQuery) {
            newSearch.type = typeQuery;
          }
          if (nameQuery) {
            newSearch.name = nameQuery;
          }
          if (attackQuery) {
            newSearch.attack = attackQuery;
          }
          break;
        case 'type':
          if (value !== '') {
            newSearch.type = value;
          }
          if (nameQuery) {
            newSearch.name = nameQuery;
          }
          if (attackQuery) {
            newSearch.attack = attackQuery;
          }
          break;
        case 'attack':
          if (value !== '') {
            newSearch.attack = value;
          }
          if (nameQuery) {
            newSearch.name = nameQuery;
          }
          if (typeQuery) {
            newSearch.type = typeQuery;
          }
          break;
        case 'name':
          if (value) {
            newSearch.name = value;
          }
          if (typeQuery) {
            newSearch.type = typeQuery;
          }
          if (attackQuery) {
            newSearch.attack = attackQuery;
          }
          break;
        default:
          return null;
      }
    }

    setSearchParams(newSearch, {
      replace: true,
    });

    return null;
  }

  return {
    handleUrl,
  };
}

export default useHandleUrl;
