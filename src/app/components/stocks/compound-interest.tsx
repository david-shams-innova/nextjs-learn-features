'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CompoundInterestCalculator = () => {
  // State for our controls
  const [initialAmount, setInitialAmount] = useState(50000);
  const [finalAmount, setFinalAmount] = useState(1000000);
  const [numDays, setNumDays] = useState(365);
  const [dailyRate, setDailyRate] = useState(0.0095);

  // Generate options for dropdowns
  const initialAmountOptions = [10000, 25000, 50000, 100000, 250000, 500000];
  const finalAmountOptions = [100000, 250000, 500000, 1000000, 2000000, 5000000];
  const daysOptions = [30, 90, 180, 365, 730];
  const rateOptions = [0.001, 0.0025, 0.005, 0.0075, 0.01, 0.015, 0.02];

  // Calculate growth data based on selected parameters
  const calculateGrowth = () => {
    const data = [];
    let currentAmount = initialAmount;
    
    for (let day = 0; day <= numDays; day++) {
      const startAmount = currentAmount;
      currentAmount = currentAmount * (1 + dailyRate);
      
      // Store values at regular intervals
      if (day === 0 || day === numDays || day % Math.max(Math.floor(numDays / 10), 1) === 0) {
        data.push({
          day,
          startAmount,
          endAmount: currentAmount
        });
      }
    }
    return data;
  };

  // Calculate the required daily rate based on other parameters
  const calculateRequiredRate = () => {
    // Using the compound interest formula: FV = PV(1 + r)^n
    // Solving for r: r = (FV/PV)^(1/n) - 1
    const rate = Math.pow(finalAmount / initialAmount, 1 / numDays) - 1;
    setDailyRate(rate);
  };

  // Update rate when other parameters change
  useEffect(() => {
    calculateRequiredRate();
  }, [initialAmount, finalAmount, numDays]);

  const growthData = calculateGrowth();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Interactive Compound Interest Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Initial Amount ($)</label>
            <Select 
              value={initialAmount.toString()} 
              onValueChange={(value) => setInitialAmount(Number(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {initialAmountOptions.map((amount) => (
                  <SelectItem key={amount} value={amount.toString()}>
                    {amount.toLocaleString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Target Amount ($)</label>
            <Select 
              value={finalAmount.toString()} 
              onValueChange={(value) => setFinalAmount(Number(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {finalAmountOptions.map((amount) => (
                  <SelectItem key={amount} value={amount.toString()}>
                    {amount.toLocaleString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Number of Days</label>
            <Select 
              value={numDays.toString()} 
              onValueChange={(value) => setNumDays(Number(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {daysOptions.map((days) => (
                  <SelectItem key={days} value={days.toString()}>
                    {days} days
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Daily Interest Rate</label>
            <Select 
              value={dailyRate.toString()} 
              onValueChange={(value) => setDailyRate(Number(value))}
            >
              <SelectTrigger>
                <SelectValue>
                  {(dailyRate * 100).toFixed(2)}%
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {rateOptions.map((rate) => (
                  <SelectItem key={rate} value={rate.toString()}>
                    {(rate * 100).toFixed(2)}%
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2">Day</th>
                <th className="text-right p-2">Start Amount ($)</th>
                <th className="text-right p-2">End Amount ($)</th>
              </tr>
            </thead>
            <tbody>
              {growthData.map(({ day, startAmount, endAmount }) => (
                <tr key={day} className="border-t">
                  <td className="p-2">{day}</td>
                  <td className="text-right p-2">{startAmount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}</td>
                  <td className="text-right p-2">{endAmount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompoundInterestCalculator;