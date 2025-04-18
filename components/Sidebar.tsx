'use client'
import { Globe, MenuIcon } from "lucide-react";

const Sidebar = ({children,}: Readonly<{children: React.ReactNode;}>) => {
  return (
    <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {children}
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden absolute top-4 left-4">
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
            <li><button className="btn btn-block rounded-lg btn- btn-soft">Dashboard</button></li>
            <li><button className="btn btn-block rounded-lg btn- btn-soft">Citizen Management</button></li>
            <li><button className="btn btn-block rounded-lg btn- btn-soft">Criminal Data</button></li>
            <li><button className="btn btn-block rounded-lg btn- btn-soft">Citizen Management</button></li>
            <li><button className="btn btn-block rounded-lg btn- btn-soft">Citizen Management</button></li>
          </ul>
        </div>
      </div>
  )
}

export default Sidebar