import React, { useEffect, useState } from "react";
import { Button, Form, Modal, DatePicker, message, DatePickerProps, Select, SelectProps, TimePicker } from "antd";
import { getTokenCookie } from "@/utils/cookie.util";
import { AvailabilityI } from "@/interfaces/availability.interface";
import { useMyContext } from "@/context/MainContext";
import { EventI } from "@/interfaces/event.interface";
import dayjs, { Dayjs } from 'dayjs';
import moment from 'moment';
import { SelectChangeEvent } from "@mui/material";
import { InstructorI } from "@/interfaces/instructor.interface";

const { RangePicker } = DatePicker;

const rangeConfig = {
  rules: [
    { 
      type: 'object' as const,
      required: true,
      message: 'Please select date!'
    }
  ],
};

export default function AddAvailabilityToClass({ cost, instructor } : { cost: number, instructor: InstructorI }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setAvailabilities, setIsAvailable, confirmDetails, setConfirmDetails, mySchedule, setMySchedule, disabled, setDisabled, isConfirmOpen, setIsConfirmOpen } = useMyContext();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [daySelect, setDaySelect] = useState<number>(0);
  const [options2, setOptions2] = useState<SelectProps['options']>([]);
  const [disabled2, setDisabled2] = useState(true);
  const [disabled3, setDisabled3] = useState(true);
  let month: any;
  let year: any;

  if (mySchedule.length > 0 && mySchedule[0]?.start) {
    month = new Date(mySchedule[0].start).getMonth() + 1;
    year  = new Date(mySchedule[0].start).getFullYear();
  }

  const onChange1 = (e: SelectChangeEvent) => {
    setDaySelect(Number(e));
    setDisabled2(false);
    setDisabled3(true);

    form
      .resetFields(['hour']);
  };

  const onChange2 = (time: Dayjs | null, timeString: string) => {
    const fecha = `${year}-${month}-${daySelect}`;
    setDisabled3(false);

    const timeWithDate = moment(`${fecha} ${timeString}`, ['YYYY-MM-DD h:mm A']);

    const doesEventExistInHourRange = () => {
      return mySchedule.find((event) => {
        const eventStartHour = moment(event.start, ['YYYY-MM-DD h:mm A']);
        const eventEndHour = moment(event.end, ['YYYY-MM-DD h:mm A']);

        return timeWithDate >= eventStartHour && timeWithDate <= eventEndHour;
      });
    };

    const schedule = doesEventExistInHourRange();

    if (schedule) {
      const generateTimeIntervals = (startDate: string, endDate: string) => {
        const time24hStart = moment(startDate, ['YYYY-MM-DD h:mm A']);
        const time24hEnd = moment(endDate, ['YYYY-MM-DD h:mm A']);
        
        const intervals = [];
        let currentInterval = time24hStart.clone();
        
        while (currentInterval.isBefore(time24hEnd.clone())) {
          intervals.push(currentInterval.format('YYYY-MM-DD HH:mm'));
          currentInterval.add(30, 'minutes');
        }
      
        return intervals;
      };

      const convertToText = (intervals: string[]): string[] => {
        return intervals.map((interval, index) => {
          const intervalInMinutes = (index + 1) * 30;
      
          if (intervalInMinutes % 60 === 0) {
            const hours = intervalInMinutes / 60;
            return hours === 1 ? '1 hour' : `${hours} hours`;
          } else {
            const hours = Math.floor(intervalInMinutes / 60);
            const minutes = intervalInMinutes % 60;
      
            if (hours === 0) {
              return `${minutes} minutes`;
            } else {
              return `${hours} hours and ${minutes} minutes`;
            }
          }
        });
      };

      const start = moment(schedule.start).format('YYYY-MM-DD h:mm A');
      const end = moment(schedule.end).format('YYYY-MM-DD h:mm A');

      const intervals = generateTimeIntervals(start, end);

      const intervalsInText = convertToText(intervals);
      setOptions2(intervalsInText.map((item, index) => {
        return {
          value: 0.5 + index * 0.5,
          label: item,
        }
      }));
    } else {

    }
  };

  const days = Array.from(new Set(mySchedule.map((item: EventI) => new Date(item.start).getDate())));

  const options: SelectProps['options'] = [];

  for (let i = 0; i <= days.length; i++) {
    options.push({
      value: days[i],
      label: days[i],
    });
  }

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Internal error.",
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setDaySelect(0);
    setDisabled2(true);
    setDisabled3(true);
    form.resetFields();
  };

  const formatNumberWithZero = (number: number | undefined): string => {
    if (typeof number === 'number') {
      return number < 10 ? `0${number}` : `${number}`;
    }

    return '12';
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const onCreate = async (values: any) => {
    // const availability: AvailabilityI = {
    //   startDate: new Date(values.fullDate[0].$d).setSeconds(0, 0),
    //   endDate: new Date(values.fullDate[1].$d).setSeconds(0, 0),
    // };

    console.log(values);
    const length = values.length;
    const startDate = new Date(values.month.$y, values.month.$M, values.day, values.hour.$H, values.hour.$m, 0, 0).setSeconds(0, 0);
    const endDate = new Date(values.month.$y, values.month.$M, values.day, values.hour.$H, values.hour.$m, 0, 0).setMinutes(new Date(values.month.$y, values.month.$M, values.day, values.hour.$H, values.hour.$m, 0, 0).getMinutes() + (length * 60));
    console.log(startDate);

    setConfirmDetails({
      startDate,
      endDate,
      length,
      cost,
      instructor, 
    })
    
    try {
      // const token = getTokenCookie();

      // if (token) {
        // const res: InstructorI = await AddAvailabilityToInstructor(token, id, availability);

        // if (res) {
        //   setAvailabilities(res.availability.map((item: any) => {
        //     return {
        //       event_id: item._id,
        //       title: `${res.firstName} ${res.lastName}`,
        //       start: new Date(item.startDate),
        //       end: new Date(item.endDate),
        //     }
        //   }));
          // setIsModalOpen(false);
        // }

      //   const newEvent = {
      //     event_id: id,
      //     title: 'My schedule',
      //     start: new Date(availability.startDate),
      //     end: new Date(availability.endDate),
      //     deletable: true,
      //   };

      //   if (isEventWithinAvailableTime(newEvent)) {
      //     setMySchedule([...mySchedule, {
      //       ...newEvent,
      //       color: '#f50',
      //     }]);

      //     setIsAvailable(false);
      //   } else {
      //     setMySchedule([...mySchedule, {
      //       ...newEvent,
      //       color: '#EFCB68',
      //     }]);

      //     setIsAvailable(true);
      //   }

        setDisabled(true);
        setIsModalOpen(false);
        setIsConfirmOpen(true);
      // }      
    } catch (error) {
      warning();
    }
  };

  // const disabledTime = () => {
  //   const filterEventsByDay = (dayToFilter: moment.Moment) => {
  //     const filteredEvents = mySchedule.filter((event) => {
  //       const startDay = moment(event.start).startOf('day');
  //       return startDay.isSame(dayToFilter.startOf('day'), 'day');
  //     });
    
  //     return filteredEvents;
  //   };

  //   const getHoursInRange = () => {
  //     const hoursInRange: number[] = [];
  //     const hoursFilter = filterEventsByDay(moment(`${year}-${month}-${daySelect}`, 'YYYY-MM-DD'));
  
  //     hoursFilter.forEach((event: EventI) => {
  //       const startHour = moment(event.start).hours();
  //       const endHour = moment(event.end).hours();
  
  //       for (let hour = startHour; hour < endHour; hour++) {
  //         hoursInRange.push(hour % 12 || 12);
  //       }
  //     });
  
  //     return Array.from(new Set(hoursInRange));
  //   };

  //   const presentHours = getHoursInRange();
  //   return {
  //     disabledHours: () =>
  //       Array.from({ length: 12 }).map((_, index) => index).filter((hour) => !presentHours.includes(hour)),
  //   };
  // };

  useEffect(() => {
    setDaySelect(0);
  }, []);

  return (<>
    <Button
      type="primary"
      className="bg-naples-yellow mb-6"
      onClick={showModal}
      disabled={disabled}
    >
      Add schedule
    </Button>
    <Modal
      title="Add schedule"
      open={isModalOpen}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      maskClosable={false}
      centered={false}
      onCancel={handleCancel}
    >
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        initialValues={{
          "month": dayjs(`${year}/${formatNumberWithZero(month)}`, 'YYYY/MM'),
        }}
      >
        {/* <Form.Item name="fullDate" {...rangeConfig}>
          <RangePicker className="w-full" showTime format="YYYY-MM-DD HH:mm" />
        </Form.Item> */}
        <div className="w-full flex gap-2">
          <Form.Item
            name="day"
            rules={[
              {
                required: true,
                message: "Please select day!",
              },
            ]}
          >
            <Select
              placeholder="Select day"
              optionFilterProp="children"
              options={options}
              onChange={onChange1}
            />
          </Form.Item>
          <Form.Item name="month" {...rangeConfig}>
            <DatePicker onChange={onChange} picker="month" format="YYYY/MM" />
          </Form.Item>
        </div>
        <div className="w-full">
          <Form.Item
            name="hour"
            rules={[
              {
                required: true,
                message: "Please select time!",
              },
            ]}
          >
            <TimePicker
              className="w-full"
              format="h:mm A"
              use12Hours
              hourStep={1}
              minuteStep={30}
              placeholder="Select start time"
              onChange={onChange2}
              disabled={disabled2}
            />
          </Form.Item>
          <Form.Item
            name="length"
            rules={[
              {
                required: true,
                message: "Please select length!",
              },
            ]}
          >
          <Select
              placeholder="Select length"
              optionFilterProp="children"
              options={options2}
              disabled={disabled3}
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  </>);
};
