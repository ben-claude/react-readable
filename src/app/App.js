import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCategories, getPosts, getPostComments } from '../utils/api'
import * as categoryActions from '../category/Actions'
import { ALL_CATEGORY } from '../category/Categories'
import * as postActions from '../post/Actions'
import Posts from '../post/Posts'
import PostDetail from '../post/PostDetail'
import CreatePost from '../post/CreatePost'
import EditPost from '../post/EditPost'
import * as commentActions from '../comment/Actions'
import NotFound from '../components/NotFound'

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
      <Switch>

        { /* http GET /posts */ }
        <Route exact path='/' render={routeProps => (
          // view1: Default (Root)
            <Posts 
              posts={posts}
              prevPath={routeProps.location.pathname}
              categories={categories}
              category={ALL_CATEGORY}
            />
        )}/>

        { /* http POST /posts */ }
        <Route exact path='/posts/create' render={routeProps => {
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
        <Route path='/posts/:postId' render={routeProps => {
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
            return <NotFound />
          }
        }}/>

        { /* http GET /:category/posts */ }
        <Route exact path='/:categoryPath' render={routeProps => {
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
            return <NotFound />
          }
        }}/>

        { /* http GET /posts/:id */ }
        <Route exact path='/:categoryPath/:postId' render={routeProps => {
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
            return <NotFound />
          }
        }}/>

        <Route component={NotFound}/>

      </Switch>
    )
  }
}

// map our "normalized" redux store into "structured" props
function mapStateToProps({ categories, posts, comments }) {
  const categoriesByName = categories.reduce((accum, c) => (
    accum.set(c.name, c)
  ), new Map())
  const enrichedPosts = posts.map(p => {
    const category = categoriesByName.get(p.category)
    return {
      ...p,
      // enrich post object with the associated comments:
      comments: comments.filter(c => c.parentId === p.id),
      // replace category string property with a category object:
      category: category ? category : { name: '', path: '' },
    }
  })
  return {
    categories,
    categoriesByPath: categories.reduce((accum, c) => (
      accum.set(c.path, c)
    ), new Map()),
    posts: enrichedPosts,
    postsByPostId: enrichedPosts.reduce((accum, p) => (
      accum.set(p.id, p)
    ), new Map()),
  }
}

/*
withRouter() is needed for the <Route> to work correctly (even if the history is not used in App component)
see https://github.com/ReactTraining/react-router/issues/4671
*/
export default withRouter(connect(mapStateToProps, { ...categoryActions, ...postActions, ...commentActions })(App))

