import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CareerOutcomes } from "@/types"
import { TrendingUp, Clock, Users, Building, Award, Target } from "lucide-react"

interface CareerOutcomesStatsProps {
  outcomes: CareerOutcomes
}

export function CareerOutcomesStats({ outcomes }: CareerOutcomesStatsProps) {
  const topIndustries = Object.entries(outcomes.industryDistribution)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-4">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {outcomes.placementRate}%
            </div>
            <div className="text-sm text-muted-foreground">
              Job Placement Rate
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Within 6 months of graduation
            </div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              +{outcomes.averageSalaryIncrease}%
            </div>
            <div className="text-sm text-muted-foreground">
              Average Salary Increase
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Compared to previous role
            </div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mx-auto mb-4">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {outcomes.timeToEmployment}
            </div>
            <div className="text-sm text-muted-foreground">
              Days to Employment
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Average time after graduation
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Industry Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Industry Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topIndustries.map(([industry, percentage]) => (
              <div key={industry} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium capitalize">
                    {industry.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-brand-500 to-brand-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Employers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Top Hiring Partners
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {outcomes.topEmployers.map((employer, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2 hover:bg-gray-200 transition-colors">
                  <span className="text-gray-600 font-bold text-sm">
                    {employer.split(' ').map(word => word[0]).join('').slice(0, 3)}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground text-center">
                  {employer}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Success Highlights */}
      <Card className="bg-gradient-to-br from-brand-50 to-orange-50 border-brand-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Success Highlights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-brand-600 mb-1">
                  500+
                </div>
                <div className="text-sm text-muted-foreground">
                  Graduates Placed
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-brand-600 mb-1">
                  $1,200
                </div>
                <div className="text-sm text-muted-foreground">
                  Average Starting Salary
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-brand-600 mb-1">
                  85%
                </div>
                <div className="text-sm text-muted-foreground">
                  Career Changers
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 