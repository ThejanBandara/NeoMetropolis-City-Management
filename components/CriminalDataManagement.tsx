'use client'
import React, { useState } from 'react';
import { Plus, Search, SquareArrowOutUpRightIcon } from 'lucide-react'
import { Criminal } from '@/types/Criminal';
import { CriminalHashMap } from '@/lib/CriminalDataHashMap';

const CriminalDataManagement = () => {

  const managerRef = React.useRef(new CriminalHashMap());
  const manager = managerRef.current;

  const modal = React.useRef<HTMLDialogElement>(null);
  const infoModal = React.useRef<HTMLDialogElement>(null);
  const DeleteModal = React.useRef<HTMLDialogElement>(null);

  const [name, setName] = useState('');
  const [crimeDesc, setCrimeDesc] = useState('');

  const [criminals, setCriminals] = useState<Criminal[]>([]);

  const [formData, setFormData] = useState<Criminal>(
    {
      name: '',
      gender: "unknown",
      crimeType: '',
      crimeDescription: '',
      date: '',
      isrepeatOffender: false,
      status: 'under_investigation'
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.checked });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      manager.inserCriminal(formData.name, formData);
      setCriminals(manager.getAllCriminals());
      console.log(criminals)
      modal.current?.close();
      setFormData({
        name: '',
        gender: "unknown",
        crimeType: '',
        crimeDescription: '',
        date: '',
        isrepeatOffender: false,
        status: 'under_investigation'
      });
    }
    catch (error) {
      alert('Criminal with this name already exists.');
    }
  }

  const handleDescriptionModal = (desc: string) => {
      setCrimeDesc(desc);
      infoModal.current?.showModal();
  }

  return (
    <div className='w-full h-full p-2'>
      <h1 className='text-2xl font-medium py-4 lg:py-2 w-full flex flex-col items-center justify-center lg:items-start'>Criminal Data management</h1>
      <div className='w-full h-[85vh] mt-4 lg:mt-0'>
        <div className='w-full flex flex-row gap-3 pb-2'>
          <div className='grow w-full flex flex-row gap-2'>
            <label className="input grow">
              <Search />
              <input type="search" placeholder="Search by NIC" />
            </label>
            <button className='btn btn-info btn-square'><Search /></button>
          </div>

          <button className='btn btn-soft btn-info ' onClick={() => modal.current?.showModal()}><Plus /> add new</button>

          <dialog id="my_modal_1" ref={modal} className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Add New Criminal Record</h3>
              <form onSubmit={handleSubmit} className='py-4 px-2 flex flex-col gap-2 max-h-[60vh] overflow-y-scroll'>

                <fieldset className='fieldset'>
                  <legend className='fieldset-legend'>Criminal name</legend>
                  <input type='text' id='name' value={formData.name} onChange={handleChange} required className='w-full input' placeholder='John Doe' />
                </fieldset>

                <fieldset className='fieldset'>
                  <legend className=' fieldset-legend'>Gender</legend>
                  <select id='gender' onChange={handleChange} required value={formData.gender} className='select w-full'>
                    <option value="male">male</option>
                    <option value="female">female</option>
                    <option value="other">other</option>
                    <option value="unknown">unknown</option>
                  </select>
                </fieldset>

                <fieldset className='fieldset'>
                  <legend className='fieldset-legend'>Crime type</legend>
                  <input type='text' id='crimeType' value={formData.crimeType} onChange={handleChange} required className='w-full input' placeholder='theft' />
                </fieldset>

                <fieldset className='fieldset'>
                  <legend className='fieldset-legend'>Crime description</legend>
                  <input type='text' id='crimeDescription' value={formData.crimeDescription} onChange={handleChange} required className='w-full input' placeholder='enter decription here' />
                </fieldset>

                <fieldset className='fieldset'>
                  <legend className='fieldset-legend'>Reported date</legend>
                  <input type='date' id='date' value={formData.date} onChange={handleChange} required className='w-full input' />
                </fieldset>

                <fieldset className='fieldset my-2'>
                  <label className="label px-4 flex flex-row gap-4 items-center justify-center text-white">
                    <input type="checkbox" id='isrepeatOffender' name="isrepeatOffender" checked={formData.isrepeatOffender} onChange={handleCheckbox} className="toggle" />
                    this criminal is a repeated offender
                  </label>
                </fieldset>

                <fieldset className='fieldset'>
                  <legend className=' fieldset-legend'>Criminal Status</legend>
                  <select defaultValue={"Set_Status"} id='status' required value={formData.status} onChange={handleChange} className='select w-full'>
                    <option value="Set_Status" disabled>Set Status</option>
                    <option value="under_investigation">Under Investigation</option>
                    <option value="in_court">In Court</option>
                    <option value="convicted">convicted</option>
                    <option value="released">released</option>
                  </select>
                </fieldset>

                <button className='btn btn-info w-full' type='submit'>add new Citizen</button>
                <button className='btn btn-error btn-soft w-full ' onClick={() => modal.current?.close()}>Close</button>
              </form>
            </div>
          </dialog>

          <dialog id="my_modal_1" ref={infoModal} className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Crime Description</h3>
              <p className="py-4">{crimeDesc}</p>
              <div className="modal-action">
                <form method="dialog">
                  
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>

        </div>
        <table className='w-full table table-xs lg:table-md table-pin-rows'>
          <thead>
            <tr>
              <td className='w-fit'>#</td>
              <td className='w-3/12'>Name</td>
              <td className='w-fit'>Gender</td>
              <td className='w-2/12'>Crime type</td>
              <td className='w-1/12'>reported Date</td>
              <td className='w-fit'>Repeated offender</td>
              <td className='w-fit'>Criminal Status</td>
            </tr>
          </thead>

          <tbody>
            {
              criminals.map((c, index) => {
                return (
                  <tr key={index}>
                    <td className=''>{index + 1}</td>
                    <td className=''>{c.name}</td>
                    <td className='text-center'>{c.gender}</td>
                    <td className='flex flex-row items-center justify-stretch gap-2'><span className='w-full grow'>{c.crimeType}</span><button className='btn btn-xs btn-square btn-soft size-8' onClick={() => {handleDescriptionModal(c.crimeDescription)}}><SquareArrowOutUpRightIcon className='size-4' /></button></td>
                    <td className=''>{c.date}</td>
                    <td className='text-center'><input type="checkbox" checked={c.isrepeatOffender} className="checkbox checkbox-primary" /></td>
                    <td className='text-center'><div className={`badge badge-soft ${c.status === 'under_investigation' ? 'badge-warning' : c.status === 'in_court' ? 'badge-info' : c.status === 'convicted' ? 'badge-error' : 'badge-success'} text-xs text-nowrap`}>{c.status}</div></td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CriminalDataManagement