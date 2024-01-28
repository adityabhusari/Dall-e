import React, { useEffect, useState } from 'react'
import { Card, FormField, Loader } from '../components/index'

const RenderCards = ({data, title}) => {
  if (data?.length > 0){
    return data.map((post) => <Card key={post._id} {...post}/>)
  }

  return (
    <h2 className='mt-5 font-bold text-blue-400 text-xl uppercase'>
      {title}
    </h2>
  )
}


export const Home = () => {
  const [loading, setLoading] = useState(false)
  const [allPosts, setAllPosts] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState(null)

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        
        const result = await response.json();
        setAllPosts(result.posts.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);

    setTimeout(() => {
      const searchRes = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || 
      item.prompt.toLowerCase().includes(searchText.toLowerCase()));

      setSearchResults(searchRes)
    }, 500);

  }

  return (
    <section className='max-w-7xl mx-auto py-5'>
      <div>
        <h1 className = 'font-extrabold text-[30px]'>Community Showcase</h1>
        <p className = 'mt-2 text-gray-400 text-[16px] max-w-[500px]'>Browse through communitie's collective imagination</p>
      </div>

      <div className='mt-14'>
        <FormField 
          labelName = 'Search posts'
          type = 'text'
          name = 'text'
          placeholder = 'Search posts'
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className='mt-14'>
        {loading ? (
          <div className='flex justify-ceter items-center'>
            <Loader/>
          </div>
        ) : (
        <>
          {searchText && (
            <h2 className = 'font-medium text-[#666e75]'>
              Showing Results for <span className='text-black'> {searchText} </span>
            </h2>
          )}
          <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 gap-3 grid-cols-1'>
              {searchText ? (
                <RenderCards
                  data={searchResults}
                  title = "No search results found"
                />
              ) : (
                <RenderCards
                  data={allPosts}
                  title = "No posts found"
                />
              )}
          </div>
        </>)}
      </div>
    </section>
  )
}
