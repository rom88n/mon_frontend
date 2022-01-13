// import React from 'react';
// import { ResponsiveContainer, Tooltip, Label, PieChart, Pie, Cell } from 'recharts';
// import { PolarViewBox } from 'recharts/src/util/types';
// import Typography from '@material-ui/core/Typography';

// type CustomLabelProps = {
//   viewBox?: PolarViewBox;
//   total: number
//   count: number
// }

// function CustomLabel({ viewBox, total, count }: CustomLabelProps) {
//   return (
//     <text x={viewBox?.cx} y={viewBox?.cy} fill="#3d405c" className="recharts-text recharts-label" textAnchor="middle"
//           dominantBaseline="central">
//       <tspan alignmentBaseline="middle" fontSize="20">{count}</tspan>
//       <tspan fontSize="20">/</tspan>
//       <tspan fontSize="20">{total}</tspan>
//     </text>
//   );
// }

// type DonutChartProps = {
//   title: string
//   data: {
//     name: string
//     value: number
//     color: string
//     type: string
//   }[]
// }

// type DataItem = {
//   payload: {
//     type: string
//   }
// }

// export default function DonutChart(props: DonutChartProps) {
//   const { data, title } = props;

//   const total = data.find(item => item.type === 'total')?.value || 0;
//   const count = data.find(item => item.type === 'count')?.value || 0;

//   const filteredData = data
//     .map(item => {
//       if (item.type === 'total') return { ...item, value: total - count };
//       return item;
//     });

//   return (
//     <div>
//       <Typography variant="h5" component="div" align="center">
//         {title}
//       </Typography>
//       <ResponsiveContainer height={200} width={300}>
//         <PieChart>
//           <Tooltip
//             formatter={(value: string, name: string, item: DataItem) => (item.payload.type === 'total') ? total : value}
//           />
//           <Pie
//             data={filteredData}
//             nameKey="name"
//             dataKey="value"
//             innerRadius="60%"
//             outerRadius="80%"
//             startAngle={90}
//             endAngle={-270}
//             fill="#8884d8"
//           >
//             {filteredData.map((entry, index) => <Cell fill={entry.color}/>)}
//             <Label
//               width={30}
//               position="center"
//               content={
//                 <CustomLabel
//                   total={total}
//                   count={count}
//                 />
//               }
//             >
//             </Label>
//           </Pie>
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }
export {}
