import './App.css'
import reactLogo from './assets/react.svg'
import { useCreateUser, usePosts, useUsers } from './bff/queries/user'
import viteLogo from '/vite.svg'

function App() {
  const { data, isLoading, isRefetching, refetch, error, isError } = useUsers()
  const { data: posts, isLoading: isLoadingPosts, isRefetching: isRefetchingPosts } = usePosts()
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <button onClick={() => refetch()}>refresh</button>

      <div style={{ display: 'grid',  gridColumn: 2 }}>

      
      <div>

      {isLoading || isRefetching && <h2>Loading</h2>}
      {isError && <h2>{error?.message}</h2>}
      {data && data?.map(el => (
        <div key={el.id}>
          <p>
            {el.address.city}
          </p>
        </div>
        ))}
      </div>

      <div>

      {isLoadingPosts || isRefetchingPosts && <h2>Loading</h2>}
      {posts && posts?.map(el => (
        <div key={el.id}>
        <p>
          {el.body}
        </p>
      </div>
      ))}
      </div>

</div>
    </>
  )
}

export default App
