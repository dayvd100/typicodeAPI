import { Component } from 'react';
import './App.css';

class App extends Component{

    state = {
    posts: [],
    photos: []
    };

    componentDidMount(){
       this.loadPosts()
    }

    loadPosts =  async() => {
      const postsResponse = fetch("https://jsonplaceholder.typicode.com/posts")
      const photosResponse = fetch("https://jsonplaceholder.typicode.com/photos");
      
      const [posts, photos] = await Promise.all([postsResponse, photosResponse]);
 
      const postsJson = await posts.json();
      const photosJson = await photos.json();

      const postsAndPhotos = postsJson.map((post, index) => {
        return {...post, cover: photosJson[index].url}
        
      })

      this.setState({posts: postsAndPhotos})
    }

    componentDidUpdate(){
    }

    componentWillUnmount(){
    }


  render(){
    const {posts} = this.state;
    console.log(posts);

    return (
      <section className="container">
          <div className="posts">
            {posts.map((post)=> (
            <div key={post.id} className="post-content">
            <img src={post.cover} alt='nothing'/>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            </div>
            )) }
          </div>
      </section>
        );
  }
}

export default App;
