import CitizenManagement from "@/components/CitizenManagement";
import Sidebar from "@/components/Sidebar";



export default function Home() {
  return (
    <main className="w-full h-screen">
      <Sidebar>
        <CitizenManagement/>
      </Sidebar>
    </main>
  )
}
