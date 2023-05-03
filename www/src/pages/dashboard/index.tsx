import { Link, useOutlet } from "react-router-dom";
import { IconPlus, IconBorderAll, IconBuilding, IconGraph } from "@tabler/icons-react";

type DashboardLinkProps = {
  children: React.ReactNode;
  href: string;
};

function DashboardLink({ children, href }: DashboardLinkProps) {
  return (
    <Link className="flex flex-col gap-2 items-center font-medium text-sm hover:text-primary-400 transition-colors" to={href}>
      {children}
    </Link>
  );
}

type DashboardCardProps = {
  href: string;
  icon: JSX.Element;
  title: string;
  description: string;
};

function DashboardCard({ href, icon, title, description }: DashboardCardProps) {
  return (
    <Link to={href} className="bg-gray-800 p-4 w-full rounded-lg flex flex-col gap-2 group">
      <span className="group-hover:text-primary-400 transition-colors">{icon}</span>
      <p className="text-xl font-medium group-hover:text-primary-400 transition-colors">{title}</p>
      <p className="text-gray-400 group-hover:text-primary-400 transition-colors">{description}</p>
    </Link>
  );
}

function DashboardCards() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <DashboardCard title="New" description="Add new data" icon={<IconPlus className="w-8 h-8" />} href="/dashboard/new" />
        <DashboardCard title="Statistics" description="View statistics for all cities" icon={<IconGraph className="w-8 h-8" />} href="/dashboard/statistics" />
        <DashboardCard title="Overview" description="View data in a table" icon={<IconBorderAll className="w-8 h-8" />} href="/dashboard/overview" />
        <DashboardCard title="By city" description="View statistics by city" icon={<IconBuilding className="w-8 h-8" />} href="/dashboard/by-city" />
      </section>
    </div>
  );
}

export default function Dashboard() {
  const outlet = useOutlet();

  return (
    <div className="min-h-screen relative overflow-y-auto flex gap-6 p-6">
      <aside className="hidden top-0 bottom-0 shrink-0 w-24 bg-gray-800 rounded-lg sticky md:flex flex-col items-center gap-8 py-6">
        <Link className="flex flex-col items-center gap-1" to="/dashboard">
          <img src="/logo.svg" alt="Logo" className="w-10" />
          <span className="font-bold">Breeze</span>
        </Link>

        <section className="flex flex-col gap-6">
          <DashboardLink href="/dashboard/new">
            <IconPlus className="w-5 h-5" />
            <span>New</span>
          </DashboardLink>

          <DashboardLink href="/dashboard/statistics">
            <IconGraph className="w-5 h-5" />
            <span>Statistics</span>
          </DashboardLink>

          <DashboardLink href="/dashboard/overview">
            <IconBorderAll className="w-5 h-5" />
            <span>Overview</span>
          </DashboardLink>

          <DashboardLink href="/dashboard/by-city">
            <IconBuilding className="w-5 h-5" />
            <span>By city</span>
          </DashboardLink>
        </section>
      </aside>

      <main className="w-full">{outlet ?? <DashboardCards />}</main>
    </div>
  );
}
