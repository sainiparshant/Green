import { Eye } from 'lucide-react'
import React from 'react'

const OrderCard = ({onView, order}) => {
    const {orderStatus, orderNumber, totalAmount} = order;
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">
              Order #{orderNumber}
            </p>
            <p className="font-medium text-gray-900">
            <span className='text-gray-600 text-sm ]'>Amount:  </span>{totalAmount}
            </p>
            <p className="text-sm text-emerald-600">
              {orderStatus}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
  onClick={() => onView(order._id)}
  className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg border hover:bg-gray-100"
>
  <Eye size={16} />
  View Details
</button>

          </div>
        </div>
  )
}

export default OrderCard
