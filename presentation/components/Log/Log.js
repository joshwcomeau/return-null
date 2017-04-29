import { PureComponent } from 'react';

export default class Log extends PureComponent {
  componentDidUpdate() {
    console.info(this.props.children);
  }

  render() {
    return null;
  }
}
