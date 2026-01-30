import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const RevenueBarChart = ({ data }) => {
  return (
    <div className="w-full h-[260px] sm:h-[320px]">
      <h3 className="mb-2 text-sm sm:text-base font-semibold">
        Monthly Revenue
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 16, left: 24, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          
          <XAxis
            dataKey="monthName"
            tick={{ fontSize: 10 }}
            angle={-30}
            textAnchor="end"
            height={45}
          />

         
          <YAxis
            tick={{ fontSize: 10 }}
            width={45}
          />

          <Tooltip
            formatter={(value) => [`₹${value.toLocaleString()}`, "Revenue"]}
            contentStyle={{ fontSize: "12px" }}
          />

          <Bar
            dataKey="revenue"
            radius={[6, 6, 0, 0]}
            fill="#065F46"
            barSize={26}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueBarChart;
