'use client'
import { Globe, LogOut, MenuIcon, User } from "lucide-react";
import { useEffect, useState } from "react";
import CitizenManagement from "./CitizenManagement";
import Dashboard from "./Dashboard";
import CriminalDataManagement from "./CriminalDataManagement";
import EmergencyRequests from "./EmergencyRequests";
import Reports from "./Reports";
import { useAuth } from "@/lib/context/AuthContext";
import { redirect } from "next/navigation";
import TrafficSignalManager from "./TrafficSignalManager";
import { useTabControl } from "@/lib/context/TabControlContext";
import EmergencyRequesTracking from "./EmergencyRequesTracking";

const Sidebar = () => {
  const Tab = useTabControl();
  const user = useAuth();
  const [tab, setTab] = useState(Tab.currentTab)
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setTab(Tab.currentTab);
  },[Tab.currentTab])

  const handleLogOut = () => {
    user.logout();
    redirect('/login')
  }

  return (
    <div className="drawer lg:drawer-open h-screen">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" checked={drawerOpen} readOnly />
      <div className="drawer-content flex flex-col items-stretch">

        {
          tab === 1 && <Dashboard />
        }
        {
          tab === 2 && <CitizenManagement />
        }
        {
          tab === 3 && <CriminalDataManagement />
        }
        {
          tab === 4 && <EmergencyRequests />
        }
        {
          tab === 5 && <Reports />
        }
        {
          tab === 6 && <TrafficSignalManager/>
        }
        {
          tab === 7 && <EmergencyRequesTracking/>
        }
        <label htmlFor="my-drawer-2" className="btn btn-info btn-square btn-soft border-[1px] border-info drawer-button lg:hidden absolute top-4 left-4" onClick={() => setDrawerOpen(!drawerOpen)}>
          <MenuIcon />
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay" onClick={() => setDrawerOpen(!drawerOpen)}></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 flex flex-col gap-2 items-strech justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center mb-4">
              <Globe className="size-12" />
              <h1 className="font-bold text-2xl">NeoMetroPolis</h1>
            </div>
            <li><button className={`btn btn-block rounded-lg ${tab === 1 ? 'btn-info' : 'btn-soft'}`} onClick={() => { Tab.setTab(1); setDrawerOpen(!drawerOpen) }}>Dashboard</button></li>
            <li><button className={`btn btn-block rounded-lg ${tab === 2 ? 'btn-info' : 'btn-soft'}`} onClick={() => { Tab.setTab(2); setDrawerOpen(!drawerOpen) }}>Citizen Profile </button></li>
            <li><button className={`btn btn-block rounded-lg ${tab === 3 ? 'btn-info' : 'btn-soft'}`} onClick={() => { Tab.setTab(3); setDrawerOpen(!drawerOpen) }}>Criminal Data</button></li>
            <li><button className={`btn btn-block rounded-lg ${tab === 4 ? 'btn-info' : 'btn-soft'}`} onClick={() => { Tab.setTab(4); setDrawerOpen(!drawerOpen) }}>emergency Requests</button></li>
            <li><button className={`btn btn-block rounded-lg ${tab === 7 ? 'btn-info' : 'btn-soft'}`} onClick={() => { Tab.setTab(7); setDrawerOpen(!drawerOpen) }}>emergency Request Tracking</button></li>
            <li><button className={`btn btn-block rounded-lg ${tab === 5 ? 'btn-info' : 'btn-soft'}`} onClick={() => { Tab.setTab(5); setDrawerOpen(!drawerOpen) }}>Reports</button></li>
            <li><button className={`btn btn-block rounded-lg ${tab === 6 ? 'btn-info' : 'btn-soft'}`} onClick={() => { Tab.setTab(6); setDrawerOpen(!drawerOpen) }}>Traffic AI</button></li>
          </div>
          <div className="w-full flex felx-row items-center justify-between">
            <div className="flex flex-row gap-3 items-center">
              <div className="size-12 flex flex-col items-center justify-center rounded-full bg-gray-700"><User /></div>
              <p className="font-medium">{user.user?.name}</p>
            </div>
            <button className="btn btn-square btn-soft btn-error rounded-lg" onClick={() => handleLogOut()}><LogOut className="size-5"/></button>
          </div>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar