'use client';
import React from 'react';
import clsx from 'clsx';
import { Rss, Sun, Moon } from 'react-feather';
import Cookie from 'js-cookie';
import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';
import { LIGHT_COLORS, DARK_COLORS } from '@/constants';
import styles from './Header.module.css';

function Header({ theme, className, ...delegated }) {
  const [selectedTheme, setSelectedTheme] = React.useState(theme);

  function handleSwitch() {
    const nextTheme = selectedTheme === 'light' ? 'dark' : 'light';
    setSelectedTheme(nextTheme);

  Cookie.set('color-theme', nextTheme, {
    expires: 1000,
  });

  const root = document.documentElement;
  const colors = nextTheme === 'light' ? LIGHT_COLORS : DARK_COLORS;

  root.setAttribute('data-color-theme', nextTheme);
  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
  }
  return (
    <header
      className={clsx(styles.wrapper, className)}
      {...delegated}
    >
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: 'translate(2px, -2px)',
            }}
          />
          <VisuallyHidden>
            View RSS feed
          </VisuallyHidden>
        </button>
        <button className={styles.action} onClick={handleSwitch}>
          <Sun size="1.5rem" />
          <VisuallyHidden>
            Toggle dark / light mode
          </VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
