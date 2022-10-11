import React, { useState } from "react";
import { MainBoxStyle } from "./LandingPageSectionStyle";
import { FormInput, AppButton, BoxContent } from "../../components";
import { Notification, baseUrl,EmptyingAllInputs } from "../../utils";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LandingPageSection = () => {
  const navigate=useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
      description: "",
      goal: "",
      whatsAppText:""
    });
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const postRequest = async () => {
      setLoading(true);
      try {
        const { data } = await axios.post(`${baseUrl}/counter/create`, {
          description: form.description,
          goal: parseInt(form.goal),
          whatsAppText:form.whatsAppText
        });
        const { counterId } = data;
        setLoading(false);
        Notification(true, false, "Goal Created Successfully");
        EmptyingAllInputs()
        navigate(`/counter/${counterId}`);
        
      } catch (error) {
        Notification(false, true, error.response.data.message);
        setLoading(false);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (form.description === "" || form.goal === "") {
        Notification(false, true, "Please enter description and total");
      } else {
        postRequest();
      }
    };
  return (
    <>
      <MainBoxStyle>
        <BoxContent />
        <form onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name={"description"}
            label={"Counter description"}
            value={form.description}
            onChange={handleChange}
          />
          <FormInput
            type={"number"}
            name={"goal"}
            label={"Goal - Desired total count"}
            value={form.goal}
            onChange={handleChange}
          />
          <FormInput
            type="text"
            name={"whatsAppText"}
            label={"WhatsApp Share Link Description"}
            value={form.whatsAppText}
            onChange={handleChange}
          />
          <br />
          <AppButton name={"Create"} type={"submit"} isLoading={loading} />
        </form>
      </MainBoxStyle>
    </>
  )
}

export default LandingPageSection