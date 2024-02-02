"use client"
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import IsAdmin from "@/middlewares/isAdmin.middleware";
import IsNotAuth from "@/middlewares/isNotAuth.middleware";
import { AddAvailabilityToInstructor, DeleteAvailabilityToInstructor, FindOneInstructor, UpdateAvailabilityToInstructor } from "@/services/Instructor";
import theme from "@/theme/themeConfig";
import { getTokenCookie } from "@/utils/cookie.util";
import { Scheduler } from "@aldabil/react-scheduler";
import { ConfigProvider, message } from "antd";
import { InstructorI } from "@/interfaces/instructor.interface";
import { useMyContext } from "@/context/MainContext";
import { EventActions, ProcessedEvent } from "@aldabil/react-scheduler/types";
import { AvailabilityI } from "@/interfaces/availability.interface";
import { EventI } from "@/interfaces/event.interface";

export default function InstructorAvailability({ params }: { params: { id: string } }) {
  const [instructorProfile, setInstructorProfile] = useState<InstructorI>();
  const { availabilities, setAvailabilities } = useMyContext();
  const [messageApi, contextHolder] = message.useMessage();

  const warning = (message: string) => {
    messageApi.open({
      type: "warning",
      content: message,
    });
  };

  const isEventCreateWithinAvailableTime = (newEvent: AvailabilityI, availabilities: EventI[]): boolean => {
    const isOverlap = availabilities.some(event => {
      return (
        (new Date(newEvent.startDate) < event.end && new Date(newEvent.endDate) > event.start)
      );
    });

    return isOverlap;
  };

  const isEventUpdateWithinAvailableTime = (newEvent: AvailabilityI, eventIdToOmit: string, availabilities: EventI[]): boolean => {
    const filteredAvailabilities = availabilities.filter(event => event.event_id !== eventIdToOmit);

    const isOverlap = filteredAvailabilities.some(event => {
      return (
        (new Date(newEvent.startDate) < event.end && new Date(newEvent.endDate) > event.start)
      );
    });
  
    return isOverlap;
  };

  const onCreate = async (values: any) => {
    const availability: AvailabilityI = {
      startDate: new Date(values.start).setSeconds(0, 0),
      endDate: new Date(values.end).setSeconds(0, 0),
    };
    
    try {
      const token = getTokenCookie();

      if (token) {
        const res: InstructorI = await FindOneInstructor(token, params.id);

        if (isEventCreateWithinAvailableTime(availability, res.availability.map((item: any) => {
          return {
            event_id: item._id,
            title: `${res.firstName} ${res.lastName}`,
            start: new Date(item.startDate),
            end: new Date(item.endDate),
          }
        }))) {
          warning("Availability overlaps.");
          return false;
        } else {
          const res: InstructorI = await AddAvailabilityToInstructor(token, params.id, availability);

          if (res) {
            setAvailabilities(res.availability.map((item: any) => {
              return {
                event_id: item._id,
                title: `${res.firstName} ${res.lastName}`,
                start: new Date(item.startDate),
                end: new Date(item.endDate),
              }
            }));

            return true;
          }
        }
      }      
    } catch (error) {
      warning("Internal error.");
      return false;
    }
  };

  const onUpdate = async (values: any) => {
    const availability: AvailabilityI = {
      startDate: new Date(values.start).setSeconds(0, 0),
      endDate: new Date(values.end).setSeconds(0, 0),
    };
    
    try {
      const token = getTokenCookie();

      if (token) {
        const res: InstructorI = await FindOneInstructor(token, params.id);

        if (isEventUpdateWithinAvailableTime(availability, values.event_id, res.availability.map((item: any) => {
          return {
            event_id: item._id,
            title: `${res.firstName} ${res.lastName}`,
            start: new Date(item.startDate),
            end: new Date(item.endDate),
          }
        }))) {
          warning("Availability overlaps.");
          return false;
        } else {
          const res: InstructorI = await UpdateAvailabilityToInstructor(token, params.id, values.event_id, availability);

          if (res) {
            setAvailabilities(res.availability.map((item: any) => {
              return {
                event_id: item._id,
                title: `${res.firstName} ${res.lastName}`,
                start: new Date(item.startDate),
                end: new Date(item.endDate),
              }
            }));

            return true;
          }
        }
      }      
    } catch (error) {
      warning("Internal error.");
      return false;
    }
  };

  const onDelete = async (id: string) => {
    try {
      const token = getTokenCookie();

      if (token) {
        const res: InstructorI = await DeleteAvailabilityToInstructor(token, params.id, id);

        if (res.availability.length === 0) {
          setAvailabilities([]);
        } else {
          setAvailabilities(res.availability.map((item: any) => {
            return {
              event_id: item._id,
              title: `${res.firstName} ${res.lastName}`,
              start: new Date(item.startDate),
              end: new Date(item.endDate),
            }
          }));
        }

        return true;
      }      
    } catch (error) {
      warning("Internal error.");
      return false;
    }
  };

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const token = getTokenCookie();
  
        if(token) {
          const res: InstructorI = await FindOneInstructor(token, params.id);
  
          document.title = `Instructor | ${res.firstName} ${res.lastName}`;
          setInstructorProfile(res);
          setAvailabilities(res.availability.map((item: any) => {
            return {
              event_id: item._id,
              title: `${res.firstName} ${res.lastName}`,
              start: new Date(item.startDate),
              end: new Date(item.endDate),
            }
          }));
        }
      } catch (error) {
        console.error('Error al obtener el perfil:', error);
      }
    };

    fetchInstructor();
  }, []);

  return (
    <IsNotAuth>
      <IsAdmin>
        <ConfigProvider theme={theme}>
          {contextHolder}
          <Header />
          <main className="w-full h-auto p-2 mt-8 flex justify-center">
            <div className="w-full sm:w-9/12 lg:w-[60rem] relative mb-28">
              {instructorProfile && (<>
                <div className="w-full">
                  <h2 className="text-3xl font-semibold text-honeydew capitalize">
                    {instructorProfile.firstName} {instructorProfile.lastName}
                  </h2>
                  <span className="text-base lg:text-lg font-medium text-naples-yellow capitalize">
                    {instructorProfile.user.role}
                  </span>
                </div>
                <div className="w-full mt-10">
                  <Scheduler
                    view="week"
                    editable={true}
                    draggable={true}
                    deletable={true}
                    day={{
                      startHour: 6,
                      endHour: 23,
                      step: 30,
                      navigation: true,
                    }}
                    week={{
                      weekDays: [0, 1, 2, 3, 4, 5],
                      weekStartOn: 1,
                      startHour: 6,
                      endHour: 23,
                      step: 30,
                      navigation: true,
                      disableGoToDay: true,
                    }}
                    month={{
                      weekDays: [0, 1, 2, 3, 4, 5],
                      weekStartOn: 1,
                      startHour: 6,
                      endHour: 23,
                      navigation: true,
                      disableGoToDay: false,
                    }}
                    events={availabilities}
                    fields={[
                      { 
                        name: "title",
                        type: "hidden",
                        default: `${instructorProfile.firstName} ${instructorProfile.lastName}`,
                        config: { label: "Title", required: false },
                      },
                    ]}
                    onConfirm={(event: ProcessedEvent, action: EventActions) => {
                      return new Promise<ProcessedEvent>(async (resolve, reject) => {
                        if (action === 'create') {
                          if (await onCreate(event)) {
                            resolve(event);
                          } else {
                            reject("Availability overlaps.");
                          }
                        } else {
                          if (await onUpdate(event)) {
                            resolve(event);
                          } else {
                            reject("Internal error.");
                          }
                        }
                      }
                    )}}
                    onEventDrop={(droppedOn: Date, updatedEvent: ProcessedEvent, originalEvent: ProcessedEvent) => {
                      return new Promise<ProcessedEvent>(async (resolve, reject) => {
                        if (await onUpdate(updatedEvent)) {
                          resolve(updatedEvent);
                        } else {
                          reject("Internal error.");
                        }
                      }
                    )}}
                    onDelete={(id: string) => {
                      return new Promise<string>(async (resolve, reject) => {
                        if (await onDelete(id)) {
                          resolve(id);
                        } else {
                          reject("Internal error.");
                        }
                      }
                    )}}
                  />
                </div>
              </>)}
            </div>
          </main>
        </ConfigProvider>
      </IsAdmin>
    </IsNotAuth>
  );
};
