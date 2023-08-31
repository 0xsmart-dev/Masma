import React from 'react'
import { AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface ITokenPriceChartProps {
  data: Array<any>
}

export default function TokenPriceChart({ data }: ITokenPriceChartProps) {
  return (
    <ResponsiveContainer width={'100%'} height={400}>
      <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <XAxis dataKey='date' />
        <YAxis />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip />
        <Area type='monotone' dataKey='price' stroke='#8884d8' fill='#142C8E' />
        <Brush />
      </AreaChart>
    </ResponsiveContainer>
  )
}
