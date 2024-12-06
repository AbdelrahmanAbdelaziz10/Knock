import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import "../../../../Component/Common Component/Deteils Com/BodyDeteils.css";
import CustomInput from "../../../../Component/Common Component/Deteils Com/CustomInput";
import "./Main2.css";
import { FaCircleExclamation } from "react-icons/fa6";
import { Col } from "react-bootstrap";

const DateTime = () => {
  const [date, setDate] = useState(new Date());
  const [selectDate, setSelectDate] = useState(null);

  const onChange = (date) => {
    setDate(date);
  };

  return (
    <div className="row date_time step_2">
      <h5 className="mb-3">When would you like your service?</h5>
      <div className="delivery_date step_2 row mb-4">
        <div className="col-lg-6 col-md-6">
          <h5>
            Delivery <span>Date</span>
          </h5>
          <label>
            <Datepicker
              selected={selectDate}
              onChange={(date) => setSelectDate(date)}
              customInput={<CustomInput />}
            />
          </label>
        </div>
        <div className="col-lg-6 col-md-6">
          <h5>
            Delivery <span>time</span>
          </h5>
          <div className="time_input">
            <input type="time" className="input_time" />
          </div>
        </div>
      </div>

      {/* <div className='nots mb-4'>
    <FaCircleExclamation className='icon' />
    <p>
    Free cancellation until 12 hours before
 the start of your booking
    </p>
    <span className=' btn-details'>
        Details
    </span>
    </div> */}
      <div className="row">
        <Col xs={11} lg={11} md={11}>
          <h5>Any instructions or special requirements?</h5>
          <div className="">
            <textarea className="c" placeholder="Example:Sink is leaking, i have a faulty wire, A/C is making noise, etc." />
          </div>
        </Col>
      </div>
    </div>
  );
};

export default DateTime;
