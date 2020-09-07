import {combineReducers} from 'redux';
import {authReducer} from "../reducers/authReducer";
import {postsReducer} from './postsReducer';
import {uiReducer} from './uiReducer';
import {commentsReducer} from './commentsReducer';
import { bloggerReducer } from './bloggerReducer';
import { resourceReducer } from './resourceReducer';
import {twitterAccReducer} from './twitterAccReducer'
import {coursesReducer} from './courseReducer';
import {channelReducer} from './channelReducer'

const reducers = combineReducers({
auth: authReducer,
posts: postsReducer,
ui: uiReducer,
comments: commentsReducer,
bloggers: bloggerReducer,
resources: resourceReducer,
twitter: twitterAccReducer,
courses: coursesReducer,
channels: channelReducer
});

export default reducers;

