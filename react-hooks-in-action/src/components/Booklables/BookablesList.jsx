import { useState, Fragment } from "react";
import data from "../../static.json";
import { FaArrowRight } from "react-icons/fa";

export default function BookablesList() {
  const { bookables, days, sessions } = data;
  const [group, setGroup] = useState("Kit");
  const [bookableIndex, setBookableIndex] = useState(0);
  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const groups = [...new Set(bookables.map((b) => b.group))];
  const bookable = bookablesInGroup[bookableIndex];
  const [hasDetails, setHasDetails] = useState(false);

  function nextBookable() {
    setBookableIndex((i) => (i + 1) % bookablesInGroup.length);
  }
  console.log("groups", groups);
  return (
    <Fragment>
      <div>
        <select value={group} onChange={(e) => setGroup(e.target.value)}>
          {groups.map((g) => (
            <option value={g} key={g}>
              {g}
            </option>
          ))}
        </select>

        <ul className="bookables items-list-nav">
          {bookablesInGroup.map((bookables, index) => (
            <li
              key={bookables.id}
              className={index === bookableIndex ? "selected" : null}
            >
              <button className="btn" onClick={() => setBookableIndex(index)}>
                {bookables.title}
              </button>
            </li>
          ))}
        </ul>
        <p>
          <button className="btn" onClick={nextBookable}>
            <FaArrowRight />
            <span>Next</span>
          </button>
        </p>
      </div>
      {bookable && (
        <div className="bookable-details">
          <div className="item">
            <div className="item-header">
              <h2>{bookable.title}</h2>
              <span className="controls">
                <label>
                  <input
                    type="checkbox"
                    checked={hasDetails}
                    onChange={() => setHasDetails((has) => !has)}
                  />
                  Show Details
                </label>
              </span>
            </div>

            <p>{bookable.notes}</p>

            {hasDetails && (
              <div className="item-details">
                <h3>Availability</h3>
                <div className="bookable-availability">
                  <ul>
                    {bookable.days.sort().map((day) => (
                      <li key={day}>{days[day]}</li>
                    ))}
                  </ul>
                  <ul>
                    {bookable.sessions.map((session) => (
                      <li key={session}>{sessions[session]}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
}
