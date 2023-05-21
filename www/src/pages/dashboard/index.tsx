import { Link, NavLink, useOutlet } from "react-router-dom";
import {
  IconPlus,
  IconBorderAll,
  IconGraph,
  IconMenu,
} from "@tabler/icons-react";
import * as Menubar from "@radix-ui/react-menubar";

type DashboardLinkProps = {
  children: React.ReactNode;
  href: string;
};

function DashboardLink({ children, href }: DashboardLinkProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        `flex flex-col gap-2 items-center font-medium text-sm hover:text-primary-400 transition-colors ${
          isActive ? "text-primary-400" : ""
        }`
      }
      to={href}
    >
      {children}
    </NavLink>
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
    <Link
      to={href}
      className="bg-gray-800 p-4 w-full rounded-lg flex flex-col gap-2 group"
    >
      <span className="group-hover:text-primary-400 transition-colors">
        {icon}
      </span>
      <p className="text-xl font-medium group-hover:text-primary-400 transition-colors">
        {title}
      </p>
      <p className="text-gray-400 group-hover:text-primary-400 transition-colors">
        {description}
      </p>
    </Link>
  );
}

function DashboardCards() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <DashboardCard
          title="New"
          description="Add new data"
          icon={<IconPlus className="w-8 h-8" />}
          href="/dashboard/new"
        />
        <DashboardCard
          title="Statistics"
          description="View statistics for all cities"
          icon={<IconGraph className="w-8 h-8" />}
          href="/dashboard/statistics"
        />
        <DashboardCard
          title="Overview"
          description="View data in a table"
          icon={<IconBorderAll className="w-8 h-8" />}
          href="/dashboard/overview"
        />
      </section>
    </div>
  );
}

export default function Dashboard() {
  const outlet = useOutlet();

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6">
      <nav className="md:hidden bg-gray-800 p-4 rounded-lg flex justify-between items-center">
        <Link to="/dashboard" className="flex items-center gap-2">
          <img src="/logo.svg" className="w-9 h-9" />
          <span className="font-bold text-lg">Breeze</span>
        </Link>

        <Menubar.Root>
          <Menubar.Menu>
            <Menubar.Trigger className="flex justify-center items-center">
              <IconMenu className="w-6 h-6" />
            </Menubar.Trigger>

            <Menubar.Content
              className="w-56 bg-gray-700 rounded-lg p-1 z-50"
              align="end"
              side="bottom"
              sideOffset={4}
            >
              <Link
                to="/dashboard/new"
                className="w-full p-2 flex items-center hover:text-primary-400 transition-colors"
              >
                <Menubar.Item className="inline-flex gap-2 items-center w-full">
                  <IconPlus className="w-4 h-4" />
                  New
                </Menubar.Item>
              </Link>

              <Link
                to="/dashboard/statistics"
                className="w-full p-2 flex items-center hover:text-primary-400 transition-colors"
              >
                <Menubar.Item className="inline-flex gap-2 items-center w-full">
                  <IconGraph className="w-4 h-4" />
                  Statistics
                </Menubar.Item>
              </Link>

              <Link
                to="/dashboard/overview"
                className="w-full p-2 flex items-center hover:text-primary-400 transition-colors"
              >
                <Menubar.Item className="inline-flex gap-2 items-center w-full">
                  <IconBorderAll className="w-4 h-4" />
                  Overview
                </Menubar.Item>
              </Link>
            </Menubar.Content>
          </Menubar.Menu>
        </Menubar.Root>
      </nav>

      <aside className="hidden top-6 h-[calc(100vh-48px)] shrink-0 w-24 bg-gray-800 rounded-lg sticky md:flex flex-col items-center gap-8 py-6">
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
        </section>
      </aside>

      <main className="w-full">{outlet ?? <DashboardCards />}</main>
    </div>
  );
}
