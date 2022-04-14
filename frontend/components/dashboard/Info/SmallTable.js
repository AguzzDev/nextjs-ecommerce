export const SmallTable = ({ title,data }) => {
  return (
    <div className="p-5 darkmode">
      <h1 className="text-xl font-semibold">{title}</h1>

      <div className="flex flex-col">
        {data.length > 0 && data?.map(({ username, email }, i) => (
          <div key={i} className="flex items-center px-3 py-2 space-x-5">
            <p>toda</p>
            <div className="flex flex-col">
              <h1>{username}</h1>
              <p>{email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
