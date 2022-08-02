/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useState, useMemo, useEffect } from 'react';
import './App.css';
import PostsList from './components/PostList/PostList';
import PaginationMenu from "./components/PaginationMenu/PaginationMenu";
import DropdownSelector from './components/DropdownSelector/DropdownSelector';
import DROPDOWN_CONSTANTS from "./constants/dropdown-constants";

let pageSize = 8;

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFavoritePage, setCurrentFavoritePage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const getArray = JSON.parse(localStorage.getItem('favorites') || '0');
  var favList = []

  const addFav = (item,id) => {
    let array = favorites;
    let addArray = true;
    array.map((item,key) => {
      if (item === id) {
        array.splice(key,1);
        addArray = false;
      }
    });
    if (addArray) {
      array.push(id);
    }
    setFavorites([...array])
    localStorage.setItem("favorites", JSON.stringify(favorites));

    var storage = localStorage.getItem("favItem" + (id) || '0')
    if (storage == null) {
      localStorage.setItem(('favItem' + (id)), JSON.stringify(item));
    } else {
      localStorage.removeItem('favItem' + (id))
    }
  }
  for (var i = 0; i < getArray.length; i++) {
    let x = getArray[i]
    favList.push( JSON.parse(localStorage.getItem('favItem' + [x]) || '0'));
}

  const onChangeOption = (event) => {
    localStorage.setItem('searchQuery', event.target.value)
    setQuery(event.target.value);
  }

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return posts.slice(firstPageIndex, lastPageIndex);
  }, [posts, currentPage]);

  const currentFavoritesData = useMemo(() => {
    const firstPageIndex = (currentFavoritePage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return favList.slice(firstPageIndex, lastPageIndex);
  }, [favList, currentFavoritePage]);

  useEffect(() => {
    if(currentFavoritesData.length === 0 && currentFavoritePage !== 1){
      setCurrentFavoritePage(currentFavoritePage - 1)
    }
  },[currentFavoritesData])

  useEffect(() =>{
    if(currentTableData.length && posts.length - pageSize*currentPage < pageSize*2){
      fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${query}&page=0&hitsPerPage=${pageSize*currentPage + pageSize*9}`)
      .then(res => res.json())
        .then(res =>{ 
          let asd = res.hits.filter(hit =>{ if(hit.story_url && hit.story_title && hit.created_at){ return hit}})
          setPosts(asd)})
          .catch(err => console.log(err));
    }
  },[currentPage])

  useEffect(() => {
    const currentQuery = localStorage.getItem('searchQuery') || ''
    setQuery(currentQuery)
    fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${query}&page=0&hitsPerPage=${pageSize*9}`)
      .then(res => res.json())
        .then(res =>{ 
          let postsFiltered = res.hits.filter(hit => {if (hit.story_url && hit.story_title && hit.created_at) { return hit }})
          setPosts(postsFiltered)})
          .catch(err => console.log(err));
    if (getArray !== 0) {
      setFavorites([...getArray])
    }else { setFavorites([]) }
  },[])

  useEffect(() => {
    if(query !== ''){
      fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${query}&page=0&hitsPerPage=${pageSize*9}`)
      .then(res => res.json())
        .then(res =>{ 
          let filteredPosts = res.hits.filter(hit =>{ if (hit.story_url && hit.story_title && hit.created_at) { return hit }})
          setPosts(filteredPosts)})
          .catch(err => console.log(err));
    setCurrentPage(1);
    }
  },[query])

  return (
    <div className="App">
      { currentTableData.length && window.location.pathname === '/' &&
        <div className="container">
          <div className='grid-container'>
           <DropdownSelector optionsConstants={DROPDOWN_CONSTANTS} changeOption={onChangeOption} query={query} />
            <PostsList postsList={currentTableData} favorites={favorites} addFav={addFav}/>
            <div className='pagination-menu-container'>
              <PaginationMenu
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={ posts.length }
              pageSize={pageSize}
              onPageChange={page => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
      }
      { window.location.pathname === '/favorites'  && 
      <div className='container'>
        <div className='grid-container'>
        <PostsList postsList={currentFavoritesData} favorites={favorites} addFav={addFav}/>
        <div className='pagination-menu-container'>
          <PaginationMenu
            className="pagination-bar"
            currentPage={currentFavoritePage}
            totalCount={ getArray.length }
            pageSize={pageSize}
            onPageChange={page => setCurrentFavoritePage(page)}
          />
        </div>
        </div>
      </div>
      }
    </div>
  );
}

export default App;
