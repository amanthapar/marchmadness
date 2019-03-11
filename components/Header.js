import React from 'react';
import { Menu, Image, Icon } from 'semantic-ui-react';
import { Link } from '../routes';

const Header = () => {
  return (
    <Menu style={{ marginTop: '20px' }}>
      <Menu.Item>
        <Image
          centered
          size="mini"
          src="https://upload.wikimedia.org/wikipedia/en/thumb/7/77/2019_NCAA_Men%27s_Final_Four_logo.svg/220px-2019_NCAA_Men%27s_Final_Four_logo.svg.png"
        />
      </Menu.Item>
      <Link route="/">
        <a className="item">MARCH MADNESS 2019</a>
      </Link>
      <Link route="/about">
        <a className="item">About</a>
      </Link>
      <Menu.Menu position="right">
        <Menu.Item>
          <Icon name="basketball ball" size="large" />
        </Menu.Item>
        <Link route="/">
          <a className="item">All Contests</a>
        </Link>

        <Link route="/contests/new">
          <a className="item">Add Contest</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
export default Header;
