'use client'
import { useEmergencyRequestContext } from "@/lib/context/EmergencyRequestContext";
import { EmergencyRequestPriorityQueue } from "@/lib/EmergencyRequestPriorityQueue";
import formatDate from "@/lib/utils/FormatDate";
import { EmergencyRequest } from "@/types/EmergencyRequest";
import { ArrowUpRightFromSquareIcon, Edit, Info, Plus, Search, Trash2, X } from "lucide-react"
import React, { useState } from "react";



const EmergencyRequests = () => {

  const { requests, enqueueRequest, dequeueRequest, getRequestSize, getAllRequests, updateRequest, removeRequest }  = useEmergencyRequestContext();
  const addModal = React.useRef<HTMLDialogElement>(null);
  const DeleteModal = React.useRef<HTMLDialogElement>(null);


  const [FormData, setFormData] = useState<EmergencyRequest>({
    id: `REQ-${getRequestSize() + 1}`,
    title: '',
    description: '',
    priority: 1,
    reportedTime: new Date().toISOString(),
  });

  const [requestsBackup, setRequestsBackup] = useState<EmergencyRequest[]>(requests);

  const [deleteId, setDeleteId] = useState('');


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...FormData, [e.target.id]: e.target.value });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      enqueueRequest(FormData as EmergencyRequest);
      getAllRequests();
      setRequestsBackup(requests);
      console.log(requests)
      addModal.current?.close();
      setFormData({
        id: `REQ-${getRequestSize() + 1}`,
        title: '',
        description: '',
        priority: 1,
        reportedTime: new Date().toISOString(),
      })
    } catch (err) {
      console.log(err)
    }

  }


  const HandleDeleteModal = () => {

    const success = removeRequest(deleteId);

    if(success) {
      DeleteModal.current?.close();
      getAllRequests()
      setRequestsBackup(requests);
    }
    else{
      console.log('Error deleting request')
    }
  }

  const HandleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      getAllRequests()
      setRequestsBackup(requests);
    }
    else {
      const FilteredRequests = requests.filter((req) => req.title.includes(e.target.value));
      setRequestsBackup(FilteredRequests);
    }
  }

  return (
    <div className='w-full h-full p-2'>
      <h1 className='text-2xl font-medium py-4 lg:py-2 w-full flex flex-col items-center justify-center lg:items-start'>Emergency Request Handler</h1>
      
        <div className='w-full flex flex-row gap-3 pb-2'>
          <div className='grow w-full flex flex-row gap-2'>
            <label className="input grow">
              <Search />
              <input type="search" placeholder="Search by NIC" onChange={HandleSearch} />
            </label>
          </div>

          <button className='btn btn-soft btn-info ' onClick={() => { addModal.current?.showModal() }}><Plus /> add new</button>
          <dialog className="modal" ref={addModal} id="my_modal_1">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Add New Emergency request</h3>
              <form onSubmit={handleSubmit} action="" className='py-4 px-2 flex flex-col gap-2 max-h-[60vh] overflow-y-scroll'>
                <fieldset className="fieldset">
                  <legend className=" fieldset-legend">Emergency Request ID</legend>
                  <input type="text" id="id" value={FormData.id} onChange={handleChange} required disabled className="input w-full" />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className=" fieldset-legend">Request Title</legend>
                  <input type="text" id="title" value={FormData.title} onChange={handleChange} required className="input w-full" />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className=" fieldset-legend">Request Description</legend>
                  <input type="text" id="description" value={FormData.description} onChange={handleChange} required className="input w-full" />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className=" fieldset-legend">Priority level</legend>

                  <div className="w-full mt-2 flex flex-row gap-2 items-center justify-evenly">
                    <div className="flex flex-col items-center">
                      <input type="radio" name="priority" value="1" checked={FormData.priority === 1} onChange={() => setFormData({ ...FormData, priority: 1 })} className="radio radio-success" />
                      <p className="fieldset-legend">1</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <input type="radio" name="priority" value="2" checked={FormData.priority === 2} onChange={() => setFormData({ ...FormData, priority: 2 })} className="radio radio-accent" />
                      <p className="fieldset-legend">2</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <input type="radio" name="priority" value="3" checked={FormData.priority === 3} onChange={() => setFormData({ ...FormData, priority: 3 })} className="radio radio-info" />
                      <p className="fieldset-legend">3</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <input type="radio" name="priority" value="4" checked={FormData.priority === 4} onChange={() => setFormData({ ...FormData, priority: 4 })} className="radio radio-warning" />
                      <p className="fieldset-legend">4</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <input type="radio" name="priority" value="5" checked={FormData.priority === 5} onChange={() => setFormData({ ...FormData, priority: 5 })} className="radio radio-error" />
                      <p className="fieldset-legend">5</p>
                    </div>
                  </div>
                  <div className="w-full flex flex-row items-center justify-between px-8 py-2">
                    <p className="text-center">Low <br />Priority</p>
                    <p className="text-center">High <br /> Priority</p>
                  </div>
                </fieldset>

                <button className='btn btn-info w-full' type='submit'>add new Emergency Request</button>
                <button className='btn btn-error btn-soft w-full ' onClick={() => addModal.current?.close()}>Close</button>

              </form>
            </div>
          </dialog>

          <dialog id="my_modal_2" ref={DeleteModal} className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg flex gap-3 items-center"><Info className='text-error size-8' /> Confirm Delete</h3>
              <p className="py-4">Are you really want to delete this Citizen record? </p>
              <div className="modal-action">
                <button className='btn btn-soft flex gap-2 items-center' onClick={() => { DeleteModal.current?.close() }}><X className='size-4' /> close</button>
                <button className='btn btn-error flex gap-2 items-center' onClick={() => { HandleDeleteModal()}}><Trash2 className='size-4' /> Delete</button>
              </div>
            </div>
          </dialog>

        </div>

        <div className='w-full h-[80vh] mt-4 lg:mt-0 overflow-y-auto' >
        <table className='w-full table table-xs lg:table-md table-pin-rows'>
          <thead>
            <tr className='bg-base-200 rounded-t-xl text-white'>
              <td>id</td>
              <td>Title</td>
              <td>Description</td>
              <td>Priority</td>
              <td>Reported time</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {
              requestsBackup.map((request) => (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>{request.title}</td>
                  <td>{request.description}</td>
                  <td className={`text-center ${request.priority === 5 ? 'bg-error/10 text-error' : request.priority === 4 ? 'bg-warning/10 text-warning' : request.priority === 3 ? 'bg-info/10 text-info' : request.priority === 2 ? 'bg-accent/10 text-accent' : 'bg-success/10 text-success'} `}>{request.priority}</td>
                  <td>{request.reportedTime === '' ? '-' : formatDate(request.reportedTime)}</td>
                  <td className='flex flex-row gap-2'>
                    <button className='btn btn-soft btn-square btn-info'><Edit className='size-5' /></button>
                    <button className='btn btn-soft btn-square btn-error' onClick={() => { setDeleteId(request.id); DeleteModal.current?.showModal() }}><Trash2 className='size-5' /></button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EmergencyRequests