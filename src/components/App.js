import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCategories, getPosts, getPostComments } from '../utils/api'
import { addCategories, addPosts, addPost, addComments } from '../actions'
import Posts from './Posts'
import PostDetail from './PostDetail'
import CreatePost from './CreatePost'
import EditPost from './EditPost'
import { ALL_CATEGORY } from './Categories'

class App extends Component {
  componentDidMount() {
    // keep redux store "normalized" (for instance do not add comments as property into store.posts[i])
    getCategories().then(categories => {
      this.props.addCategories(categories)
    })
    getPosts().then(fetchedPosts => {
      const posts = fetchedPosts.filter(p => p.deleted === false)
      this.props.addPosts(posts)
      posts.forEach(p => {
        getPostComments(p.id).then(fetchedComments => {
          const comments = fetchedComments.filter(p => p.deleted === false)
          this.props.addComments(comments)
        })
      })
    })
  }
  render() {
    const { posts, categories, postsByPostId, categoriesByPath } = this.props
    return (
      <div>

        { /* http GET /posts */ }
        <Route exact path='/' render={routeProps => {
          // view1: Default (Root)
          return (
            <Posts 
              posts={posts}
              prevPath={routeProps.location.pathname}
              categories={categories}
              category={ALL_CATEGORY}
            />
          )
        }}/>

        { /* http GET /:category/posts */ }
        <Route exact path='/view/:categoryPath/posts' render={routeProps => {
          // view2: Category View
          const category = categoriesByPath.get(routeProps.match.params.categoryPath)
          if (category) {
            return (
              <Posts
                posts={posts.filter(post => post.category.name === category.name)}
                prevPath={routeProps.location.pathname}
                categories={categories}
                category={category.name}
              />
            )
          }
          else {
            return <p>Category not found</p>
          }
        }}/>

        { /* http GET /posts/:id */ }
        <Route path='/view/posts/:postId' render={routeProps => {
          // view3: post detail view
          const post = postsByPostId.get(routeProps.match.params.postId)
          if (post) {
            return (
              <PostDetail
                post={post}
                prevPath={routeProps.location.pathname}
              />
            )
          }
          else {
            return <p>Post not found</p>
          }
        }}/>

        { /* http POST /posts */ }
        <Route exact path='/create/posts' render={routeProps => {
          // view4.1: Create post View
          /*
          'prevPath' comes from Posts.onClick / history.push()
          if it is 'undefined' (for instance if an url is copy/paste in the browser) then use the root url
          */
          const prevPath = routeProps.location.state ? routeProps.location.state.prevPath : '/'
          return (
            <CreatePost
              categories={categories}
              onPostCreated={this.props.addPost}
              prevPath={prevPath}
            />
          )
        }}/>

        { /* http PUT /posts/:id */ }
        <Route exact path='/edit/posts/:postId' render={routeProps => {
          // view4.2: Edit post View
          const post = postsByPostId.get(routeProps.match.params.postId)
          if (post) {
            // 'prevPath' comes from Post.onClick / history.push()
            const prevPath = routeProps.location.state ? routeProps.location.state.prevPath : '/'
            return (
              <EditPost 
                post={post}
                categories={categories}
                onPostModified={this.props.addPost}
                prevPath={prevPath}
              />
            )
          }
          else {
            return <p>Post not found</p>
          }
        }}/>

      </div>
    )
  }
}

// map our "normalized" redux store into "structured" props
function mapStateToProps(storeState) {
  const categoriesByName = storeState.categories.reduce((accum, c) => (
    accum.set(c.name, c)
  ), new Map())
  const posts = storeState.posts.map(p => {
    const category = categoriesByName.get(p.category)
    return {
      ...p,
      // enrich post object with the associated comments:
      comments: storeState.comments.filter(c => c.parentId === p.id),
      // replace category string property with a category object:
      category: category ? category : { name: '', path: '' },
    }
  })
  return {
    categories: storeState.categories,
    categoriesByPath: storeState.categories.reduce((accum, c) => (
      accum.set(c.path, c)
    ), new Map()),
    posts,
    postsByPostId: posts.reduce((accum, p) => (
      accum.set(p.id, p)
    ), new Map()),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCategories: (data) => dispatch(addCategories(data)),
    addPosts: (data) => dispatch(addPosts(data)),
    addComments: (data) => dispatch(addComments(data)),
    addPost: (data) => dispatch(addPost(data)),
  }
}

/*
withRouter() is needed for the <Route> to work correctly (even if the history is not used in App component)
see https://github.com/ReactTraining/react-router/issues/4671
*/
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

