import UserLayout from "../layouts/UserLayout";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import { Trophy, CheckCircle, Clock3, Target } from "lucide-react";

const Performance = () => {
  return (
    <UserLayout>
      <Navbar title="Performance" />

      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">My Performance</h2>
        <p className="text-muted text-sm md:text-base mt-2">Track your task productivity and completion status</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <DashboardCard title="Completed Tasks" value="15" icon={<CheckCircle className="text-accent" size={24} />} />
        <DashboardCard title="Pending Tasks" value="4" icon={<Clock3 className="text-accent" size={28} />} />
        <DashboardCard title="Efficiency" value="90%" icon={<Target className="text-accent" size={28} />} />
        <DashboardCard title="Achievements" value="8" icon={<Trophy className="text-accent" size={28} />} />
      </div>

      <div className="bg-card border border-border rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-primary mb-6">Performance Summary</h3>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-muted">Task Completion</span>
              <span className="text-primary font-semibold">90%</span>
            </div>
            <div className="w-full bg-input rounded-full h-4 overflow-hidden">
              <div className="bg-accent h-4 w-[90%] rounded-full" />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-muted">Productivity</span>
              <span className="text-primary font-semibold">85%</span>
            </div>
            <div className="w-full bg-input rounded-full h-4 overflow-hidden">
              <div className="bg-accent h-4 w-[85%] rounded-full" />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-muted">On-Time Delivery</span>
              <span className="text-primary font-semibold">95%</span>
            </div>
            <div className="w-full bg-input rounded-full h-4 overflow-hidden">
              <div className="bg-accent h-4 w-[95%] rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Performance;
