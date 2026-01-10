import { TopBar } from "./TopBar";
import { SideNav } from "./SideNav";

export default function CockpitLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#050509] text-slate-100 flex flex-col">
      <TopBar />
      <div className="flex flex-1">
        <SideNav />
        <main className="flex-1 px-6 py-6 bg-[#050509]">
          <div className="max-w-5xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
