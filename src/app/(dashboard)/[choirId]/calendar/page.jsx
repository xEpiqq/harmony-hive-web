"use client";
import { Fragment, useState } from "react";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ChoirContext } from "../ChoirContext";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import NewCalendarEventModal from "@/components/NewCalendarEventModal";

const meetings = [
  {
    id: 1,
    date: "January 10th, 2022",
    time: "5:00 PM",
    datetime: "2022-01-10T17:00",
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Starbucks",
  },
  // More meetings...
];

function NavigationLabel({ date, label, locale, view }) {
  return <span className="text-sm font-semibold text-gray-900">{label}</span>;
}

export default function CalendarPage() {
  const choir = useContext(ChoirContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [NewCalendarEventModalOpen, setNewCalendarEventModalOpen] =
    useState(true);

  const addEvent = (data) => {
    const event = {
      ...data,
    };
    choir.addCalendarEvent(event);
  };

  function TileContent({ activeStartDate, date, view }) {
    return (
      <div className="h-12 w-12 flex items-center justify-center">
        {choir.calendar.map((event) => {
          const eventDate = new Date(event.date);
          if (
            eventDate.getDate() === date.getDate() &&
            eventDate.getMonth() === date.getMonth() &&
            eventDate.getFullYear() === date.getFullYear()
          ) {
            return (
              <div
                className="h-2 w-2 bg-blue-500 rounded-full"
                key={event.eventId}
              ></div>
            );
          }
        })}
      </div>
    );
  }

  return (
    <div>
      <NewCalendarEventModal
        open={NewCalendarEventModalOpen}
        setOpen={setNewCalendarEventModalOpen}
        submit={addEvent}
      />
      <button className="flex items-center space-x-2 text-sm font-semibold text-gray-900">
        Add event
        <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <h2 className="text-base font-semibold leading-6 text-gray-900">
        Upcoming meetings
      </h2>
      <div className="flex flex-row gap-12">
        <div className="mt-10 text-center">
          <Calendar
            className="box-border w-[350px] max-w-full bg-white border border-[#a0a096] font-sans leading-[1.125em]"
            // defaultView="month"
            tileContent={TileContent}
            navigationLabel={NavigationLabel}
            onChange={setSelectedDate}
          />
        </div>
        <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
          {choir.calendar.map((event) => (
            <li
              key={event.eventId}
              className="relative flex space-x-6 py-6 xl:static"
            >
              {/* <img
                src={event.imageUrl}
                alt=""
                className="h-14 w-14 flex-none rounded-full"
              /> */}
              <div className="flex-auto">
                <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">
                  {event.name}
                </h3>
                <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
                  <div className="flex items-start space-x-3">
                    <dt className="mt-0.5">
                      <span className="sr-only">Date</span>
                      <CalendarIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd>
                      <time dateTime={event.datetime}>
                        {new Date(event.date).toLocaleString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}{" "}
                        at {new Date(event.date).toLocaleTimeString()}
                      </time>
                    </dd>
                  </div>
                  <div className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                    <dt className="mt-0.5">
                      <span className="sr-only">Location</span>
                      <MapPinIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd>{event.location}</dd>
                  </div>
                </dl>

                <div className="mt-2 text-gray-500">
                  <p>{event.notes}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
