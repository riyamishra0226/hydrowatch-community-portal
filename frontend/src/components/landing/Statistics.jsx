const Statistics = () => {
  const stats = [
    {
      number: "1500+",
      title: "Issues Reported",
    },
    {
      number: "320+",
      title: "Community Members",
    },
    {
      number: "50+",
      title: "Cities Covered",
    },
    {
      number: "92%",
      title: "Issues Resolved",
    },
  ];

  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {stats.map((item, index) => (
            <div key={index}>
              <h2 className="text-5xl font-bold mb-3">{item.number}</h2>
              <p className="text-lg">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;