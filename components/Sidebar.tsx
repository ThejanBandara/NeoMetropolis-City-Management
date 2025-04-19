'use client'
import { Globe, MenuIcon } from "lucide-react";
import { useState } from "react";
import CitizenManagement from "./CitizenManagement";
import Dashboard from "./Dashboard";
import CriminalDataManagement from "./CriminalDataManagement";
import EmergencyRequests from "./EmergencyRequests";
import Reports from "./Reports";

const Sidebar = () => {

    const [tab, setTab] = useState(1)

  return (
    <div className="drawer lg:drawer-open h-screen">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-stretch">
          
            {
                tab === 1 && <Dashboard/>
            }
            {
                tab === 2 && <CitizenManagement/>
            }
            {
                tab === 3 && <CriminalDataManagement/>
            }
            {
                tab === 4 && <EmergencyRequests/>
            }
            {
                tab === 5 && <Reports/>
            }
          <label htmlFor="my-drawer-2" className="btn btn-info btn-square btn-soft border-[1px] border-info drawer-button lg:hidden absolute top-4 left-4">
            <MenuIcon/>
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center mb-4">
              <Globe className="size-12"/>
              <h1 className="font-bold text-2xl">NeoMetroPolis</h1>
            </div>
            <li><button className={`btn btn-block rounded-lg ${tab === 1 ? 'btn-info' : 'btn-soft'}`} onClick={() => {setTab(1)}}>Dashboard</button></li>
            <li><button className={`btn btn-block rounded-lg ${tab === 2 ? 'btn-info' : 'btn-soft'}`} onClick={() => {setTab(2)}}>Citizen Profile </button></li>
            <li><button className={`btn btn-block rounded-lg ${tab === 3 ? 'btn-info' : 'btn-soft'}`} onClick={() => {setTab(3)}}>Criminal Data</button></li>
            <li><button className={`btn btn-block rounded-lg ${tab === 4 ? 'btn-info' : 'btn-soft'}`} onClick={() => {setTab(4)}}>emergency Requests</button></li>
            <li><button className={`btn btn-block rounded-lg ${tab === 5 ? 'btn-info' : 'btn-soft'}`} onClick={() => {setTab(5)}}>Reports</button></li>
          </ul>
        </div>
      </div>
  )
}

export default Sidebar