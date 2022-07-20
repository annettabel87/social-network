import React, { FC } from 'react';
import s from './Preloader.module.scss';

const Preloader: FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.mainCircle}>
        <div className={s.greenCircle}>
          <div className={s.brownCircle}></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
