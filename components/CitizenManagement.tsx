'use client';

import React, { useState, useEffect } from 'react';
import { Citizen } from '@/types/citizen';
import { CitizenMap } from '@/lib/CitizenManagementHashMap';
import { Edit, Info, Plus, Search, Trash2, X } from 'lucide-react';



const CitizenManagement = () => {
  const managerRef = React.useRef(new CitizenMap());
  const manager = managerRef.current;

useEffect(() => {
  const sampleCitizens: Citizen[] = [
    { nic: '991234567V', name: 'Nimal Perera', dateOfBirth: '1999-04-23', address: '123 Galle Road, Colombo' },
    { nic: '880987654V', name: 'Sunil Fernando', dateOfBirth: '1988-07-15', address: '56 Kandy Road, Kandy' },
    { nic: '950234567V', name: 'Kamal Rajapaksha', dateOfBirth: '1995-11-02', address: '78 Main Street, Matara' },
    { nic: '930123456V', name: 'Nadeesha Silva', dateOfBirth: '1993-03-14', address: '89 Lake Road, Negombo' },
    { nic: '981234567V', name: 'Chathura Jayasena', dateOfBirth: '1998-12-25', address: '45 Temple Street, Kurunegala' },
    { nic: '900345678V', name: 'Harsha Dissanayake', dateOfBirth: '1990-06-18', address: '90 Hill Street, Nuwara Eliya' },
    { nic: '970456789V', name: 'Sanduni Rathnayake', dateOfBirth: '1997-08-30', address: '12 River Lane, Anuradhapura' },
    { nic: '940987123V', name: 'Tharindu Gunasekara', dateOfBirth: '1994-02-10', address: '77 Palm Avenue, Gampaha' },
    { nic: '920123456V', name: 'Dilani Wickramasinghe', dateOfBirth: '1992-05-12', address: '33 Ocean Drive, Trincomalee' },
    { nic: '910234567V', name: 'Amila Abeysekara', dateOfBirth: '1991-10-19', address: '23 Forest Lane, Hambantota' },
    { nic: '960345678V', name: 'Isuru Weerasinghe', dateOfBirth: '1996-01-05', address: '67 City Road, Jaffna' },
    { nic: '870456789V', name: 'Nirosha Senanayake', dateOfBirth: '1987-09-25', address: '18 Queen Street, Badulla' },
    { nic: '850567890V', name: 'Ravindu Tennakoon', dateOfBirth: '1985-04-10', address: '102 Market Lane, Ratnapura' },
    { nic: '891234567V', name: 'Lakmali Herath', dateOfBirth: '1989-12-01', address: '19 School Road, Polonnaruwa' },
    { nic: '930678912V', name: 'Suresh Samarasinghe', dateOfBirth: '1993-03-30', address: '84 College Street, Kalutara' },
    { nic: '901234567V', name: 'Ruwan Madushanka', dateOfBirth: '1990-07-09', address: '120 Station Road, Monaragala' },
    { nic: '950456789V', name: 'Thilini Jayawardena', dateOfBirth: '1995-08-22', address: '55 Main Road, Batticaloa' },
    { nic: '980567890V', name: 'Ashen Peris', dateOfBirth: '1998-11-17', address: '88 Temple Path, Panadura' },
    { nic: '920678901V', name: 'Janaka Alwis', dateOfBirth: '1992-06-06', address: '60 New Town, Chilaw' },
    { nic: '860789012V', name: 'Sajani Kumari', dateOfBirth: '1986-02-28', address: '140 Hill Top, Galle' },
  ];

  for (const citizen of sampleCitizens) {
    try {
      manager.insert(citizen.nic, citizen);
    } catch (e) {
      console.error(`Citizen with NIC ${citizen.nic} already exists.`);
    }
  }

  setCitizens(manager.getAll());
  setCitizensBackup(manager.getAll());
}, []);


  // modal reference to the add new citizen modal
  const modal = React.useRef<HTMLDialogElement>(null);
  // modal reference to the delete citizen modal
  const DeleteModal = React.useRef<HTMLDialogElement>(null);

  // useState for deleting user's nic
  const [nic, setNic] = useState('');


  // Citizen data array
  const [citizens, setCitizens] = useState<Citizen[]>([]);
  const [citizensBackup, setCitizensBackup] = useState<Citizen[]>([]);

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
      setCitizensBackup(manager.getAll());
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
      setCitizensBackup(manager.getAll());
    }
    catch (error) {
      alert('delete karanna ba ')
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.value === '') {
      setCitizens(manager.getAll());
      setCitizensBackup(manager.getAll());
    }
    else {
      const filteredCitizens = citizensBackup.filter((citizen) => citizen.nic.includes(e.target.value));
      setCitizens(filteredCitizens);
    }

  }

  return (
    <div className='w-full h-full p-2'>
      <h1 className='text-2xl font-medium py-4 lg:py-2 w-full flex flex-col items-center justify-center lg:items-start'>Citizen Profile Management</h1>
      
        <div className='w-full flex flex-row gap-3 pb-2'>
          <div className='grow w-full flex flex-row gap-2'>
            <label className="input grow">
              <Search />
              <input type="search" placeholder="Search by NIC" onChange={handleSearch}/>
            </label>
          </div>

          <button className={`btn btn-soft btn-info`} onClick={() => modal.current?.showModal()}><Plus /> add new</button>

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
        <div className='w-full h-[80vh] mt-4 lg:mt-0 overflow-y-auto'>
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