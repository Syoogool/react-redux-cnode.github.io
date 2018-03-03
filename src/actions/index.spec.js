/* global afterEach */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import * as actions from './index'
import * as types from '../constants/topic'

/* global describe it expect */
/* 测试action就是测试是否返回了正确的action */

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

// 同步action
describe('actions', () => {
  it('should create an action to select a tab', () => {
    const tab = 'good'
    const expectedAction = {
      type: types.SELECT_TAB,
      tab
    }

    expect(actions.selectTab(tab)).toEqual(expectedAction)
  })

  it('should create an action to receive a post', () => {
    const tab = 'good'
    const pageCount = 1
    const json = { data: [1, 2, 3, 4, 5] }
    const posts = json.data
    const expectedAction = {
      type: types.RECEIVE_POSTS,
      receiveAt: Date.now(),
      tab,
      pageCount,
      posts
    }
    expect(actions.receivePosts(tab, pageCount, json)).toEqual(expectedAction)
  })
})

// 异步action
describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates fetchPostsIfNeeded when fetching post has been done', () => {
    nock('https://cnodejs.org/api/v1')
      .get('/topicsss')
      // .query({ tab: 'all', page: 1 })
      .reply(200, {
        body: { posts: [1, 2, 3, 4, 5] }
      })

    const expectedActions = [
      { type: types.REQUEST_POSTS },
      { type: types.RECEIVE_POSTS, body: { post: [1, 2, 3, 4, 5] } }
    ]
    const store = mockStore({ posts: [1, 2, 3, 4, 5] })

    return store.dispatch(actions.fetchPostsIfNeeded())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
