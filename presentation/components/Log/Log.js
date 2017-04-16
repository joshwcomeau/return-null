import { PureComponent } from 'react';

export default class Log extends PureComponent {
  render() {
    console.info(this.props.children);

    return null;
  }
}
