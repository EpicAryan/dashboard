//src/components/dashboard/DataTable.jsx

import { MoreHorizontal, ArrowUpDown, Filter } from 'lucide-react'

const DataTable = ({ 
  title = "Recent Transactions", 
  data = [], 
  showPagination = true,
  itemsPerPage = 10 
}) => {
  const StatusBadge = ({ status }) => {
    const getStatusClass = () => {
      switch (status.toLowerCase()) {
        case 'success':
        case 'completed':
        case 'paid':
          return 'data-table__status--success'
        case 'pending':
        case 'processing':
          return 'data-table__status--pending'
        case 'failed':
        case 'declined':
        case 'cancelled':
          return 'data-table__status--failed'
        default:
          return 'data-table__status--neutral'
      }
    }

    return (
      <span className={`data-table__status px-2.5 py-1 rounded-full text-xs font-medium ${getStatusClass()}`}>
        {status}
      </span>
    )
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="data-table-container rounded-2xl border overflow-hidden">
      {/* Table Header */}
      <div className="data-table__header flex items-center justify-between p-6 border-b">
        <div className="flex items-center gap-4">
          <h2 className="data-table__title text-xl font-semibold">
            {title}
          </h2>
          <span className="data-table__count px-2.5 py-1 rounded-full text-xs font-medium">
            {data.length} entries
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="data-table__filter-btn flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
          
          <button className="data-table__sort-btn flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
            <ArrowUpDown className="h-4 w-4" />
            <span className="hidden sm:inline">Sort</span>
          </button>
        </div>
      </div>

      {/* Table Container with Horizontal Scroll */}
      <div className="data-table__scroll-container overflow-x-auto">
        <table className="data-table w-full min-w-[640px]">
          <thead className="data-table__head sticky top-0 z-10">
            <tr>
              <th className="data-table__header-cell text-left py-4 px-6 font-semibold text-sm">
                Business Name
              </th>
              <th className="data-table__header-cell text-left py-4 px-6 font-semibold text-sm">
                Date
              </th>
              <th className="data-table__header-cell text-left py-4 px-6 font-semibold text-sm">
                Amount
              </th>
              <th className="data-table__header-cell text-left py-4 px-6 font-semibold text-sm">
                Status
              </th>
              <th className="data-table__header-cell text-center py-4 px-6 font-semibold text-sm w-12">
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="data-table__body">
            {data.map((row, index) => (
              <tr 
                key={row.id || index}
                className={`data-table__row border-b transition-colors duration-200 hover:bg-opacity-50 ${
                  index % 2 === 0 ? 'data-table__row--even' : 'data-table__row--odd'
                }`}
              >
                {/* Business Name Cell */}
                <td className="data-table__cell py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="data-table__avatar w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold">
                      {row.businessName.charAt(0)}
                    </div>
                    <div>
                      <div className="data-table__business-name font-medium text-sm">
                        {row.businessName}
                      </div>
                      <div className="data-table__payment-type text-xs mt-0.5">
                        {row.paymentType}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Date Cell */}
                <td className="data-table__cell py-4 px-6">
                  <div className="data-table__date text-sm">
                    {formatDate(row.date)}
                  </div>
                </td>

                {/* Amount Cell */}
                <td className="data-table__cell py-4 px-6">
                  <div className={`data-table__amount text-sm font-semibold ${
                    row.amount > 0 ? 'data-table__amount--positive' : 'data-table__amount--negative'
                  }`}>
                    {row.amount > 0 ? '+' : ''}{formatCurrency(row.amount)}
                  </div>
                </td>

                {/* Status Cell */}
                <td className="data-table__cell py-4 px-6">
                  <StatusBadge status={row.status} />
                </td>

                {/* Action Cell */}
                <td className="data-table__cell py-4 px-6 text-center">
                  <button className="data-table__action-btn p-2 rounded-lg transition-all duration-200 hover:scale-110 cursor-pointer">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPagination && (
        <div className="data-table__pagination flex items-center justify-between p-4 border-t">
          <div className="data-table__pagination-info text-sm">
            Showing 1-{Math.min(itemsPerPage, data.length)} of {data.length} results
          </div>
          
          <div className="flex items-center gap-2">
            <button className="data-table__pagination-btn px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
              Previous
            </button>
            <button className="data-table__pagination-btn px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DataTable
