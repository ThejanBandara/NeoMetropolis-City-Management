'use client';

import React, { useState } from 'react';
import { Citizen } from '@/types/citizen';
import { CitizenMap } from '@/lib/CitizenManagementHashMap';
import { Edit, Info, Plus, Search, Trash2, X } from 'lucide-react';

const manager = new CitizenMap();

const CitizenManagement = () => {
  // modal reference to the add new citizen modal
  const modal = React.useRef<HTMLDialogElement>(null);
  // modal reference to the delete citizen modal
  const DeleteModal = React.useRef<HTMLDialogElement>(null);

  // useState for deleting user's nic
  const [nic, setNic] = useState('');

  // Citizen data array
  const [citizens, setCitizens] = useState<Citizen[]>([]);

  // add citizen form data
  const [formData, setFormData] = useState<Citizen>({
    nic: '',
    name: '',
    dateOfBirth: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      manager.insert(formData.nic, formData);
      setCitizens(manager.getAll());
      modal.current?.close();
      setFormData({ nic: '', name: '', dateOfBirth: '', address: '' });
    } catch (error) {
      alert('Citizen with this NIC already exists.');
    }
  };

  const handleDelete = (nic: string) => {
    try {
      manager.delete(nic);
      DeleteModal.current?.close();
      setCitizens(manager.getAll());
    }
    catch (error) {
      alert('delete karanna ba ')
    }
  }

  return (
    <div className='w-full h-full p-2'>
      <h1 className='text-2xl font-medium py-4 lg:py-2 w-full flex flex-col items-center justify-center lg:items-start'>Citizen Profile Management</h1>
      <div className='w-full h-[85vh] mt-4 lg:mt-0 '>
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
              <h3 className="font-bold text-lg">Add New Citizen</h3>
              <form onSubmit={handleSubmit} className='py-4 flex flex-col gap-2'>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">NIC Number</legend>
                  <input type="text" id='nic' value={formData.nic} onChange={handleChange} required className="input w-full" placeholder="xxxxxxxx" />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Name</legend>
                  <input type="text" id='name' value={formData.name} onChange={handleChange} required className="input w-full" placeholder="John Doe" />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Address</legend>
                  <input type="text" id='address' value={formData.address} onChange={handleChange} required className="input w-full" placeholder="123, example lane, city" />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Date of Birth</legend>
                  <input type="date" id='dateOfBirth' value={formData.dateOfBirth} onChange={handleChange} required className="input w-full" />
                </fieldset>

                <button className='btn btn-info w-full' type='submit'>add new Citizen</button>
                <button className='btn btn-error btn-soft w-full ' onClick={() => modal.current?.close() }>Close</button>
              </form>
            </div>
          </dialog>

          <dialog id="my_modal_2" ref={DeleteModal} className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg flex gap-3 items-center"><Info className='text-error size-8'/> Confirm Delete</h3>
              <p className="py-4">Are you really want to delete this Citizen record? </p>
              <div className="modal-action">
                <button className='btn btn-soft flex gap-2 items-center' onClick={() => {DeleteModal.current?.close()}}><X className='size-4'/> close</button>
                <button className='btn btn-error flex gap-2 items-center' onClick={() => {handleDelete(nic)}}><Trash2 className='size-4'/> Delete</button>
              </div>
            </div>
          </dialog>

        </div>

        <table className='w-full table table-xs lg:table-md table-pin-rows'>
          <thead>
            <tr className='bg-base-200 rounded-t-xl'>
              <td>#</td>
              <td className='w-2/12 text-white font-medium'>Nic No</td>
              <td className='w-3/12 text-white font-medium'>Name</td>
              <td className='w-3/12 text-white font-medium'>Address</td>
              <td className='w-2/12 text-white font-medium'>Date of Birth</td>
              <td className='w-1/12 text-white font-medium'>actions</td>
            </tr>
          </thead>
          <tbody>
            {
              citizens.map((c, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{c.nic}</td>
                    <td>{c.name}</td>
                    <td>{c.address}</td>
                    <td>{c.dateOfBirth}</td>
                    <td className='flex flex-row gap-2'>
                      <button className='btn btn-soft btn-square btn-info'><Edit className='size-5' /></button>
                      <button className='btn btn-soft btn-square btn-error'><Trash2 className='size-5' onClick={() => { DeleteModal.current?.showModal(); setNic(c.nic)}} /></button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CitizenManagement