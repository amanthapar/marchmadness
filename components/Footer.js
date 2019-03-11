import React from 'react';
import { Menu, Image, Icon } from 'semantic-ui-react';
import { Link } from '../routes';

const Footer = () => {
  return (
    <Menu borderless inverted style={{ marginTop: '80%' }}>
      <Menu.Item>
        <Image
          centered
          size="mini"
          src="https://upload.wikimedia.org/wikipedia/en/thumb/7/77/2019_NCAA_Men%27s_Final_Four_logo.svg/220px-2019_NCAA_Men%27s_Final_Four_logo.svg.png"
        />
      </Menu.Item>
      <Link route="/contests/about">
        <a className="item">About</a>
      </Link>
      <Menu.Menu position="right">
        <Menu.Item>
          <Icon name="basketball ball" size="large" />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};
export default Footer;
