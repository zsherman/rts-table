import * as React from "react";
import styled from "@emotion/styled";

enum NavDirection {
  Previous,
  Next,
}

interface INavProps {
  direction: NavDirection;
}

type IPageProps = {
  selected: boolean;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

// Nav = previous / next
const NavButton = styled.button`
  cursor: pointer;
`;

// Nav container
const Nav = styled.div<INavProps>`
  display: flex;
  flex-grow: 1;
  button {
    margin: 0
      ${props =>
        props.direction === NavDirection.Previous ? "0 0 auto" : "auto 0 0"};
  }
`;

// Pages container
const PagesContainer = styled.div`
  margin-left: 10px;
`;

const Page = styled.span<IPageProps>`
  padding: 3px 6px;
  border-radius: 3px;
  cursor: pointer;
  margin: 10px;
  background: ${props => (props.selected ? "#1DA7FD" : "none")};
  color: ${props => (props.selected ? "white" : "inherit")};
`;

interface IPaginationProps {
  visible: boolean;
  currentPage: number;
  pageCount: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onPageClick: (page: number) => void;
}

export const Pagination: React.FunctionComponent<IPaginationProps> = ({
  visible,
  currentPage,
  pageCount,
  onNextPage,
  onPrevPage,
  onPageClick,
}) => {
  if (!visible) return null;
  const pages = new Array(pageCount).fill(1).map((_, i) => i + 1);

  return (
    <Container>
      <Nav direction={NavDirection.Previous}>
        <NavButton onClick={onPrevPage} disabled={currentPage === 1}>
          Previous
        </NavButton>
      </Nav>
      <PagesContainer>
        {pages.map(p => (
          <Page
            key={`page-${p}`}
            selected={currentPage === p}
            onClick={() => onPageClick(p)}
          >
            {p}
          </Page>
        ))}
      </PagesContainer>
      <Nav direction={NavDirection.Next}>
        <NavButton onClick={onNextPage} disabled={currentPage === pages.length}>
          Next
        </NavButton>
      </Nav>
    </Container>
  );
};
