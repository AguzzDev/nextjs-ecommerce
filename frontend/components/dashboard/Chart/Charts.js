import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export const Charts = ({ title, data, dataKey }) => {
  return (
    <div className="mt-5 darkmode rounded-md p-5">
      <h1 className="text-xl font-semibold">{title}</h1>

      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Line type="step" dataKey={dataKey} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
