// PASS 2

'use client';

import React, { useEffect, useRef, useState } from 'react';

interface BoxProps {
  children: string;
  side: 'left' | 'right';
}

interface LineData {
  path: string;
  color: string;
}

interface BoxConnection {
  start: string;
  end: string;
  color: string;
}

const BoxAnimationLines: React.FC = () => {
  const boxRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [lines, setLines] = useState<LineData[]>([]);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const createCurvedPath = (
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    progress: number
  ): string => {
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    
    // Calculate dynamic curvature based on scroll progress
    const maxCurvature = 100;
    const curvature = Math.sin(progress * Math.PI) * maxCurvature;
    
    const controlX = midX;
    const controlY = midY - curvature;
    
    return `M ${startX} ${startY} Q ${controlX} ${controlY}, ${endX} ${endY}`;
  };

  const updateLines = (): void => {
    const boxConnections: BoxConnection[] = [
      { start: 'A', end: '3', color: '#3498db' },
      { start: 'B', end: '4', color: '#e67e22' },
      { start: 'C', end: '1', color: '#2ecc71' },
      { start: 'D', end: '2', color: '#f1c40f' },
    ];

    const newLines: LineData[] = boxConnections.map(({ start, end, color }) => {
      const startBox = boxRefs.current[start]?.getBoundingClientRect();
      const endBox = boxRefs.current[end]?.getBoundingClientRect();

      if (!startBox || !endBox) {
        return { path: '', color };
      }

      const startX = startBox.left + startBox.width / 2;
      const startY = startBox.top + startBox.height / 2;
      const endX = endBox.left + endBox.width / 2;
      const endY = endBox.top + endBox.height / 2;
      
      // Use scrollProgress to create the wave effect
      const path = createCurvedPath(startX, startY, endX, endY, scrollProgress);
      return { path, color };
    });

    setLines(newLines);
  };

  const handleScroll = (): void => {
    const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    setScrollProgress(scrollPercentage);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateLines);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateLines);
    };
  }, []);

  useEffect(() => {
    updateLines();
  }, [scrollProgress]);

  const Box: React.FC<BoxProps> = ({ children, side }) => (
    <div
      ref={el => boxRefs.current[children] = el}
      className={`w-15 h-15 rounded-lg m-2.5 flex justify-center items-center font-bold text-white ${
        side === 'left' ? 'bg-blue-500' : 'bg-red-500'
      }`}
    >
      {children}
    </div>
  );

  return (
    <div className="h-[300vh]">
      <div className="fixed top-0 left-0 right-0 flex justify-between p-12">
        <div className="flex flex-col">
          {['A', 'B', 'C', 'D'].map(letter => (
            <Box key={letter} side="left">{letter}</Box>
          ))}
        </div>
        <div className="flex flex-col">
          {['1', '2', '3', '4'].map(number => (
            <Box key={number} side="right">{number}</Box>
          ))}
        </div>
      </div>
      <svg className="fixed top-0 left-0 w-full h-full pointer-events-none">
        {lines.map((line, index) => (
          <path
            key={index}
            d={line.path}
            fill="none"
            stroke={line.color}
            strokeWidth="2"
            strokeDasharray="1000"
            strokeDashoffset={1000 - scrollProgress * 1000}
            style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
          />
        ))}
      </svg>
    </div>
  );
};

export default BoxAnimationLines;

// 'use client'

// import React, { useEffect, useRef, useState } from "react";

// interface BoxProps {
//   children: string;
//   side: "left" | "right";
// }

// interface LineData {
//   path: string;
//   color: string;
// }

// interface BoxConnection {
//   start: string;
//   end: string;
//   color: string;
// }

// const BoxAnimationLines: React.FC = () => {
//   const boxRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
//   const [lines, setLines] = useState<LineData[]>([]);
//   const [scrollProgress, setScrollProgress] = useState<number>(0);

//   const createCurvedPath = (
//     startX: number,
//     startY: number,
//     endX: number,
//     endY: number,
//     curvature: number = 50
//   ): string => {
//     const midX = (startX + endX) / 2;
//     const midY = (startY + endY) / 2;
//     const controlX = midX;
//     const controlY = midY - curvature;
//     return `M ${startX} ${startY} Q ${controlX} ${controlY}, ${endX} ${endY}`;
//   };

//   const updateLines = (): void => {
//     const boxConnections: BoxConnection[] = [
//       { start: "A", end: "3", color: "#3498db" },
//       { start: "B", end: "4", color: "#e67e22" },
//       { start: "C", end: "1", color: "#2ecc71" },
//       { start: "D", end: "2", color: "#f1c40f" },
//     ];

//     const newLines: LineData[] = boxConnections.map(({ start, end, color }) => {
//       const startBox = boxRefs.current[start]?.getBoundingClientRect();
//       const endBox = boxRefs.current[end]?.getBoundingClientRect();

//       if (!startBox || !endBox) {
//         return { path: "", color };
//       }

//       const startX = startBox.left + startBox.width / 2;
//       const startY = startBox.top + startBox.height / 2;
//       const endX = endBox.left + endBox.width / 2;
//       const endY = endBox.top + endBox.height / 2;
//       const path = createCurvedPath(startX, startY, endX, endY);
//       return { path, color };
//     });

//     setLines(newLines);
//   };

//   const handleScroll = (): void => {
//     const scrollPercentage =
//       window.scrollY / (document.body.scrollHeight - window.innerHeight);
//     setScrollProgress(scrollPercentage);
//     updateLines();
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     window.addEventListener("resize", updateLines);
//     updateLines();
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       window.removeEventListener("resize", updateLines);
//     };
//   }, []);

//   const Box: React.FC<BoxProps> = ({ children, side }) => (
//     <div
//       ref={(el) => (boxRefs.current[children] = el)}
//       className={`w-15 h-15 rounded-lg m-2.5 flex justify-center items-center font-bold text-white ${
//         side === "left" ? "bg-blue-500" : "bg-red-500"
//       }`}
//     >
//       {children}
//     </div>
//   );

//   return (
//     <div className="h-[300vh]">
//       <div className="fixed top-0 left-0 right-0 flex justify-between p-12">
//         <div className="flex flex-col">
//           {["A", "B", "C", "D"].map((letter) => (
//             <Box key={letter} side="left">
//               {letter}
//             </Box>
//           ))}
//         </div>
//         <div className="flex flex-col">
//           {["1", "2", "3", "4"].map((number) => (
//             <Box key={number} side="right">
//               {number}
//             </Box>
//           ))}
//         </div>
//       </div>
//       <svg className="fixed top-0 left-0 w-full h-full pointer-events-none">
//         {lines.map((line, index) => (
//           <path
//             key={index}
//             d={line.path}
//             fill="none"
//             stroke={line.color}
//             strokeWidth="2"
//             strokeDasharray="1000"
//             strokeDashoffset={1000 - scrollProgress * 1000}
//             style={{ transition: "stroke-dashoffset 0.1s ease-out" }}
//           />
//         ))}
//       </svg>
//     </div>
//   );
// };

// export default BoxAnimationLines;

