import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Link } from 'react-router';
import * as FontAwesome from 'react-fontawesome';
import './../../../node_modules/font-awesome/css/font-awesome.css';
import * as AltContainer from 'alt-container';

var Settings = require('./../../constraints/settings.json');
import * as styles from './tree-add.component.css';
import { TreeModel, treeStore } from './../../stores/tree.store';
import { FoodModel, foodStore } from './../../stores/food.store';
import { FlagModel, flagStore } from './../../stores/flag.store';
import FoodComponent from './food.component';
import AddressComponent from './address.component';
import DescriptionComponent from './description.component';
import FlagComponent from './flag.component';
import OwnershipComponent from './ownership.component';
import LocationComponent from './location.component';
import { LogInStatus } from './../app.component';
import { authStore } from './../../stores/auth.store';

export interface ITreeAddProps {
  foods?: Array<FoodModel>;
  trees?: Array<TreeModel>;
  tree?: TreeModel;
}
export interface ITreeAddStatus {

}
export default class TreeAddComponent extends React.Component<ITreeAddProps, ITreeAddStatus> {
  static contextTypes: any;
  constructor(props : ITreeAddProps) {
    super(props);
    let self: TreeAddComponent = this;
    this.state = {

    };
  }
  public componentDidMount() {
    let self: TreeAddComponent = this;
    self.updateProps(self.props);
  }
  public componentWillUnmount() {
    let self: TreeAddComponent = this;
  }
  public componentWillReceiveProps (nextProps: ITreeAddProps) {
    let self: TreeAddComponent = this;
    self.updateProps(nextProps);
  }

  private updateProps = (props: ITreeAddProps) => {
    let self: TreeAddComponent = this;
    if (props.foods.length != 0) {
      if (authStore.getAuth().getIsManager()) {

      } else {

      }
    }
  }

  render() {
    let self: TreeAddComponent = this;
    if (self.props.tree && self.props.foods.length) {
      var food: FoodModel = foodStore.getFood(self.props.tree.getFoodId());
      return (
        <div className={styles.wrapper}>
          <div className={styles.treeinfo}>
            <FoodComponent tree={self.props.tree} foods={self.props.foods} editable={true} async={false} />
            <div className={styles.close}><FontAwesome className='' name='close' onClick={()=> {
              self.context.router.push({pathname: Settings.uBaseName + '/'});
            }}/></div>
          </div>
          <div className={styles.basicinfo}>
            <AltContainer stores={
              {
                flags: function (props) {
                  return {
                    store: flagStore,
                    value: flagStore.getState().flags
                  };
                }
              }
            }>
              <LocationComponent tree={self.props.tree} editable={true} async={false} />
              <AddressComponent tree={self.props.tree} editable={true} async={false} />
              <DescriptionComponent tree={self.props.tree} editable={true} async={false} />
            </AltContainer>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.wrapper}>
        </div>
      );
    }
  }
}

TreeAddComponent.contextTypes = {
  router: function () {
    return React.PropTypes.func.isRequired;
  }
};


/*

<FlagComponent tree={tree} flags={flagStore.getState().flags} editable={true} async={false} />
<OwnershipComponent tree={tree} editable={true} async={false} />


<LocationComponent tree={tree} editable={self.state.editable} />
<AddressComponent tree={tree} editable={self.state.editable} />
<DescriptionComponent tree={tree} editable={self.state.editable} />
<FlagComponent tree={tree} flags={flagStore.getState().flags} editable={self.state.editable} />
<OwnershipComponent tree={tree} editable={self.state.editable} />
*/

/*
<img className={styles.icon} src={Settings.uBaseName + Settings.uStaticImage + food.getIcon()} />
<div className={styles.name}>{food.getName() + ' #' + tree.getId()}</div>
*/
