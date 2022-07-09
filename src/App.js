import axios from 'axios';
import React, { useState }  from 'react';
import './App.css';
import ReposList from './components/ReposList';

function App() {
  const [repos, setRepos] = useState([])
  const [totalfound, setTotalfound] = useState(0)
  const [query, setQuery] = useState('')
  const [prevquery, setPrevquery] = useState('')
  let url = ''
  const [err, setErr] = useState('')

  function newQuery(e) {
    e.preventDefault()
    url =  "https://api.github.com/search/repositories?q=$" + query + "&per_page=10&page=1"
    fetchRepo(url)
    setPrevquery(query)
    setQuery('')
  }
  async function fetchRepo(url){
    try {
      const response = await axios.get(url)
      setErr('')
      setRepos(response.data.items)
      setTotalfound(response.data.total_count)
    }
    catch (e) {
      setErr(e.message)
    }
   
  }
  return (
    <div>
      <form>
        <input
        value = {query}
        placeholder= "Поиск"
        onChange = {e =>  setQuery( e.target.value)}
        />
      
        {
          query === ""
          ?
          <button disabled onClick={newQuery}>Search</button>
          :
          <button onClick={newQuery}>Search</button>
        }
      </form>
        {
          prevquery === ""
          ?
          <div>
            Введите ключевое слово для поиска на github
          </div>
          :
          <div></div>
        }
        {
          err === ''
          ?
          <ReposList repos={repos} totalfound = {totalfound} query={prevquery}/>
          :
          <div className='item__body error'>
            <div> Ошибка </div>
            <div> {err}</div>
          </div>
        }
              
    </div>
  );
}

export default App;
