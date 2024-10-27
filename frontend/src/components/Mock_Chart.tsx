import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DataPoint {
  timestamp: string;
  price: number;
}

type TimeRange = '1H' | '1D' | '1W' | '1M' | '1Y' | 'ALL';

const Chart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('1M');
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    // Fetch chart data based on timeRange
    const fetchData = () => {
      const mockData = generateMockData(getDataPointsForTimeRange(timeRange));
      setData(mockData);
    };

    fetchData();
  }, [timeRange]);

  const generateMockData = (days: number): DataPoint[] => {
    const data: DataPoint[] = [];
    const now = new Date();
    for (let i = days; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      data.push({
        timestamp: date.toISOString().split('T')[0],
        price: 5000000 + Math.random() * 1000000,
      });
    }
    return data;
  };

  const getDataPointsForTimeRange = (range: TimeRange): number => {
    switch (range) {
      case '1H': return 1;
      case '1D': return 1;
      case '1W': return 7;
      case '1M': return 30;
      case '1Y': return 365;
      case 'ALL': return 1095; // 3 years
      default: return 30;
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 mt-4">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={(tick: string) => {
              const date = new Date(tick);
              return `${date.getMonth() + 1}/${date.getDate()}`;
            }}
          />
          <YAxis 
            tickFormatter={(tick: number) => `¥${(tick / 1000000).toFixed(2)}M`}
            domain={['dataMin', 'dataMax']}
          />
          <Tooltip 
            formatter={(value: number) => [`¥${value.toLocaleString()}`, 'Price']}
            labelFormatter={(label: string) => new Date(label).toLocaleDateString()}
          />
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex justify-between mt-4">
        {(['1H', '1D', '1W', '1M', '1Y', 'ALL'] as const).map((range) => (
          <button
            key={range}
            className={`tab ${timeRange === range ? 'active' : ''}`}
            onClick={() => setTimeRange(range)}
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Chart;