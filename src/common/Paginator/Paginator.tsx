import React, { FC } from 'react';
import { IPaginatorProps } from '../../interfaces';
import s from './Paginator.module.scss';

const Paginator: FC<IPaginatorProps> = ({
  items,
  pageSize,
  currentPage,
  onChangedPage,
}: IPaginatorProps) => {
  const pagesCount = Math.ceil(items / pageSize);
  const pages: number[] = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  const curP = currentPage;
  const curPF = curP - 5 < 0 ? 0 : curP - 5;
  const curPL = curP + 5;
  const slicedPages = pages.slice(curPF, curPL);

  return (
    <div className={s.paginationWrapper}>
      {slicedPages.map((p) => {
        return (
          <button
            key={p}
            className={currentPage === p ? `${s.paginationBtn} ${s.selectedPage}` : s.paginationBtn}
            onClick={() => onChangedPage(p)}
          >
            {p}
          </button>
        );
      })}
    </div>
  );
};

export default Paginator;
