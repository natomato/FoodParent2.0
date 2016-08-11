import React from 'react';

let ServerSetting = require('./../../setting/server.json');
require('./tree-panel.component.scss');
var FontAwesome = require('react-fontawesome');
import { TREEDETAILMODE } from './../utils/enum';
let TreeActions = require('./../actions/tree.actions');

import TreeInfo from './../tree/tree-info.component';
import TreeControl from './tree-control.component';

export default class TreePanel extends React.Component {
  constructor() {
    super();
  }
  componentWillMount() {
    this.setState({open: false});
  }
  componentDidMount () {
    this.updateProps(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.updateProps(nextProps);
  }
  updateProps(props) {
    this.setState({open: props.open});
  }
  render () {
    let open = "";
    let wide = "";
    if (this.state.open) {
      open = " open";
    }
    let size, info, post, parent, history, close, body;
    // Close
    close = <div className="icon-group close" onClick={() => {
      TreeActions.setCode(0);
      this.context.router.push({pathname: ServerSetting.uBase + '/'});
    }}>
      <FontAwesome className="icon" name='close' />
    </div>;
    // Info
    info = <div className="icon-group" onClick={() => {
      this.context.router.push({pathname: window.location.pathname});
    }}>
      <FontAwesome className="icon icon-info-circle" name='info-circle' />
      <span className="icon-text">
        Info
      </span>
    </div>;
    // Post
    post = <div className="icon-group" onClick={() => {
      this.context.router.push({pathname: window.location.pathname, hash: "#post"});
    }}>
      <FontAwesome className="icon icon-group" name='pencil-square' />
      <span className="icon-text">
        Post
      </span>
    </div>;
    // Parent
    parent = <div className="icon-group" onClick={() => {
      this.context.router.push({pathname: window.location.pathname, hash: "#parent"});
    }}>
      <FontAwesome className="icon icon-group" name='group' />
      <span className="icon-text">
        Parent
      </span>
    </div>;
    // History
    history = <div className="icon-group" onClick={() => {
      this.context.router.push({pathname: window.location.pathname, hash: "#history"});
    }}>
      <FontAwesome className="icon icon-line-chart" name='line-chart' />
      <span className="icon-text">
        History
      </span>
    </div>;
    // Expand
    size = <div className="icon-group wide-landscape" onClick={()=> {
      this.context.router.push({pathname: window.location.pathname, hash: "#all"});
    }}>
      <FontAwesome className="icon" name='arrow-circle-o-left' />
      <span className="icon-text">
        Expand
      </span>
    </div>;
    if (this.props.mode == TREEDETAILMODE.ALL) {
      wide = " wide";
      // Collapse
      size = <div className="icon-group wide-landscape" onClick={()=> {
        this.context.router.push({pathname: window.location.pathname});
      }}>
        <FontAwesome className="icon" name='arrow-circle-o-right' />
        <span className="icon-text visible">
          Collapse
        </span>
      </div>;
      info = null;
      post = null;
      parent = null;
      history = null;
    }
    if (this.props.mode == TREEDETAILMODE.INFO) {
      // Info
      info = <div className="icon-group active">
        <FontAwesome className="icon icon-info-circle" name='info-circle' />
        <span className="icon-text">
          Info
        </span>
      </div>;
      body = <TreeInfo />;
    }
    if (this.props.mode == TREEDETAILMODE.POST) {
      // Post
      post = <div className="icon-group active">
        <FontAwesome className="icon icon-group" name='pencil-square' />
        <span className="icon-text">
          Post
        </span>
      </div>;
    }
    if (this.props.mode == TREEDETAILMODE.PARENT) {
      // Parent
      parent = <div className="icon-group active">
        <FontAwesome className="icon icon-group" name='group' />
        <span className="icon-text">
          Parent
        </span>
      </div>;
    }
    if (this.props.mode == TREEDETAILMODE.HISTORY) {
      // History
      history = <div className="icon-group active">
        <FontAwesome className="icon icon-line-chart" name='line-chart' />
        <span className="icon-text">
          History
        </span>
      </div>;
    }
    return (
      <div className={"tree-panel-wrapper" + open + wide}>
        <div className="left">
          <TreeControl />
        </div>
        <div className="right">
          <div className="menu">
            {size}
            {info}
            {post}
            {parent}
            {history}
            {close}
          </div>
          {body}
        </div>
      </div>
    );
  }
}
TreePanel.contextTypes = {
    router: React.PropTypes.object.isRequired
}
