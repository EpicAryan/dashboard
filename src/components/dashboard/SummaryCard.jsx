//src/components/dashboard/SummaryCard.jsx

import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

const SummaryCard = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  prefix = '',
  suffix = '',
  format = 'number',
}) => {
  const Icon = icon
  
  const formatValue = (val) => {
    if (format === 'currency') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(val)
    } else if (format === 'percentage') {
      return `${val}%`
    } else if (format === 'number') {
      return new Intl.NumberFormat('en-US').format(val)
    }
    return val
  }

  const getTrendIcon = () => {
    switch (changeType) {
      case 'positive':
        return <TrendingUp className="h-3 w-3" />
      case 'negative':
        return <TrendingDown className="h-3 w-3" />
      default:
        return <Minus className="h-3 w-3" />
    }
  }

  const getTrendClass = () => {
    switch (changeType) {
      case 'positive':
        return 'summary-card__trend--positive'
      case 'negative':
        return 'summary-card__trend--negative'
      default:
        return 'summary-card__trend--neutral'
    }
  }

  return (
    <div className="summary-card group relative overflow-hidden rounded-2xl p-5 border transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-xl cursor-pointer">
      {/* Content */}
      <div className="summary-card__content relative z-10 flex flex-col gap-3">
        {/* Header */}
        <div className="summary-card__header flex items-center justify-between mb-3">
          <div className="summary-card__icon-wrapper flex items-center justify-center w-10 h-10 sm:w-8 sm:h-8 rounded-xl transition-transform duration-300 group-hover:scale-110">
            <Icon className="summary-card__icon h-5 w-5 sm:h-4 sm:w-4 transition-colors" />
          </div>
          <h3 className="summary-card__title ml-4 text-sm sm:text-[13px] font-medium text-right flex-1">
            {title}
          </h3>
        </div>

        <p className="summary-card__value text-3xl sm:text-2xl font-bold leading-snug">
          {prefix}
          {formatValue(value)}
          {suffix}
        </p>

        {change !== undefined && (
          <div className={`summary-card__trend flex items-center gap-1 text-xs font-medium ${getTrendClass()}`}>
            {getTrendIcon()}
            <span className="summary-card__change font-semibold">
              {change > 0 ? '+' : ''}
              {change}%
            </span>
            <span className="summary-card__period font-normal">vs last month</span>
          </div>
        )}
      </div>

      {/* Hover Overlay */}
      <div className="summary-card__overlay absolute inset-0 z-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />
    </div>
  )
}

export default SummaryCard
