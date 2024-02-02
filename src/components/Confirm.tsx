import React, { useEffect } from "react";
import { Modal, Timeline, message } from "antd";
import { AvailabilityI } from "@/interfaces/availability.interface";
import { useMyContext } from "@/context/MainContext";
import { useRouter } from "next/navigation";
import { CreateSchedule } from "@/services/Schedule";
import { getTokenCookie } from "@/utils/cookie.util";
import { MyProfile } from "@/services/Auth";
import { CreatePayment } from "@/services/Payment";

export default function Confirm({ id } : { id: string}) {
  const { isConfirmOpen, setIsConfirmOpen, setDisabled, confirmDetails, setConfirmDetails } = useMyContext();
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const warning = (message: string) => {
    messageApi.open({
      type: "warning",
      content: message,
    });
  };

  const handleCancel = () => {
    setIsConfirmOpen(false);
    setDisabled(false);
  };

  const onCreate = async (values: any) => {
    const availability: AvailabilityI = {
      startDate: new Date(values.fullDate[0].$d).setSeconds(0, 0),
      endDate: new Date(values.fullDate[1].$d).setSeconds(0, 0),
    };
    
    try {
       
    } catch (error) {
      warning("Internal error.");
    }
  };

  return (<>
    <Modal
      title="Details"
      open={isConfirmOpen}
      onOk={async () => {
        try {
          const token = getTokenCookie();

          if (token && confirmDetails) {
            const schedule = await CreateSchedule(token, id, {
              startDate: confirmDetails.startDate,
              endDate: confirmDetails.endDate,
            });

            const me = await MyProfile(token);

            const payment = await CreatePayment(token, {
              instructor: confirmDetails.instructor._id,
              emailInstructor: confirmDetails.instructor.user.email,
              student: me._id,
              emailStudent: me.user.email,
              cost: confirmDetails.cost * confirmDetails.length,
              class: id,
              schedule: schedule._id,
            });

            router.push(`/checkout/${payment._id}`);
          }
        } catch (error) {
          console.log("error");
        }
      }}
      maskClosable={false}
      centered={false}
      onCancel={handleCancel}
    >
      {contextHolder}
      {confirmDetails && (
        <><Timeline
          style={{
            marginTop: "2.5rem",
            color: "#E1EFE6",
            fontWeight: 500,
          }}
          items={[
            {
              children: new Date(confirmDetails.startDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }) + " " + new Date(confirmDetails.startDate).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
              }),
            },
            {
              children: new Date(confirmDetails.endDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }) + " " + new Date(confirmDetails.endDate).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
              }),
            },
          ]} />
          <p>Instructor: {confirmDetails.instructor.firstName} {confirmDetails.instructor.lastName}</p>
          <p>Duration: {confirmDetails.length} hours</p>
          <p>Total: {confirmDetails.cost * confirmDetails.length}</p>
          </>
      )}
    </Modal>
  </>);
};
