const DashboardCard = ({ title, value, icon }) => {
  return (
    <div className="bg-card border border-border/70 rounded-3xl p-5 md:p-6 shadow-card hover:shadow-lg hover:scale-[1.01] transition-all duration-300">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-muted text-sm font-medium tracking-[0.06em] uppercase">{title}</p>
          <p className="text-3xl md:text-4xl font-bold text-primary mt-3">{value}</p>
        </div>
        <div className="bg-surface p-3 rounded-3xl border border-border/70 shadow-sm">{icon}</div>
      </div>
    </div>
  );
};

export default DashboardCard;
