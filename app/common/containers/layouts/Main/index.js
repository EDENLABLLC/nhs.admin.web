import React from 'react';
import { provideHooks } from 'redial';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import Icon from 'components/Icon';
import Aside from 'containers/blocks/Aside';

import { fetchDictionaries } from 'redux/dictionaries';

import styles from './styles.scss';

const App = ({ children }) => (
  <div className={styles.main}>
    <main>
      <Aside />
      <div className={styles.content}>
        { children }
      </div>
    </main>
    <footer className={styles.footer}>
      <a href="http://nebo15.com" rel="noopener noreferrer" target="_blank">
        <Icon name="nebo15" />
      </a>
    </footer>
  </div>
);
export default provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchDictionaries({}, { useCache: true })),
})(withStyles(styles)(App));
