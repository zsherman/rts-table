import * as React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;

  span {
    margin-right: 10px;
    cursor: pointer;
  }
`;

type IPageProps = {
  selected: boolean;
};

const Page = styled.span<IPageProps>`
  padding: 3px 6px;
  border-radius: 3px;
  background: ${props => (props.selected ? "blue" : "none")};
  color: ${props => (props.selected ? "white" : "inherit")};
`;

interface IPaginationProps {
  currentPage: number;
  pageCount: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onPageClick: (page: number) => void;
}

export const Pagination: React.FunctionComponent<IPaginationProps> = ({
  currentPage,
  pageCount,
  onNextPage,
  onPrevPage,
  onPageClick
}) => {
  const showPrev = pageCount > 1;
  const showNext = pageCount > 1;
  const pages = new Array(pageCount).fill(1).map((_, i) => i + 1);

  return (
    <Container>
      {showPrev && <span onClick={onPrevPage}>Previous</span>}
      {pages.map((p: number) => (
        <Page
          key={`page-${p}`}
          selected={currentPage === p}
          onClick={() => onPageClick(p)}
        >
          {p}
        </Page>
      ))}
      {showNext && <span onClick={onNextPage}>Next</span>}
    </Container>
  );
};
