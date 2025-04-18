'use client';

import { useEffect, useState } from 'react';
import { Citizen } from '@/types/citizen';
import { CitizenMap } from '@/lib/CitizenManagementHashMap';

const manager = new CitizenMap();

const CitizenManagement = () => {
    const [citizens, setCitizens] = useState<Citizen[]>([]);
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
        manager.insert(formData.nic,formData);
        setCitizens(manager.getAll());
        console.log(manager.getAll())
        setFormData({ nic: '', name: '', dateOfBirth: '', address: '' });
      } catch (error) {
        alert('Citizen with this NIC already exists.');
      }
    };
  
    return (
      <main className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Citizen Registration</h1>
  
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            id="nic"
            type="text"
            placeholder="NIC"
            value={formData.nic}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            id="address"
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
  
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Citizen
          </button>
        </form>
  
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Registered Citizens</h2>
          <ul className="space-y-2">
            {citizens.map((c) => (
              <li key={c.nic} className="border p-3 rounded">
                <p><strong>NIC:</strong> {c.nic}</p>
                <p><strong>Name:</strong> {c.name}</p>
                <p><strong>Date of Birth:</strong> {c.dateOfBirth}</p>
                <p><strong>Address:</strong> {c.address}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    );
}

export default CitizenManagement