import React from 'react'
import RepoItem from './RepoItem';

const ReposList = ({repos, totalfound, query}) => {
  return (
    <div className='repos'>
      {
        query === ""
        ?
        <div></div>
        :
        <div className="repos__title">По вашему запросу <strong>{query}</strong> найдено {totalfound} результатов</div>

      }
      <div className="repos__cont">
        {
          repos.map((repo, index)=>
            <RepoItem repo = {repo} index={index + 1 } key={index}/>
          )
        }
      </div>
    </div>
  )
}

export default ReposList