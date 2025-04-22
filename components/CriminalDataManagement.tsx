'use client'
import React, { useEffect, useState } from 'react';
import { Edit, Info, Plus, Search, SquareArrowOutUpRightIcon, Trash2, X } from 'lucide-react'
import { Criminal } from '@/types/Criminal';
import { CriminalHashMap } from '@/lib/CriminalDataHashMap';

const CriminalDataManagement = () => {

  const managerRef = React.useRef(new CriminalHashMap());
  const manager = managerRef.current;

  useEffect(() => {
    const sampleData: Criminal[] = [
      {
        name: 'John Wick',
        gender: 'male',
        crimeType: 'Assault',
        crimeDescription: 'Involved in multiple high-profile assassinations.',
        date: '2023-08-01',
        isrepeatOffender: true,
        status: 'convicted'
      },
      {
        name: 'Jane Doe',
        gender: 'female',
        crimeType: 'Fraud',
        crimeDescription: 'Embezzled millions from a corporation.',
        date: '2024-02-12',
        isrepeatOffender: false,
        status: 'in_court'
      },
      {
        name: 'Alex Unknown',
        gender: 'unknown',
        crimeType: 'Cyber Crime',
        crimeDescription: 'Hacked into government databases.',
        date: '2024-10-05',
        isrepeatOffender: true,
        status: 'under_investigation'
      },
      {
        name: 'Maria Gonzales',
        gender: 'female',
        crimeType: 'Drug Possession',
        crimeDescription: 'Caught with illegal substances in possession.',
        date: '2023-12-11',
        isrepeatOffender: false,
        status: 'released'
      },
      {
        name: 'David Smith',
        gender: 'male',
        crimeType: 'Theft',
        crimeDescription: 'Stole valuables from multiple homes.',
        date: '2023-11-19',
        isrepeatOffender: true,
        status: 'convicted'
      },
      {
        name: 'Lisa Turner',
        gender: 'female',
        crimeType: 'Kidnapping',
        crimeDescription: 'Abducted a high-profile businessman.',
        date: '2022-07-08',
        isrepeatOffender: false,
        status: 'in_court'
      },
      {
        name: 'Chris Brown',
        gender: 'male',
        crimeType: 'Murder',
        crimeDescription: 'Involved in a first-degree homicide case.',
        date: '2024-01-01',
        isrepeatOffender: true,
        status: 'convicted'
      },
      {
        name: 'Nina Patel',
        gender: 'female',
        crimeType: 'Smuggling',
        crimeDescription: 'Transported illegal goods across borders.',
        date: '2024-03-14',
        isrepeatOffender: false,
        status: 'under_investigation'
      },
      {
        name: 'Maxwell Payne',
        gender: 'male',
        crimeType: 'Assault',
        crimeDescription: 'Engaged in violent altercation with law enforcement.',
        date: '2023-09-09',
        isrepeatOffender: true,
        status: 'convicted'
      },
      {
        name: 'Emily Rose',
        gender: 'female',
        crimeType: 'Arson',
        crimeDescription: 'Set fire to a government building.',
        date: '2023-06-03',
        isrepeatOffender: false,
        status: 'in_court'
      },
      {
        name: 'Robert King',
        gender: 'male',
        crimeType: 'Tax Evasion',
        crimeDescription: 'Did not report earnings for 5 years.',
        date: '2022-04-15',
        isrepeatOffender: true,
        status: 'under_investigation'
      },
      {
        name: 'Isabella Clark',
        gender: 'female',
        crimeType: 'Identity Theft',
        crimeDescription: 'Stole and used multiple fake identities.',
        date: '2024-01-22',
        isrepeatOffender: false,
        status: 'convicted'
      },
      {
        name: 'Tyler Grant',
        gender: 'male',
        crimeType: 'Extortion',
        crimeDescription: 'Blackmailed officials for personal gain.',
        date: '2023-05-25',
        isrepeatOffender: true,
        status: 'in_court'
      },
      {
        name: 'Angela White',
        gender: 'female',
        crimeType: 'Bribery',
        crimeDescription: 'Bribed judges to avoid prosecution.',
        date: '2024-02-07',
        isrepeatOffender: true,
        status: 'under_investigation'
      },
      {
        name: 'Samuel Black',
        gender: 'male',
        crimeType: 'Vandalism',
        crimeDescription: 'Destroyed public property.',
        date: '2023-03-12',
        isrepeatOffender: false,
        status: 'released'
      },
      {
        name: 'Olivia Green',
        gender: 'female',
        crimeType: 'Forgery',
        crimeDescription: 'Created fake documents for immigration.',
        date: '2023-10-16',
        isrepeatOffender: true,
        status: 'convicted'
      },
      {
        name: 'Noah Johnson',
        gender: 'male',
        crimeType: 'Pickpocketing',
        crimeDescription: 'Stole wallets in a crowded subway.',
        date: '2024-03-01',
        isrepeatOffender: false,
        status: 'released'
      },
      {
        name: 'Samantha Lee',
        gender: 'female',
        crimeType: 'Hacking',
        crimeDescription: 'Breached security of a tech company.',
        date: '2023-12-24',
        isrepeatOffender: false,
        status: 'in_court'
      },
      {
        name: 'Liam Walker',
        gender: 'male',
        crimeType: 'Counterfeiting',
        crimeDescription: 'Printed and distributed fake currency.',
        date: '2022-11-30',
        isrepeatOffender: true,
        status: 'convicted'
      },
      {
        name: 'Avery Brooks',
        gender: 'other',
        crimeType: 'Burglary',
        crimeDescription: 'Broke into a jewelry store at night.',
        date: '2024-04-10',
        isrepeatOffender: false,
        status: 'under_investigation'
      }
    ];

    sampleData.forEach((criminal) => {
      try {
        manager.inserCriminal(criminal.name, criminal);
      } catch (e) {
        console.warn(`${criminal.name} already exists.`);
      }
    });

    setCriminals(manager.getAllCriminals());
    setCriminalsBackup(manager.getAllCriminals());
  }, []);


  const modal = React.useRef<HTMLDialogElement>(null);
  const infoModal = React.useRef<HTMLDialogElement>(null);
  const DeleteModal = React.useRef<HTMLDialogElement>(null);

  const [name, setName] = useState('');
  const [crimeDesc, setCrimeDesc] = useState('');

  const [criminals, setCriminals] = useState<Criminal[]>([]);
  const [criminalsBackup, setCriminalsBackup] = useState<Criminal[]>([]);

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
      setCriminalsBackup(manager.getAllCriminals());
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

  const handleDelete = (name: string) => {
    try {
      manager.deleteCriminal(name);
      DeleteModal.current?.close();
      setCriminals(manager.getAllCriminals());
      setCriminalsBackup(manager.getAllCriminals());
    }
    catch (error) {
      alert('delete karanna ba ');
    }
  }

  const handleDescriptionModal = (desc: string) => {
    setCrimeDesc(desc);
    infoModal.current?.showModal();
  }


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.value === '') {
      setCriminals(manager.getAllCriminals());
    }
    else {
      const filteredCriminals = criminalsBackup.filter((criminal) => criminal.name.includes(e.target.value));
      setCriminals(filteredCriminals);
    }
  }

  return (
    <div className='w-full h-full p-2'>
      <h1 className='text-2xl font-medium py-4 lg:py-2 w-full flex flex-col items-center justify-center lg:items-start'>Criminal Data management</h1>

      <div className='w-full flex flex-row gap-3 pb-2'>
        <div className='grow w-full flex flex-row gap-2'>
          <label className="input grow">
            <Search />
            <input type="search" placeholder="Search by name" onChange={handleSearch} />
          </label>
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
                <select id='status' required value={formData.status} onChange={handleChange} className='select w-full'>
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

        <dialog id="my_modal_2" ref={DeleteModal} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg flex gap-3 items-center"><Info className='text-error size-8' /> Confirm Delete</h3>
            <p className="py-4">Are you really want to delete this Citizen record? </p>
            <div className="modal-action">
              <button className='btn btn-soft flex gap-2 items-center' onClick={() => { DeleteModal.current?.close() }}><X className='size-4' /> close</button>
              <button className='btn btn-error flex gap-2 items-center' onClick={() => { handleDelete(name) }}><Trash2 className='size-4' /> Delete</button>
            </div>
          </div>
        </dialog>

      </div>

      <div className='w-full h-[80vh] mt-4 lg:mt-0 overflow-y-auto'>
        <table className='w-full table table-xs lg:table-md table-pin-rows'>
          <thead>
            <tr className='bg-base-200 rounded-t-xl text-white'>
              <td className='w-fit'>#</td>
              <td className='w-3/12'>Name</td>
              <td className='w-fit'>Gender</td>
              <td className='w-2/12'>Crime type</td>
              <td className='w-1/12'>reported Date</td>
              <td className='w-fit'>Repeated offender</td>
              <td className='w-fit'>Criminal Status</td>
              <td></td>
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
                    <td className='flex flex-row items-center justify-stretch gap-2'><span className='w-full grow'>{c.crimeType}</span><button className='btn btn-xs btn-square btn-soft size-8' onClick={() => { handleDescriptionModal(c.crimeDescription) }}><SquareArrowOutUpRightIcon className='size-4' /></button></td>
                    <td className=''>{c.date}</td>
                    <td className='text-center'><input type="checkbox" checked={c.isrepeatOffender} readOnly className="checkbox checkbox-primary" /></td>
                    <td className='text-center'><div className={`badge badge-soft ${c.status === 'under_investigation' ? 'badge-warning' : c.status === 'in_court' ? 'badge-info' : c.status === 'convicted' ? 'badge-error' : 'badge-success'} text-xs text-nowrap`}>{c.status}</div></td>
                    <td className='flex flex-row gap-2'>
                      <button className='btn btn-soft btn-square btn-info'><Edit className='size-5' /></button>
                      <button className='btn btn-soft btn-square btn-error' onClick={() => { setName(c.name); DeleteModal.current?.showModal() }}><Trash2 className='size-5' /></button>
                    </td>
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