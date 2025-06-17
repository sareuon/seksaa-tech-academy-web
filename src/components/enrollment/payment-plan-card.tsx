import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, Star, CreditCard, Calendar, DollarSign } from 'lucide-react'
import type { PaymentPlan } from '@/types'

interface PaymentPlanCardProps {
  plan: PaymentPlan
  originalPrice: number
  isSelected?: boolean
  onSelect?: () => void
  showDetails?: boolean
}

export default function PaymentPlanCard({ 
  plan, 
  originalPrice, 
  isSelected = false, 
  onSelect, 
  showDetails = true 
}: PaymentPlanCardProps) {
  const discount = (originalPrice * plan.discountPercentage) / 100
  const finalPrice = originalPrice - discount
  const installmentAmount = plan.installments > 1 ? finalPrice / plan.installments : 0

  const getInstallmentText = () => {
    if (plan.installments === 1) return 'One-time payment'
    if (plan.installments === 2) return '2 equal payments'
    if (plan.installments === 0) return 'Monthly payments'
    return `${plan.installments} installments`
  }

  const getPlanFeatures = () => {
    const features = []
    
    if (plan.discountPercentage > 0) {
      features.push(`${plan.discountPercentage}% discount`)
    }
    
    if (plan.installments === 1) {
      features.push('Immediate full access')
      features.push('No payment processing fees')
    } else if (plan.installments === 2) {
      features.push('Split into 2 payments')
      features.push('50% upfront, 50% mid-course')
    } else if (plan.installments === 0) {
      features.push('Pay as you learn')
      features.push('Flexible monthly schedule')
    }
    
    features.push('Full course materials included')
    features.push('Certificate upon completion')
    
    return features
  }

  return (
    <Card className={`relative transition-all duration-200 hover:shadow-lg ${
      isSelected 
        ? 'ring-2 ring-blue-500 border-blue-500 bg-blue-50' 
        : plan.featured 
        ? 'border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50' 
        : 'hover:border-gray-300'
    }`}>
      {plan.featured && (
        <Badge className="absolute -top-2 left-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <Star className="h-3 w-3 mr-1 fill-current" />
          Most Popular
        </Badge>
      )}
      
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-bold">{plan.name.en}</CardTitle>
            <CardDescription className="mt-1">{plan.description.en}</CardDescription>
          </div>
          {isSelected && (
            <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full">
              <Check className="h-4 w-4 text-white" />
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Pricing */}
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">
              ${finalPrice.toLocaleString()}
            </span>
            {discount > 0 && (
              <span className="text-lg text-gray-500 line-through">
                ${originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          {discount > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Save ${discount.toLocaleString()}
              </Badge>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            {getInstallmentText()}
          </div>
          
          {installmentAmount > 0 && (
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <CreditCard className="h-4 w-4" />
              ${installmentAmount.toLocaleString()} per installment
            </div>
          )}
        </div>

        {/* Features */}
        {showDetails && (
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">What's included:</h4>
            <ul className="space-y-1">
              {getPlanFeatures().map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Payment Schedule */}
        {showDetails && plan.installments > 1 && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Payment Schedule:</h4>
            <div className="space-y-1 text-sm text-gray-600">
              {plan.installments === 2 ? (
                <>
                  <div className="flex justify-between">
                    <span>1st Payment (Enrollment):</span>
                    <span className="font-medium">${(finalPrice / 2).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>2nd Payment (Mid-course):</span>
                    <span className="font-medium">${(finalPrice / 2).toLocaleString()}</span>
                  </div>
                </>
              ) : plan.installments === 0 ? (
                <div className="text-center">
                  <DollarSign className="h-8 w-8 text-blue-500 mx-auto mb-1" />
                  <p>Monthly payments based on course duration</p>
                  <p className="text-xs text-gray-500">Exact amount calculated during enrollment</p>
                </div>
              ) : (
                <div className="text-center">
                  <p>{plan.installments} equal payments of ${installmentAmount.toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        {onSelect && (
          <Button 
            onClick={onSelect}
            className={`w-full ${
              isSelected 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : plan.featured 
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
                : ''
            }`}
            variant={isSelected ? 'default' : plan.featured ? 'default' : 'outline'}
          >
            {isSelected ? 'Selected' : 'Select Plan'}
          </Button>
        )}
      </CardContent>
    </Card>
  )
} 