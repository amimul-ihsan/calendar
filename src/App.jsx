import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function App() {
  const [year, setYear] = useState(new Date().getFullYear());

  return (
    <div className="container">
      <div className="header">
        <button className="btn" onClick={() => setYear((y) => y - 1)}>
          <ChevronLeft />
        </button>

        <input
          type="number"
          name="year"
          className="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        {/* <span className="year">{year}</span> */}

        <button className="btn" onClick={() => setYear((y) => y + 1)}>
          <ChevronRight />
        </button>
      </div>

      <div className="calendar">
        {months.map((month) => (
          <Month key={month} monthName={month} year={year} />
        ))}
      </div>
    </div>
  );
}

function Month({ monthName, year }) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const month = months.findIndex((m) => m === monthName);
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  let date = 1;

  const isToday = (date) => {
    const today = new Date();
    const currentDay = new Date(year, month, date);
    return (
      today.getFullYear() === currentDay.getFullYear() &&
      today.getMonth() === currentDay.getMonth() &&
      today.getDate() === currentDay.getDate()
    );
  };
  // console.log(date);

  return (
    <div className="month">
      <span className="month-name">{monthName}</span>
      <div className="dates">
        <table>
          <thead>
            <tr>
              {days.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <tr key={i}>
                  {days.map((_, j) => (
                    <td key={j} className={isToday(date) ? "today" : ""}>
                      {(date <= lastDate
                        ? i === 0
                          ? j >= firstDay
                            ? date
                            : ""
                          : date
                        : "") && date++}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
