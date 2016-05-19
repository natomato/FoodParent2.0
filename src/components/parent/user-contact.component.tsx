import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Link } from 'react-router';
import * as FontAwesome from 'react-fontawesome';
import './../../../node_modules/font-awesome/css/font-awesome.css';
import * as Select from 'react-select';
import './../../../node_modules/react-select/dist/react-select.css';

var Settings = require('./../../constraints/settings.json');
import * as styles from './user-contact.component.css';
import { PersonModel, personStore } from './../../stores/person.store';
import { addLoading, removeLoading } from './../../utils/loadingtracker';
import ErrorMessage from './../error-message.component';

export interface IUserContactProps {
  person: PersonModel;
  editable: boolean;
  async: boolean;
  error: Array<string>;
}
export interface IUserContactStatus {
  contact?: string;
}
export default class UserContactComponent extends React.Component<IUserContactProps, IUserContactStatus> {
  constructor(props : IUserContactProps) {
    super(props);
    let self: UserContactComponent = this;
    this.state = {
      contact: "",
    };
  }
  public componentDidMount() {
    let self: UserContactComponent = this;
    self.updateProps(self.props);
  }
  public componentWillUnmount() {
    let self: UserContactComponent = this;
  }
  public componentWillReceiveProps (nextProps: IUserContactProps) {
    let self: UserContactComponent = this;
    self.updateProps(nextProps);
  }

  private updateProps(props: IUserContactProps) {
    let self: UserContactComponent = this;
    if (props.person) {
      self.setState({contact: props.person.getContact()});
    }
  }
  private updateAttribute = (selected?: any) => {
    let self: UserContactComponent = this;
    self.props.person.setContact(self.state.contact);
    if (self.props.async) {
      personStore.updatePerson(self.props.person);
    } else {

    }
  }

  render() {
    let self: UserContactComponent = this;
    if (self.props.person && (self.props.editable || self.props.person.getId() == 0)) {
      return (
        <div className={styles.wrapper}>
          <div className={styles.label} onMouseUp={()=> {
            // if (self.props.editable) {
            //   self.setState({editing: true});
            // }
          }}>
            <FontAwesome className='' name='at' /> Contact (E-mail)
          </div>
          <div className={styles.edit}>
            <input type="email" className={styles.input} key={self.props.person.getId() + "contact"} placeholder="enter e-mail address..."
              autoComplete
              value={self.state.contact}
              onChange={(event: any)=> {
                self.setState({contact: event.target.value});
              }}
              onKeyPress={(event)=> {
                // if (event.key == 'Enter') {
                //   self.updateAttribute();
                // }
              }}
              onBlur={()=> {
                self.updateAttribute();
              }} />
          </div>
          <div className={styles.message}>
            <ErrorMessage error={self.props.error} match={new Array<string>("e502, e503")} />
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.wrapper2}>
          <div className={styles.label}>
            <FontAwesome className='' name='at' /> Contact (E-mail)
          </div>
          <div className={styles.value}>
            {self.state.contact}
          </div>
        </div>
      );
    }

  }
}
