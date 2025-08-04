import React from 'react';
import { TrendingUp, Award, Users } from 'lucide-react';

export default function BottomStats() {
    return (
        <div className="floating-card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Real-Time Data</h3>
            <p className="text-foreground/60 text-sm">
              Get live cryptocurrency prices and market data updated every minute
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Comprehensive Analysis</h3>
            <p className="text-foreground/60 text-sm">
              Access detailed market metrics, charts, and historical performance data
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Portfolio Tracking</h3>
            <p className="text-foreground/60 text-sm">
              Build and monitor your cryptocurrency watchlist with advanced tools
            </p>
          </div>
        </div>
      </div>
    )
}
