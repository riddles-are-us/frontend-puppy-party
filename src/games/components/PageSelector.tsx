import React from "react";
import "./PageSelector.css";
import NextPageButton from "./buttons/NextPageButton";
import PrevPageButton from "./buttons/PrevPageButton";

interface Props {
  currentPage: number;
  pageCount: number;
  fontSize: number;
  onClickPrevPageButton: () => void;
  onClickNextPageButton: () => void;
}

const PageSelector = ({
  currentPage,
  pageCount,
  fontSize,
  onClickPrevPageButton,
  onClickNextPageButton,
}: Props) => {
  const enableNextPageButton = currentPage < pageCount - 1;
  const enablePrevPageButton = currentPage > 0;

  return (
    <div className="page-selector-container">
      <div className="page-selector-prev-button">
        <PrevPageButton
          isDisabled={!enablePrevPageButton}
          onClick={onClickPrevPageButton}
        />
      </div>

      <p
        className={`page-selector-page-number-text`}
        style={{
          fontSize: `${fontSize}px`,
        }}
      >{`${currentPage + 1}/${pageCount}`}</p>
      <div className="page-selector-next-button">
        <NextPageButton
          isDisabled={!enableNextPageButton}
          onClick={onClickNextPageButton}
        />
      </div>
    </div>
  );
};

export default PageSelector;
