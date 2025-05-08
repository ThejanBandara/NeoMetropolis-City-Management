'use client'

import { useAuth } from '@/lib/context/AuthContext'
import { useEmergencyRequestContext } from '@/lib/context/EmergencyRequestContext'
import { CheckCheck, Clock, MailWarning, TimerReset } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend, TooltipProps } from 'recharts';

const Reports = () => {

  const user = useAuth();
  const Emergency = useEmergencyRequestContext();

  const [totalRequests, setTotalRequests] = useState(0);
  const [avgResponseTime, setAvgResponseTime] = useState('');
  const [resolvedPrecentage, setResolvedPrecentage] = useState(0);
  const [busirestHour, setBusiestHour] = useState(0);

  const [callsByHour, setCallsByHour] = useState<number[]>([]);
  const [typeFrequency, setTypeFrequency] = useState<Record<string, number>>({});
  const [prioritySplit, setPrioritySplit] = useState<Record<number, number>>({});
  const [officerStat, setOfficerStat] = useState<Record<string, number>>({});

  const colors = ['#00d390', '#00d3bb', '#00bafe', '#fcb700', '#ff637b'];

  const findTotalRequests = () => {
    const val = Emergency.getRequestSize() + Emergency.assignedRequests.length;
    setTotalRequests(val);
  }

  const findAverageResponseTime = () => {
    const responseTimes = Emergency.assignedRequests.map(req => {
      const reported = new Date(req.request.reportedTime);
      const assigned = new Date(req.assignedTime);
      return (assigned.getTime() - reported.getTime()) / (1000 * 60);
    });

    const avgResponseTime = responseTimes.length > 0
      ? (responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length).toFixed(2)
      : '0';

    setAvgResponseTime(avgResponseTime);
  }

  const findResolvedPrecentage = () => {
    const resolvedCount = Emergency.assignedRequests.filter(req => req.status === 'Resolved').length;
    const resolvedPercent = ((resolvedCount / (Emergency.getRequestSize() + Emergency.assignedRequests.length)) * 100).toFixed(2);
    setResolvedPrecentage(parseFloat(resolvedPercent));
  }

  const findBusiestHour = () => {
    const allRequests = [
      ...Emergency.requests.map(r => new Date(r.reportedTime)),
      ...Emergency.assignedRequests.map(r => new Date(r.request.reportedTime))
    ];

    const hourlyCounts = Array(24).fill(0);
    allRequests.forEach(date => {
      const hour = date.getHours();
      hourlyCounts[hour]++;
    });
    setCallsByHour(hourlyCounts);

    const busiestHour = hourlyCounts.reduce(
      (maxHour, count, hour) => count > hourlyCounts[maxHour] ? hour : maxHour, 0);

    setBusiestHour(busiestHour);
  }

  const allRequests = [
    ...Emergency.requests,
    ...Emergency.assignedRequests.map(r => r.request),
  ];

  const findTypeFrequency = () => {
    const freq: Record<string, number> = {};
    allRequests.forEach(req => {
      freq[req.title] = (freq[req.title] || 0) + 1;
    });
    setTypeFrequency(freq);
  };

  const findPrioritySplit = () => {
    const split: Record<number, number> = {};
    allRequests.forEach(req => {
      split[req.priority] = (split[req.priority] || 0) + 1;
    });
    setPrioritySplit(split);
  };

  const findOfficerStats = () => {
    const stats: Record<string, number> = {};
    Emergency.assignedRequests.forEach(req => {
      if (req.status === 'Resolved') {
        stats[req.assignedOfficer] = (stats[req.assignedOfficer] || 0) + 1;
      }
    });
    setOfficerStat(stats);
  };

  const conCallsByHour = callsByHour.map((count, index) => ({
    hour: `${index}:00`,
    count
  }));

  const conIincidentTypes = Object.entries(typeFrequency).map(([type, count]) => ({
    type,
    count
  }));

  const conPriorityDistribution = Object.entries(prioritySplit).map(([priority, count]) => ({
    priority: `${priority}`,
    count
  }));

  const ConOfficerPerformance = Object.entries(officerStat).map(([officer, count]) => ({
    officer : user.users.filter(user => user.id === officer)[0].name,
    resolved: count
  }));

  const CustomTooltip = ({ active, payload, label } : TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 rounded shadow bg-white"> 
          <p className="text-sm font-medium text-gray-700">{label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }} className="text-sm text-black">
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
  
    return null;
  };
  

  useEffect(() => {
    findTotalRequests()
    findAverageResponseTime()
    findResolvedPrecentage();
    findBusiestHour()
    findTypeFrequency()
    findPrioritySplit()
    findOfficerStats()
  }, [])

  return (
    <div className='w-full h-full p-2 flex flex-col gap-2'>
      <h1 className='text-2xl font-medium py-4 lg:py-2 w-full flex flex-col items-center justify-center lg:items-start'>Reports</h1>
      <div className='w-full grow mt-4 lg:mt-0 flex flex-col gap-3'>

        <div className='stats shadow grid grid-cols-4 gap-3 px-3'>
          <div className='stat bg-base-200 rounded-lg shadow'>
            <div className='stat-figure text-info'>
              <MailWarning className='size-8' />
            </div>
            <div className="stat-title">total requests</div>
            <div className="stat-value">{totalRequests}</div>
          </div>

          <div className='stat bg-base-200 rounded-lg shadow'>
            <div className='stat-figure text-info'>
              <TimerReset className='size-8' />
            </div>
            <div className="stat-title">Avg. Response Time</div>
            <div className="stat-value">{avgResponseTime}m</div>
          </div>

          <div className='stat bg-base-200 rounded-lg shadow'>
            <div className='stat-figure text-info'>
              <CheckCheck className='size-8' />
            </div>
            <div className="stat-title">Resolved</div>
            <div className="stat-value">{resolvedPrecentage}%</div>
          </div>

          <div className='stat bg-base-200 rounded-lg shadow'>
            <div className='stat-figure text-info'>
              <Clock className='size-8' />
            </div>
            <div className="stat-title">Busiest Hour</div>
            <div className="stat-value">{busirestHour}:00</div>
          </div>
        </div>

        <div className='w-full grow grid grid-cols-2 grid-rows-2 gap-3 px-3'>
          <div className='bg-base-200 rounded-lg shadow flex flex-col gap-2 p-2'>
            <h1 className='font-medium'>emergency Calls by hour</h1>
            <div className='w-full grow flex flex-col items-center'>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={conCallsByHour}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip/>}/>
                  <Line type="monotone" dataKey="count" stroke="#00bafe" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className='bg-base-200 rounded-lg shadow flex flex-col gap-2 p-2'>
            <h1 className='font-medium'>Incident type Frequency</h1>
            <div className='w-full grow'>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conIincidentTypes}>
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip/>}/>
                  <Bar dataKey="count" fill="#00bafe" />
                </BarChart>
              </ResponsiveContainer>

            </div>
          </div>
          <div className='bg-base-200 rounded-lg shadow flex flex-col gap-2 p-2'>
            <h1 className='font-medium'>Priority Level Distibution</h1>
            <div className='w-full grow'>

              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={conPriorityDistribution}
                    dataKey="count"
                    nameKey="priority"
                    outerRadius={70}
                  >
                    {conPriorityDistribution.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip content={<CustomTooltip/>} />
                </PieChart>
              </ResponsiveContainer>

            </div>
          </div>
          <div className='bg-base-200 rounded-lg shadow flex flex-col gap-2 p-2'>
            <h1 className='font-medium'>Top Performing Officers</h1>
            <div className='w-full grow'>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ConOfficerPerformance}>
                  <XAxis dataKey="officer" />
                  <YAxis />
                  <Tooltip  content={<CustomTooltip/>} />
                  <Bar dataKey="resolved" fill="#00bafe" />
                </BarChart>
              </ResponsiveContainer>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports