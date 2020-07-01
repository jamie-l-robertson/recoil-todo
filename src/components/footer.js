import React from 'react';
import { ReactComponent as GithubIcon } from '../icons/github.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <p>View project on <a href="https://github.com/jamie-l-robertson/recoil-todo" title="Link to Github repository"><GithubIcon /></a></p>
    </footer>
  )
}

export default Footer;