function AuthImagePattern({ title, subtitle }) {
  return (
    <div className="hidden items-center justify-center bg-base-200 p-12 lg:flex">
      <div className="max-w-md text-center">
        <div className="mb-8 grid grid-cols-3 gap-3">
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className={`aspect-square rounded-2xl bg-primary/10 ${index % 2 === 0 ? "animate-pulse" : ""}`}
            />
          ))}
        </div>
        <h2 className="mb-4 text-2xl font-bold">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
}

export default AuthImagePattern;
