function StatsCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className={`text-xl font-semibold ${color}`}>
        {title}
      </h2>

      <p className="text-4xl font-bold mt-4">
        {value}
      </p>
    </div>
  );
}

export default StatsCard;