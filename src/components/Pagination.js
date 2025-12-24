import React, {useCallback} from 'react'

const Pagination = ({page, totalPages, onChange}) => {
  // Handlers (must be before any return)
  const handlePrev = useCallback(() => {
    onChange(Math.max(1, page - 1))
  }, [page, onChange])

  const handleNext = useCallback(() => {
    onChange(Math.min(totalPages, page + 1))
  }, [page, totalPages, onChange])

  const handleGoToPage = useCallback(
    p => {
      onChange(p)
    },
    [onChange],
  )

  // Now we can safely return before rendering UI
  if (!totalPages) return null

  // Compute visible pages
  const pages = []
  const start = Math.max(1, page - 2)
  const end = Math.min(totalPages, page + 2)

  for (let p = start; p <= end; p += 1) {
    pages.push(p)
  }

  return (
    <div className="pagination">
      <button type="button" onClick={handlePrev} disabled={page === 1}>
        Prev
      </button>

      {start > 1 && (
        <button type="button" onClick={() => handleGoToPage(1)}>
          1
        </button>
      )}

      {start > 2 && <span className="dots">...</span>}

      {pages.map(p => (
        <button
          type="button"
          key={p}
          className={p === page ? 'active' : ''}
          onClick={() => handleGoToPage(p)}
        >
          {p}
        </button>
      ))}

      {end < totalPages - 1 && <span className="dots">...</span>}

      {end < totalPages && (
        <button type="button" onClick={() => handleGoToPage(totalPages)}>
          {totalPages}
        </button>
      )}

      <button type="button" onClick={handleNext} disabled={page === totalPages}>
        Next
      </button>
    </div>
  )
}

export default Pagination
