'use client'
import { useAuth } from '@/lib/context/AuthContext';
import { useEmergencyRequestContext } from '@/lib/context/EmergencyRequestContext'
import formatDate from '@/lib/utils/FormatDate';
import React from 'react'

const EmergencyRequesTracking = () => {

  const Emergency = useEmergencyRequestContext();
  const user = useAuth();
  return (
    <div className='w-full h-full p-2'>
      <h1 className='text-2xl font-medium py-4 lg:py-2 w-full flex flex-col items-center justify-center lg:items-start'>Emergency Request Tracking</h1>
      <div className='w-full h-[85vh] mt-4 lg:mt-0 overflow-y-auto' >
      <table className='w-full table table-xs lg:table-md table-pin-rows'>
        <thead>
          <tr  className='bg-base-200 rounded-t-xl text-white'>
            <td>ID</td>
            <td>Title</td>
            <td>Reported Time</td>
            <td>Assigned Time</td>
            <td>Assigned Officer</td>
            <td>Status</td>
            <td>Resolved Time</td>
          </tr>
        </thead>
        <tbody>
            {
              Emergency.assignedRequests.map(req => {
                return(
                  <tr key={req.request.id}>
                    <td>{req.request.id}</td>
                    <td>{req.request.title}</td>
                    <td>{formatDate(req.request.reportedTime)}</td>
                    <td>{formatDate(req.assignedTime)}</td>
                    <td>{(user.users.filter(user => user.id === req.assignedOfficer))[0].name}</td>
                    <td className={`${req.status === 'assigned' ? 'bg-info/10' : 'bg-success/10'}`}>{req.status}</td>
                    <td className={`${req.resolvedTime === '' ? 'text-center' : ''}`}>{formatDate(req.resolvedTime)}</td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default EmergencyRequesTracking