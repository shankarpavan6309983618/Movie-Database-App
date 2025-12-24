import React from 'react'

const Pagination = ({page, totalPages = 1, onChange}) => {
  const onClickPrev = () => {
    if (page > 1) {
      onChange(page - 1)
    }
  }

  const onClickNext = () => {
    if (page < totalPages) {
      onChange(page + 1)
    }
  }

  const pages = []
  const maxPagesToShow = 5
  const endPage = Math.min(totalPages, maxPagesToShow)

  for (let i = 1; i <= endPage; i += 1) {
    pages.push(i)
  }

  return (
    <div className="pagination">
      <button type="button" onClick={onClickPrev} disabled={page === 1}>
        Prev
      </button>

      {pages.map(p => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          disabled={p === page}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        onClick={onClickNext}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
