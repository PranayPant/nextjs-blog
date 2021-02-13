import { useState } from 'react';

import styles from './styles.module.scss';

export default function Emoji(props) {
   const { type, height = '40', width = '40', onClick } = props;
   const [state, setState] = useState({ selected: false });

   function handleSelection() {
      setState((prev) => ({ ...prev, selected: true }));
   }

   const imgProps = {
      src: `/icons/${type}.svg`,
      className: styles[type],
      onClick,
      height,
      width,
   };

   return <img {...imgProps} />;
}
