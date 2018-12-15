import React from 'react';

const RepoList = ({ repos }) => (

  <div>
    {console.log(repos)}
    <h4> Repo List Component </h4>
    There are {repos.length} repos.
    <ul>
      {repos.map((repo, i) => {
        return <li key={i}>
          <a href={"http://github.com/" + repo.url}>
            {"http://github.com/" + repo.url}
          </a>
        </li>
      })}
    </ul>
  </div>
)

export default RepoList;