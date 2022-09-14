import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";

const Pagination = ({
    itemsCount,
    pageSize,
    currentPage,
    onPageChange,
    maxPagesShow,
}) => {
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;
    const pages = _.range(
        Math.max(1, currentPage - maxPagesShow),
        Math.min(pagesCount + 1, currentPage + maxPagesShow)
    );

    if (
        Math.min(pagesCount + 1, currentPage + maxPagesShow) !==
        pagesCount + 1
    ) {
        pages.push("...");
    }

    if (Math.max(1, currentPage - maxPagesShow) !== 1) {
        pages.unshift(" ...");
    }

    return (
        <nav>
            <ul className="pagination">
                {pages.map((page) => (
                    <li
                        key={page}
                        className={
                            page === currentPage
                                ? "page-item active"
                                : "page-item"
                        }
                    >
                        <button
                            className="page-link"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
